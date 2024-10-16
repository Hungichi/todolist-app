import React, { useState } from 'react';
import './CreateBoardModal.css'; 

const CreateBoardModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState(''); // State lưu tên board mới

  const handleSubmit = () => {
    if (title) {
      onCreate(title); // Gọi hàm tạo board từ props
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Create a new Board</h2>
        <input
          type="text"
          placeholder="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;
