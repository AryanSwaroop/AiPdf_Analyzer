import Navbar from './components/navbar';
import InputBar from './components/inputBar';
import Textfield from './util/textfield';
import { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ChildDataTypeFunction} from './types/main';



function App() {
  const [messages, setMessages] = useState<{ body: string; chat: string }[]>([]); // Array to hold all chat messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for the end of the messages container
  const chatContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the chat container

  const handleDataFromChild = (childData: ChildDataTypeFunction) => {
    console.log('Received from child:', childData);

    // Add new question and answer to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { body: childData.question, chat: 'user' }, // Add the question
      { body: childData.answer, chat: 'aiplanet' }, // Add the answer
    ]);
  };

  const defaultMessages = {
    body: "Hello! I’m AiPlanet’s PDF Analyzer Bot. I’m here to assist you with insights and queries about any PDF you upload. Simply upload a PDF file to get started.",
    chat: "aiplanet",
  };

  // Scroll to the bottom of the chat container when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleDownloadChat = async () => {
    if (!chatContainerRef.current) return;

    try {
      // Convert the chat container to an image using html2canvas
      const canvas = await html2canvas(chatContainerRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF document using jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Scale height proportionally

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save('chat.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="h-screen w-screen bg-white">
      <Navbar />

      {/* Save Chat Button */}
      <button
        onClick={handleDownloadChat}
        className="mt-20 ml-5 flex rounded-xl text-sm justify-center flex-col h-fit p-2 w-fit hover:bg-gray-200 shadow-sm border-0 shadow-green-700"
      >
        <img src="download.svg" className="m-auto h-8 w-8" />
        <p className="font-semibold text-green-700">Save Chat</p>
      </button>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="mt-10 lg:mt-35 flex flex-col h-[calc(100vh-10rem)] w-full overflow-y-scroll px-4"
      >
        {/* Render all messages dynamically */}
        <Textfield {...defaultMessages} />
        {messages.map((message, index) => (
          <Textfield key={index} {...message} />
        ))}
        {/* Dummy div to scroll to */}
        {messages.length !== 0 && <div ref={messagesEndRef} />}
      </div>

      <InputBar callback={handleDataFromChild} />
    </div>
  );
}

export default App;
