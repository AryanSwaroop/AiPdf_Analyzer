import { useEffect, useState } from 'react';
import apiClient from '../API/axios_instance';
import { api_endpoints } from '../API/api_endpoints';
import {ChildDataTypeFunction} from '../types/main';

// Define the callback interface
export interface callBackType {
  callback: (data : ChildDataTypeFunction) => void;
}

// Destructure props
const InputBar = ({ callback }: callBackType) => {

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if(answer !== ''){
        callback({question , answer}); 
    }
  },[answer]);

  const uploadQuestion = async (question: string) => {
    try {
      const response = await apiClient.post(api_endpoints.question, { question });
      // Call parent callback
      console.log(response.data); // Call parent callback
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  const handleQuestionSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadQuestion(question);
    console.log(question);
  };

  return (
    <div className="fixed bottom-20 w-full">
      <form
        className="flex flex-row justify-center items-center"
        onSubmit={handleQuestionSubmission}
      >
        <input
          style={{ boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)' }}
          className="shadow-sm shadow-gray-400 text-black pl-3 mr-0 h-13 w-3/5 bg-white rounded-md rounded-r-none"
          type="text"
          placeholder="Send a message..."
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          style={{ boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)' }}
          className="shadow-sm shadow-gray-400 h-13 w-10 rounded-md rounded-l-none bg-white"
          type="submit"
        >
          <img src="arrow.svg" className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default InputBar;
