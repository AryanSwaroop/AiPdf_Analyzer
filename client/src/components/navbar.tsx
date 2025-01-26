import { useState , useRef } from 'react';
import apiClient from '../API/axios_instance';
import { api_endpoints } from '../API/api_endpoints';

const Navbar = () => {

    const fileref = useRef<HTMLInputElement | null>(null);

    const [fileName , setFileName] = useState(null);
    
    const handleButtonClick = () => {
        // Trigger the file input click
        if(fileref.current){
          fileref.current.click();
        }
    };
    
    const handleFileChange = (event : any) => {
        const file = event.target.files[0];
        if (file) {
        uploadFile(file);
        console.log("Selected file:", file.name);
        setFileName(file.name);
        }
    };

    const uploadFile = async (file : any) => {
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const response = await apiClient.post(api_endpoints.pdf , formData);
          console.log('Upload successful:', response.data);
        } catch (error) {
          console.error('Error uploading:', error);
        }
      };
      
    
    return (
        <div style={{ boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)' }} className=" top-0 fixed h-15 w-full bg-white shadow-xs shadow-black flex justify-between items-center">

            <img src="aiplanetLogo.svg" className="h-15 w-15 m-auto ml-4"/>

        {

            fileName 
            &&
            <div className='flex flex-row'>
                <img src="file.svg" className="h-8 w-8 mr-1"/>
                <h1 className='text-green-500 m-auto mr-7 font-semibold'>{fileName}</h1>
            </div>

        }
        <form onSubmit={(e) => {e.preventDefault()}}>
            <input type='file' className='hidden' ref={fileref} onChange={handleFileChange}/> 
            <button onClick={handleButtonClick} className="h-8 w-fit p-auto pr-3 pl-3 flex flex-row border-1 border-black text-center justify-center mr-4 rounded-sm bg-white hover:bg-green-300">
                <img className="h-4 w-4 m-auto mr-1" src="add.svg"/>
                <p className="ml-1 m-auto self-center text-sm font-semibold text-black">Upload PDF</p>
            </button>
        </form>

        </div>
    )
}

export default Navbar;