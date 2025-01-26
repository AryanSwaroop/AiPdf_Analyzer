from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
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

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Or specify your frontend's domain like "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],
)

# Initialize global variables
vector_store = None
llm = None

# Check if the environment variable is set
groq_api_key = os.getenv('groq_api')
if groq_api_key:
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")
else:
    raise ValueError("Groq API key not found in the environment variables.")

# Prompt template
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

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF file and create a vector database.
    """
    global vector_store

    try:
        # Save the uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_pdf_path = temp_file.name

        # Load and process the PDF
        embeddings = HuggingFaceEmbeddings(
            model_name='BAAI/bge-small-en-v1.5',
            model_kwargs={'device': 'cpu'},
            encode_kwargs={'normalize_embeddings': True}
        )
        loader = PyPDFLoader(temp_pdf_path)
        documents = loader.load()

        # Split the text into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        document_chunks = text_splitter.split_documents(documents)

        # Create vector database
        vector_store = FAISS.from_documents(document_chunks, embeddings)

        # Clean up temporary file after processing
        os.remove(temp_pdf_path)

        return JSONResponse(content={"message": "Vector database created successfully"}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/ask_question/")
async def ask_question(question: str = Form(...)):
    """
    Query the vector database with a question and return an answer.
    """
    global vector_store

    if not vector_store:
        return JSONResponse(content={"error": "Vector database not initialized. Please upload a PDF first."}, status_code=400)

    try:
        # Create the retrieval chain
        document_chain = create_stuff_documents_chain(llm, prompt_template)
        retriever = vector_store.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)

        # Get the response
        response = retrieval_chain.invoke({'input': question})

        return JSONResponse(content={"answer": response['answer']}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
