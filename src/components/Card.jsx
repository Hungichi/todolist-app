import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Card = ({ card, index, onEditCard, onDeleteCard, moveCard, listId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, index, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return; // Nếu không thả vào danh sách, không làm gì cả
      }
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.listId, item.index, listId, index);
        item.index = index; // Cập nhật vị trí hiện tại của thẻ
        item.listId = listId; // Cập nhật listId
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditCard(card.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }} // Thay đổi độ mờ khi kéo
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <span>{card.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteCard(card.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Card;
