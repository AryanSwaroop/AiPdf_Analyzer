import Navbar from './components/navbar';
import InputBar from './components/inputBar';
import Textfield from './util/textfield';
import { useState, useEffect, useRef } from 'react';

export interface ChildDataTypeFunction {
  question: string;
  answer: string;
}

function App() {
  const [messages, setMessages] = useState<{ body: string; chat: string }[]>([]); // Array to hold all chat messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for the end of the messages container

  const handleDataFromChild = (childData: ChildDataTypeFunction) => {
    console.log('Received from child:', childData);

    // Add new question and answer to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { body: childData.question, chat: 'user' }, // Add the question
      { body: childData.answer, chat: 'aiplanet' }, // Add the answer
    ]);
  };

  const defaultMessages = {"body" : "Hello! I’m AiPlanet’s PDF Analyzer Bot. I’m here to assist you with insights and queries about any PDF you upload. Simply upload a PDF file to get started." , "chat" : "aiplanet"};

  // Scroll to the bottom of the chat container when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="h-screen w-screen bg-white">
      <Navbar />
      <div
        className="mt-40 flex flex-col h-[calc(100vh-10rem)] w-full overflow-y-scroll px-4"
      >
        {/* Render all messages dynamically */}
        <Textfield {...defaultMessages} />
        {messages.map((message, index) => (
          <Textfield key={index} {...message} />
        ))}
        {/* Dummy div to scroll to , works only when first message is rendered.*/}
        { 
        messages.length != 0 &&
        <div ref={messagesEndRef} />
        }

      </div>
      <InputBar callback={handleDataFromChild} />
    </div>
  );
}

export default App;
