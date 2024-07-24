import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessages((prevMessages) => [...prevMessages, { text: transcript, sender: 'user' }]);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      console.error('Speech Recognition API not supported in this browser.');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSend}>Send</button>
        <button onClick={startListening}>🎤</button>
      </div>
    </div>
  );
};

export default Chat;
