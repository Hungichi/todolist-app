import React from 'react';
import Card from './Card';
import AddCard from './AddCard';
import { useDrop } from 'react-dnd';

const List = ({ list, onAddCard, onEditCard, onDeleteCard, moveCard }) => {
  const handleAddCard = (newCard) => {
    onAddCard(list.id, newCard);
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      moveCard(item.listId, item.index, list.id, 0); // Di chuyển thẻ vào danh sách hiện tại
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="list" style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }}>
      <h3>{list.title}</h3>
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
