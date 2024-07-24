import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ message }) => {
  return (
    <div className={`chat-bubble ${message.sender}`}>
      {message.text}
    </div>
  );
};

export default ChatBubble;
