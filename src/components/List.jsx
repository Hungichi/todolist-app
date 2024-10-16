import React, { useState } from 'react';
import Card from './Card';
import AddCard from './AddCard';
import { useDrop } from 'react-dnd';

const List = ({ list, onAddCard, onEditCard, onDeleteCard, moveCard, onEditListTitle, onDeleteList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleEditTitle = () => {
    setIsEditing(false);
    onEditListTitle(list.id, newTitle);
  };
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const handleDeleteList = () => {
    onDeleteList(list.id); 
  };

  const handleAddCard = (newCard) => {
    onAddCard(list.id, newCard);
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      moveCard(item.listId, item.index, list.id, 0);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="list" style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleEditTitle}
          onKeyDown={(e) => e.key === 'Enter' && handleEditTitle()}
          autoFocus
        />
      ) : (
        <h3 onClick={() => setIsEditing(true)}>{list.title}</h3>
      )}
      {list.cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          onEditCard={onEditCard}
          onDeleteCard={onDeleteCard}
          moveCard={moveCard}
          listId={list.id}
        />
      ))}
      <AddCard onAddCard={handleAddCard} />
    </div>
  );
};

export default List;
