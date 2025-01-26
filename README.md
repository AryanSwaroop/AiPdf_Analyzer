Sure! Here is the markdown code for your `README.md` that you can directly use for your GitHub repository:

```markdown
# PDF Upload and Query API

This FastAPI application allows users to upload PDF documents, store their content in a vector database, and perform queries to extract relevant information based on the uploaded PDFs. The application uses various technologies such as FastAPI, PostgreSQL, Langchain, and FAISS for vector storage.

## Features

- Upload PDF files and store metadata in a PostgreSQL database.
- Process and convert the content of PDFs into vector embeddings using HuggingFace embeddings.
- Store the vector representations in a FAISS vector store.
- Query the vector store with natural language questions and receive context-based answers.
- CORS enabled for frontend integration.

## Technologies Used

- **FastAPI**: A fast web framework for building APIs with Python.
- **PostgreSQL**: A relational database to store metadata about uploaded PDF documents.
- **FAISS**: A library for efficient similarity search and clustering of dense vectors.
- **Langchain**: A framework for working with language models, document chains, and embedding models.
- **HuggingFace Embeddings**: Pre-trained embeddings from HuggingFace to convert text into vector representations.
- **Groq API**: For using large-scale language models for query processing.

## Requirements

Before running the project, make sure you have the following dependencies installed:

- Python 3.8+
- PostgreSQL database (local or remote)
- Dependencies listed in `requirements.txt`

### Install dependencies

You can install the required dependencies using pip:

```bash
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the root directory of your project and add the following variables:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
groq_api=your_groq_api_key
```

Make sure to replace the placeholders with actual values.

## API Endpoints

### 1. `/upload_pdf/`

- **Method**: POST
- **Description**: Upload a PDF document, store its content in a vector database, and save the metadata in PostgreSQL.
- **Parameters**: 
  - `file`: The PDF file to upload (Multipart/Form-Data).

**Example Request**:

```bash
curl -X 'POST' \
  'http://localhost:5000/upload_pdf/' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@path_to_your_pdf.pdf'
```

**Response**:

```json
{
  "message": "Vector database created successfully and metadata saved."
}
```

### 2. `/ask_question/`

- **Method**: POST
- **Description**: Ask a question based on the uploaded PDFs, and receive an answer generated from the document context.
- **Parameters**:
  - `question`: The question to ask (Form-Data).

**Example Request**:

```bash
curl -X 'POST' \
  'http://localhost:5000/ask_question/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'question=What is the purpose of this document?'
```

**Response**:

```json
{
  "answer": "This document is a guide to using the API for PDF uploading and querying."
}
```

## Database Schema

The application uses a PostgreSQL database to store metadata about the uploaded PDF documents. The table schema is as follows:

### `pdf_documents` Table

| Column     | Type         | Description                             |
|------------|--------------|-----------------------------------------|
| `id`       | SERIAL       | Primary Key, auto-incremented ID        |
| `filename` | VARCHAR(255) | The name of the uploaded PDF file       |
| `upload_date` | TIMESTAMP  | The date and time when the PDF was uploaded |

## Running the Application

1. Start the PostgreSQL database and make sure the `.env` file is configured properly.
2. Run the FastAPI application:

```bash
uvicorn main:app --reload
```

The application will be accessible at `http://localhost:5000`.

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
```

You can copy and paste this code into the `README.md` file in the root of your repository. It will provide a clear guide for setting up, running, and using your project.
