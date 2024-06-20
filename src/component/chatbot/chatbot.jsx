import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';
import Keyboard from './Keyboard';
import Linkify from 'react-linkify';
import parse from 'html-react-parser';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const welcomeMessage = "مرحبًا بك! كيف يمكنني مساعدتك؟";
  const chatMessagesRef = useRef(null);

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    try {
      const response = await axios.get(`http://localhost:5000/api/chatBot?message=${encodeURIComponent(inputValue)}`);
      const botReply = response.data.reply;
      const botMessages = [...newMessages, { text: botReply, sender: 'bot' }];
      setMessages(botMessages);
    } catch (error) {
      console.error('Error communicating with the bot:', error);
      // Show error message to the user
      setMessages([...newMessages, { text: 'حدثت مشكلة أثناء الاتصال بالخادم', sender: 'bot' }]);
    }
  };

  const handleKeyPress = (key) => {
    if (key === 'مسافة') {
      setInputValue(inputValue + ' ');
    } else if (key === 'حذف') {
      setInputValue(inputValue.slice(0, -1));
    } else {
      setInputValue(inputValue + key);
    }
  };

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Display welcome message on component mount
    setMessages([{ text: welcomeMessage, sender: 'bot' }]);
  }, []);

  return (
    <div id="chat-container">
      <div id="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">
              <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                <a href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">
                  {decoratedText}
                </a>
              )}>
                {typeof message.text === 'string' ? parse(message.text) : message.text}
              </Linkify>
            </div>
          </div>
        ))}
      </div>
      <div id="user-input">
        <input
          type="text"
          id="message-input"
          placeholder="أدخل رسالتك..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button className="bb" onClick={sendMessage}>إرسال</button>
      </div>
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default ChatBot;
