import React, { useState } from 'react';
import List from './List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddList from './AddList';  // Component mới để thêm danh sách mới

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

  const moveCard = (fromListId, fromIndex, toListId, toIndex) => {
    setBoard((prevBoard) => {
      const fromList = prevBoard.lists.find(list => list.id === fromListId);
      const toList = prevBoard.lists.find(list => list.id === toListId);
      const updatedFromCards = [...fromList.cards];
      const updatedToCards = [...toList.cards];

      const [movedCard] = updatedFromCards.splice(fromIndex, 1);
      updatedToCards.splice(toIndex, 0, movedCard);

      const updatedLists = prevBoard.lists.map((list) => {
        if (list.id === fromListId) {
          return { ...list, cards: updatedFromCards };
        } else if (list.id === toListId) {
          return { ...list, cards: updatedToCards };
        }
        return list;
      });

      return { ...prevBoard, lists: updatedLists };
    });
  };

  const addList = (newList) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      lists: [...prevBoard.lists, newList],
    }));
  };

  const editListTitle = (listId, newTitle) => {
    setBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) => {
        if (list.id === listId) {
          return { ...list, title: newTitle };
        }
        return list;
      });
      return { ...prevBoard, lists: updatedLists };
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
            moveCard={moveCard}
            onEditListTitle={editListTitle}  // Truyền hàm sửa tiêu đề danh sách
          />
        ))}
        <AddList onAddList={addList} />  {/* Thêm component AddList */}
      </div>
    </DndProvider>
  );
};

export default Board;
