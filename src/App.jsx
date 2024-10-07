import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardsPage from './components/BoardsPage';  // Import BoardsPage
import Board from './components/Board';  // Import Board để hiển thị từng board cụ thể

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<BoardsPage />} />  {/* Trang chính */}
          <Route path="/board/:id" element={<Board />} />  {/* Trang của mỗi board */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
