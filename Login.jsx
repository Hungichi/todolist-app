// src/components/Login.jsx
import React, { useState } from 'react';
import { auth } from '../firebase'; // Đường dẫn đến tệp firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; // Đảm bảo bạn có tệp CSS này

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Đăng nhập thành công!');
      // Bạn có thể chuyển hướng đến trang khác hoặc làm gì đó khác ở đây
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default Login;
