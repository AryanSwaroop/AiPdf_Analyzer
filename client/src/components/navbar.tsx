import { useState, useRef } from 'react';
import apiClient from '../API/axios_instance'; // Importing custom API client for making HTTP requests
import { api_endpoints } from '../API/api_endpoints'; // Importing API endpoint configurations

const Navbar = () => {
    // Reference to the file input element to trigger file selection programmatically
    const fileref = useRef<HTMLInputElement | null>(null);

    // State to track if the file is being read
    const [reading, setreading] = useState(true);

    // State to store the selected file name
    const [fileName, setFileName] = useState(null);

    // Function to handle the button click for triggering the file input
    const handleButtonClick = () => {
        // Trigger the file input's click event if the ref is available
        if (fileref.current) {
            fileref.current.click();
        }
    };

    // Function to handle file selection and validate the file type
    const handleFileChange = (event: any) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            // Check if the selected file is a PDF
            if (file.type === 'application/pdf') {
                console.log("This is a PDF file");
                setreading(true); // Set the reading state to true
                uploadFile(file); // Upload the file
                console.log("Selected file:", file.name);
                setFileName(file.name); // Set the file name in state
            } else {
                alert("Please select a PDF file"); // Show alert if the file is not a PDF
            }
        }
    };

    // Function to upload the file to the server
    const uploadFile = async (file: any) => {
        const formData = new FormData(); // Create a new FormData object
        formData.append('file', file); // Append the file to the FormData

        try {
            // Make a POST request to upload the file
            const response = await apiClient.post(api_endpoints.pdf, formData);
            console.log('Upload successful:', response.data);
            setreading(false); // Set the reading state to false after upload
        } catch (error) {
            console.error('Error uploading:', error); // Log errors if any
        }
    };

    return (
        <div 
            style={{ boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)' }} 
            className="top-0 fixed h-15 w-full bg-white shadow-xs shadow-black flex justify-between items-center"
        >
            {/* Logo on the left side of the navbar */}
            <img src="aiplanetLogo.svg" className="h-15 w-15 m-auto ml-4" />

            {/* Display the file name if not reading, else show a loading message */}
            {
                !reading && fileName && (
                    <div className='flex flex-row'>
                        <img src="file.svg" className="h-8 w-8 mr-1" />
                        <h1 className='text-green-500 m-auto mr-7 font-semibold'>{fileName}</h1>
                    </div>
                )
            }

            {
                reading && fileName && (
                    <div className='text-green-500 m-auto mr-7 font-semibold'>Reading ...</div>
                )
            }

            {/* Form to handle file input */}
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <input 
                    type='file' 
                    className='hidden' 
                    ref={fileref} 
                    onChange={handleFileChange} 
                />
                <button 
                    onClick={handleButtonClick} 
                    className="h-8 w-fit p-auto pr-3 pl-3 flex flex-row border-1 border-black text-center justify-center mr-4 rounded-sm bg-white hover:bg-green-300"
                >
                    {/* Add file upload button with icon */}
                    <img className="h-4 w-4 m-auto mr-1" src="add.svg" />
                    <p className="ml-1 m-auto self-center text-sm font-semibold text-black">Upload PDF</p>
                </button>
            </form>
        </div>
    );
};

export default Navbar;
