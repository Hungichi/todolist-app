import React, { useState } from 'react';

const AddCard = ({ onAddCard }) => {
  const [cardTitle, setCardTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardTitle) return;

    const newCard = {
      id: `card-${Date.now()}`,
      title: cardTitle,
    };

    onAddCard(newCard);
    setCardTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new card"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        required
      />
      <button type="submit" className="add-card">Add Card</button>
    </form>
  );
};

export default AddCard;
