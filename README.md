# Ai Pdf Analysis and Question Answer Bot

### Hosted Client : https://ai-pdf-analyzer-questioner.vercel.app/

### Hosted API : https://aipdf-analyzer.onrender.com

## Disclaimer : server is a spin down server so it will be sleeping on first request , it takes 1 - 2 minutes to go live again ! So , please be patient while testing.

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

### Innovations
- Added Chat Scroll Option for going through chat history.
- Added Indicator to tell if server is ready or not for questions.
- Added Chat Saving through PDF so that users can save their chat history for future references.
  
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
   uvicorn main:app --host 0.0.0.0 --port 5000 --reload 
   ```

The server will run at `http://0.0.0.0:5000`.

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
  'http://0.0.0.0:5000/upload_pdf/' \
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
  'http://0.0.0.0:5000/ask_question/' \
  -H 'accept: application/json' \
  -H 'Content-Type:  multipart/form-data' \
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

---

## Client Functionality

The client provides a bot-like interface where users can:

1. Upload a PDF document directly from their browser.
2. Input questions related to the uploaded document.
3. Receive context-aware answers from the server.
4. Export or save chat history as a pdf. 

---

## Folder Structure

```plaintext

AiPdf_Analyzer/
├── client/                 # Frontend application
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── types/          # Application Interfaces
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Entry point
│   │   └── ...             # Other source files
│   ├── index.html          # HTML template
│   ├── package.json        # NPM package configuration
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── tsconfig.json       # TypeScript configuration
│
├── server/                 # Backend application
│   ├── main.py             # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── ...                 # Other server files
│
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── LICENSE                 # License file
└── README.md               # Project documentation

```
## License

This project is licensed under the MIT License. Feel free to use and contribute.

---
# Handheld UI 

![image](https://github.com/user-attachments/assets/afc8ae10-1e8a-408b-ab0f-470005a87fcf)

---
# Desktop UI

![image](https://github.com/user-attachments/assets/fea452ee-6ea4-42be-b9b7-8cb096a5d045)

---

# Innovations ScreenShots

### Server Ready Indicator :- 
![image](https://github.com/user-attachments/assets/5ff76235-8bfe-4fbb-879a-577f4352d37c)

### Chat to PDF :- 
![image](https://github.com/user-attachments/assets/df8a4fb6-1bb2-44a4-a440-b9999ec4735f)

## Scrolling Feature :-
![image](https://github.com/user-attachments/assets/65ebad9e-3256-459d-a17b-3fe14aea01a8)

---
### Working Sample

https://github.com/user-attachments/assets/9ff33eea-6b25-4b65-a143-c955030e4799

---

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## Contact

For any issues or questions, feel free to open an issue or reach out to the maintainer.
