# PDF Upload and Query API with Client Interface

This project consists of a **FastAPI server** for uploading PDF documents, storing their content in a vector database, and querying them using natural language. Additionally, it includes a **frontend client** built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS** that provides a user-friendly interface for interacting with the API.

## Features

### Server Features:
- Upload PDF documents via API and store their metadata in a PostgreSQL database.
- Process PDFs into vector embeddings using HuggingFace embeddings and store them in FAISS for efficient querying.
- Query uploaded PDFs with natural language and receive context-based answers.

### Client Features:
- Intuitive interface for uploading PDF files and asking questions.
- Real-time feedback and responses displayed to the user.
- Built with modern technologies including Vite, TypeScript, and Tailwind CSS for a sleek, responsive UI.

---

## Technologies Used

### Server:
- **FastAPI**: For building the backend API.
- **PostgreSQL**: To store metadata about uploaded PDFs.
- **FAISS**: For efficient vector storage and retrieval.
- **Langchain**: Framework for language model integrations.
- **HuggingFace Embeddings**: For generating vector representations of PDF content.

### Client:
- **React**: For building the UI.
- **TypeScript**: For a type-safe codebase.
- **Vite**: For fast development and bundling.
- **Tailwind CSS**: For styling and responsive design.

---

## Installation and Setup

### Prerequisites

- Python 3.8+
- Node.js and npm
- PostgreSQL database (local or remote)

---

### Backend Setup (Server)

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables by creating a `.env` file in the root directory with the following content:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   groq_api=your_groq_api_key
   ```

5. Start the server:

   ```bash
   uvicorn main:app --reload
   ```

The server will run at `http://localhost:5000`.

---

### Frontend Setup (Client)

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The client will be accessible at `http://localhost:5173`.

---

## API Endpoints

### 1. `/upload_pdf/` (Server)

- **Method**: POST
- **Description**: Upload a PDF document, store its metadata in the database, and save its content in a vector store.
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

---

### 2. `/ask_question/` (Server)

- **Method**: POST
- **Description**: Ask a question based on the uploaded PDFs, and receive an answer.
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

---

## Client Functionality

The client provides a bot-like interface where users can:

1. Upload a PDF document directly from their browser.
2. Input questions related to the uploaded document.
3. Receive context-aware answers from the server.

---

## Folder Structure

```plaintext
.
├── client/                 # Frontend code
│   ├── src/                # React components and logic
│   ├── public/             # Static files
│   └── package.json        # Frontend dependencies
├── server/                 # Backend code
│   ├── main.py             # FastAPI server
│   ├── requirements.txt    # Backend dependencies
│   └── .env                # Environment variables
└── README.md               # Project documentation
```

---

## License

This project is licensed under the MIT License. Feel free to use and contribute.

---

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## Contact

For any issues or questions, feel free to open an issue or reach out to the maintainer.
