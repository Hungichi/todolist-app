// AddBoard.jsx
import React, { useState } from 'react';

const images = [
  '/images/board1.jpg',
  '/images/board2.jpg',
  '/images/board3.jpg',
]; // Các ảnh có sẵn trong public/images

const AddBoard = ({ onAddBoard }) => {
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleAddBoard = () => {
    if (title.trim()) {
      const newBoard = {
        id: `board-${Date.now()}`,
        title,
        image: selectedImage,
      };
      onAddBoard(newBoard);
      setTitle('');
      setSelectedImage(images[0]);
    }
  };

  return (
    <div className="add-board">
      <input
        type="text"
        placeholder="Enter board title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={selectedImage}
        onChange={(e) => setSelectedImage(e.target.value)}
      >
        {images.map((image, index) => (
          <option key={index} value={image}>
            {image}
          </option>
        ))}
      </select>
      <button onClick={handleAddBoard}>Add Board</button>
    </div>
  );
};

export default AddBoard;
