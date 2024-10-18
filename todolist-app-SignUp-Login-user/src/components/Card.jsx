import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BiPencil } from 'react-icons/bi'; // Icon bút

const Card = ({ card, index, onEditCard, onDeleteCard, moveCard, listId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);

  // Kéo thả thẻ
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, index, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.listId, item.index, listId, index);
        item.index = index;
        item.listId = listId;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditCard(card.id, newTitle);
    setIsPopupOpen(false);
  };

  return (
    <div
      ref={(node) => drag(drop(node))} // Kết hợp kéo và thả
      className="card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
      }}
    >
      <span>{card.title}</span>

      {/* Nút bút để mở popup */}
      <BiPencil
        className="edit-icon"
        onClick={() => setIsPopupOpen(true)}
      />

      {/* Popup chỉnh sửa và xóa */}
      {isPopupOpen && (
        <div className="popup">
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              autoFocus
            />
            <div className="popup-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsPopupOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteCard(card.id);
                  setIsPopupOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Card;
