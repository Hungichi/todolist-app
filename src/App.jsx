// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './components/Board';
import BoardsPage from './components/BoardsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/board/:boardId" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
