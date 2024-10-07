import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BoardsPage = () => {
  const [boards, setBoards] = useState([
    { id: 'board-1', title: 'Project A' },
    { id: 'board-2', title: 'Project B' },
    { id: 'board-3', title: 'Project C' }
  ]);

  return (
    <div className="boards-page">
      <h1>Your Workspaces</h1>
      <div className="boards-list">
        {boards.map(board => (
          <Link key={board.id} to={`/board/${board.id}`} className="board-link">
            <div className="board-item">
              <h2>{board.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoardsPage;
