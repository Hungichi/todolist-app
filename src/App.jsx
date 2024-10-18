import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardsPage from './components/BoardsPage';  // Import BoardsPage
import Board from './components/Board';  // Import Board để hiển thị từng board cụ thể
import SignUp from './components/SignUp';  // Import component Đăng Ký
import Login from './components/Login';      // Import component Đăng Nhập
import NotFound from './components/NotFound'; // Import trang Not Found

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<BoardsPage />} />  {/* Trang chính */}
          <Route path="/board/:id" element={<Board />} />  {/* Trang của mỗi board */}
          <Route path="/signup" element={<SignUp />} />  {/* Trang Đăng Ký */}
          <Route path="/login" element={<Login />} />    {/* Trang Đăng Nhập */}
          <Route path="*" element={<NotFound />} />      {/* Trang Not Found */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
