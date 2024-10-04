import React, { useState } from 'react';
import List from './List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const initialBoard = {
  id: 'board-1',
  title: 'My Board',
  lists: [
    { id: 'list-1', title: 'To Do', cards: [] },
    { id: 'list-2', title: 'In Progress', cards: [] },
    { id: 'list-3', title: 'Done', cards: [] },
  ],
};

const Board = () => {
  const [board, setBoard] = useState(initialBoard);

  const addCardToList = (listId, newCard) => {
    setBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) => {
        if (list.id === listId) {
          return { ...list, cards: [...list.cards, newCard] };
        }
        return list;
      });
      return { ...prevBoard, lists: updatedLists };
    });
  };

  const editCard = (cardId, newTitle) => {
    setBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) => {
        const updatedCards = list.cards.map((card) => {
          if (card.id === cardId) {
            return { ...card, title: newTitle };
          }
          return card;
        });
        return { ...list, cards: updatedCards };
      });
      return { ...prevBoard, lists: updatedLists };
    });
  };

  const deleteCard = (cardId) => {
    setBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) => {
        const updatedCards = list.cards.filter((card) => card.id !== cardId);
        return { ...list, cards: updatedCards };
      });
      return { ...prevBoard, lists: updatedLists };
    });
  };

  // Hàm di chuyển thẻ
  const moveCard = (fromListId, fromIndex, toListId, toIndex) => {
    setBoard((prevBoard) => {
      const fromList = prevBoard.lists.find(list => list.id === fromListId);
      const toList = prevBoard.lists.find(list => list.id === toListId);
      const updatedFromCards = [...fromList.cards];
      const updatedToCards = [...toList.cards];

      const [movedCard] = updatedFromCards.splice(fromIndex, 1); // Lấy thẻ từ danh sách nguồn
      updatedToCards.splice(toIndex, 0, movedCard); // Thêm thẻ vào danh sách đích

      const updatedLists = prevBoard.lists.map((list) => {
        if (list.id === fromListId) {
          return { ...list, cards: updatedFromCards }; // Cập nhật danh sách nguồn
        } else if (list.id === toListId) {
          return { ...list, cards: updatedToCards }; // Cập nhật danh sách đích
        }
        return list;
      });

      return { ...prevBoard, lists: updatedLists }; // Trả về trạng thái mới của bảng
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {board.lists.map((list) => (
          <List
            key={list.id}
            list={list}
            onAddCard={addCardToList}
            onEditCard={editCard}
            onDeleteCard={deleteCard}
            moveCard={moveCard} // Truyền hàm di chuyển thẻ xuống component List
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;
