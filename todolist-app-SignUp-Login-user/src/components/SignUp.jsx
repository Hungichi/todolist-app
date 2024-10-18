import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import './Auth.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state cho mật khẩu xác nhận
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu và mật khẩu xác nhận không khớp.');
      setSuccessMessage('');
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Đăng ký thành công!');
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng Ký</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật Khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '🙈'}
          </span>
        </div>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Ký</button>
      </form>
      <p>Đã có tài khoản? <a href="/login">Đăng Nhập</a></p>
    </div>
  );
};

export default SignUp;
