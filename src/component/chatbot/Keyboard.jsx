// src/Keyboard.js
import React from 'react';
import './chatbot.css'; // استخدام نفس ملف CSS

const Keyboard = ({ onKeyPress }) => {
  const keys = [
    'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'مسافة', 'حذف'
  ];

  return (
    <div id="keyboard-container">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          className="keyboard-key"
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
