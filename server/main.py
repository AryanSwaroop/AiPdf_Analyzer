from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
import psycopg2
from psycopg2.extras import RealDictCursor
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import tempfile
import os
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-pdf-analyzer-questioner.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize global variables
vector_store = None
llm = None

# Check if the environment variable is set for the Groq API key
groq_api_key = os.getenv('groq_api')
if groq_api_key:
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")
else:
    raise ValueError("Groq API key not found in the environment variables.")

# Prompt template for language model
prompt_template = ChatPromptTemplate.from_template(
    """
    Answer the questions based on the provided context only.
    Please provide the most accurate response based on the question.
    <context>
    {context}
    <context>
    Questions: {input}
    """
)

# Database connection setup
def get_db_connection():
    conn = psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )
    return conn

# Create the pdf_documents table if it doesn't exist
def create_table_if_not_exists():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # SQL to create the table if it does not exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS pdf_documents (
                id SERIAL PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                upload_date TIMESTAMP NOT NULL
            );
        """)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error creating table: {str(e)}")

# Call the function to ensure the table exists when the application starts
create_table_if_not_exists()

# Endpoint for uploading PDF
@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF file, store it in a vector database, and save metadata in PostgreSQL.
    """
    global vector_store

    try:
        # Save the uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_pdf_path = temp_file.name

        # Connect to PostgreSQL and insert metadata
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert metadata (filename and upload date) into the database
        upload_date = datetime.now()
        cursor.execute("INSERT INTO pdf_documents (filename, upload_date) VALUES (%s, %s) RETURNING id;", 
                       (file.filename, upload_date))
        conn.commit()

        # Fetch the ID of the newly inserted record
        new_pdf_id = cursor.fetchone()[0]

        # Load and process the PDF document
        embeddings = HuggingFaceEmbeddings(
            model_name='BAAI/bge-small-en-v1.5',
            model_kwargs={'device': 'cpu'},
            encode_kwargs={'normalize_embeddings': True}
        )
        loader = PyPDFLoader(temp_pdf_path)
        documents = loader.load()

        # Split the text into chunks for better processing
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        document_chunks = text_splitter.split_documents(documents)

        # Create a vector store for the PDF content
        vector_store = FAISS.from_documents(document_chunks, embeddings)

        # Clean up the temporary file after processing
        os.remove(temp_pdf_path)

        cursor.close()
        conn.close()

        return JSONResponse(content={"message": "Vector database created successfully and metadata saved."}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Endpoint for asking questions based on the uploaded PDF
@app.post("/ask_question/")
async def ask_question(question: str = Form(...)):
    """
    Query the vector database with a question and return an answer.
    """
    global vector_store

    if not vector_store:
        return JSONResponse(content={"error": "Vector database not initialized. Please upload a PDF first."}, status_code=400)

    try:
        # Create the retrieval chain for answering questions
        document_chain = create_stuff_documents_chain(llm, prompt_template)
        retriever = vector_store.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)

        # Get the response from the retrieval chain
        response = retrieval_chain.invoke({'input': question})

        return JSONResponse(content={"answer": response['answer']}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)