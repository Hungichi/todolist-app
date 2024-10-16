import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const backgroundImages = [
  '/images/backgrounds/bg1.jpg',
  '/images/backgrounds/bg2.jpg',
  '/images/backgrounds/bg3.jpg',
  '/images/backgrounds/bg4.jpg',
  '/images/backgrounds/bg5.jpg',
];

const BoardsPage = () => {
  const navigate = useNavigate();

  // Hàm lấy boards từ Local Storage nếu có, nếu không dùng boards mặc định
  const loadBoards = () => {
    const savedBoards = localStorage.getItem('boards');
    return savedBoards
      ? JSON.parse(savedBoards)
      : [
          { id: 'board-1', title: 'Project A', background: '/images/backgrounds/bg1.jpg' },
          { id: 'board-2', title: 'Project B', background: '/images/backgrounds/bg2.jpg' },
          { id: 'board-3', title: 'Project C', background: '/images/backgrounds/bg3.jpg' },
        ];
  };

  // State quản lý danh sách boards
  const [boards, setBoards] = useState(loadBoards);
  const [isCreating, setIsCreating] = useState(false); // Điều khiển modal tạo board mới
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBackground, setNewBackground] = useState(backgroundImages[0]);

  // Lưu boards vào Local Storage mỗi khi state boards thay đổi
  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  // Hàm thêm board mới
  const handleAddBoard = () => {
    if (newBoardTitle.trim()) {
      const newBoard = {
        id: `board-${Date.now()}`,
        title: newBoardTitle,
        background: newBackground,
      };

      setBoards((prevBoards) => [...prevBoards, newBoard]); // Thêm board mới vào state
      resetForm(); // Reset form và đóng modal
    }
  };

  // Hàm reset form và đóng modal
  const resetForm = () => {
    setNewBoardTitle('');
    setNewBackground(backgroundImages[0]);
    setIsCreating(false);
  };

  // Hàm điều hướng đến board và truyền background qua state
  const handleBoardClick = (board) => {
    navigate(`/board/${board.id}`, { state: { background: board.background } });
  };

  return (
    <div className="boards-page">
      <h1>Your Workspaces</h1>

      <button className="create-board-btn" onClick={() => setIsCreating(true)}>
        + Create New Board
      </button>

      {/* Modal tạo board mới */}
      {isCreating && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Create a New Board</h2>
            <input
              type="text"
              placeholder="Enter board title"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
            />
            <div className="background-selection">
              <h3>Select Background</h3>
              <div className="background-options">
                {backgroundImages.map((image, index) => (
                  <div
                    key={index}
                    className={`background-option ${
                      newBackground === image ? 'selected' : ''
                    }`}
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    onClick={() => setNewBackground(image)}
                  />
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={handleAddBoard}>Create</button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách boards */}
      <div className="boards-list">
        {boards.map((board) => (
          <div
            key={board.id}
            className="board-link"
            style={{
              backgroundImage: `url(${board.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleBoardClick(board)}
          >
            <div className="board-item">
              <h2>{board.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardsPage;
