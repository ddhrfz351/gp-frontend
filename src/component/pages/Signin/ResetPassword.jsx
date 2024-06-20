// src\component\pages\Signin\ResetPassword.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import './rest.css';
import { Navigate } from 'react-router-dom'
function ResetPasswordPage() {
  // State variables
  const [reqEmail, setReqEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

 // Handle sending verification code
const handleSendCode = async () => {
  try {
    await axios.post('http://localhost:5000/api/password/sendCodetoEmail', { reqEmail });
    setMessage('تم إرسال رمز التحقق بنجاح');
    setStep(2);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setMessage('خطأ: ' + error.response.data.message);
    } else {
      setMessage('خطأ غير متوقع: ' + error.message);
    }
  }
};

// Handle resetting password
const handleResetPassword = async () => {
  try {
    const formData = { reqEmail, code, password };
    const response = await axios.post('http://localhost:5000/api/password', formData);
    setMessage(response.data.message);

    // Redirect to the signin page
    window.location.href = '/signin';
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setMessage('خطأ: ' + error.response.data.message);
    } else {
      setMessage('خطأ غير متوقع: ' + error.message);
    }
  }
};


  return (
    <div className="form-container">
      <h2>إعادة تعيين كلمة المرور</h2>
      <form className="form">
        {step === 1 && (
          <div>
            <label>البريد الإلكتروني:</label>
            <input
              type="email"
              placeholder="ادخل بريدك الإلكتروني"
              value={reqEmail}
              onChange={(e) => setReqEmail(e.target.value)}
            />
            <button type="button" onClick={handleSendCode}>إرسال رمز التحقق</button>
          </div>
        )}
        {step === 2 && (
          <div className="code-input">
            <label>رمز التحقق:</label>
            <input
              type="text"
              placeholder="ادخل رمز التحقق"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="password-input">
              <label>كلمة المرور الجديدة:      </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="ادخل كلمة المرور الجديدة"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <MdVisibilityOff onClick={() => setShowPassword(false)} />
              ) : (
                <MdVisibility onClick={() => setShowPassword(true)} />
              )}
            </div>
            <button type="button" onClick={handleResetPassword}>إعادة تعيين كلمة المرور</button>
          </div>
        )}
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default ResetPasswordPage;
