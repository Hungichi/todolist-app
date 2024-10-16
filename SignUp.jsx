// src/components/SignUp.jsx
import React, { useState } from 'react';
import { auth } from '../firebase'; // Đường dẫn đến tệp firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css'; // Đảm bảo bạn có tệp CSS này

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Đăng ký thành công!');
      // Bạn có thể chuyển hướng đến trang khác hoặc làm gì đó khác ở đây
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default SignUp;
