import React, { useState } from 'react';

const AddList = ({ onAddList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleAddList = () => {
    if (listTitle.trim()) {
      const newList = {
        id: `list-${Date.now()}`, // Tạo ID duy nhất cho mỗi danh sách mới
        title: listTitle,
        cards: [],
      };
      onAddList(newList); // Gọi hàm thêm danh sách
      setListTitle(''); // Reset ô nhập sau khi thêm danh sách
      setIsAdding(false); // Đóng form sau khi thêm danh sách
    }
  };

  const handleCancel = () => {
    setIsAdding(false); // Hủy hành động thêm danh sách
    setListTitle(''); // Xóa nội dung đã nhập
  };

  return (
    <div className="add-list">
      {isAdding ? (
        <div>
          <input
            type="text"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            placeholder="Enter list title"
            autoFocus
          />
          <div className="actions">
            <button onClick={handleAddList}>Add List</button>
            <button onClick={handleCancel}>X</button> {/* Nút hủy */}
          </div>
        </div>
      ) : (
        <button className="add-list-btn" onClick={() => setIsAdding(true)}>
          + Add another list
        </button>
      )}
    </div>
  );
};

export default AddList;
