import React, { useState } from 'react';
import { ToDoItem } from './ToDoItem';
import { AddToDoItemForm } from './AddToDoItemForm';

const maxAllowedItems = 10; // not more than 10 items in To Do list.

const localStorageKey = 'to-do-items';

const saveState = (toDoItems) => {
  const toItemsString = JSON.stringify(toDoItems);
  localStorage.setItem(localStorageKey, toItemsString);
};

const restoreFromState = () => {
  const toDoItemString = localStorage.getItem(localStorageKey);
  const toDoItems = JSON.parse(toDoItemString);
  return toDoItems || [];
};

export const ToDoList = () => {
  const [toDoItems, setToDoItems] = useState(restoreFromState());
  const deleteItem = (itemIndex) => {
    const itemAfterDeletion = [...toDoItems];
    itemAfterDeletion.splice(itemIndex, 1);
    setToDoItems(itemAfterDeletion);
    saveState(itemAfterDeletion);
  };

  const addNewItem = (toDoItem) => {
    if (toDoItems.length >= maxAllowedItems) {
      return;
    }
    const itemAfterAddition = [...toDoItems];
    itemAfterAddition.push(toDoItem);
    const sortedItems = sortItems(itemAfterAddition);
    setToDoItems(sortedItems);
    saveState(sortedItems);
  };

  const sortItems = (items) => {
    return items.sort((itemA, itemB) => {
      if (itemA.done === true && itemB.done === true) {
        return 0;
      }
      if (itemA.done === false && itemB.done === false) {
        return 0;
      }
      if (itemA.done === true && itemB.done === false) {
        return 1;
      }
      return -1;
    });
  };

  const checkItem = (toDoItemIndex) => {
    const newItems = [...toDoItems];
    newItems[toDoItemIndex].done = true;
    const sortedItems = sortItems(newItems);
    setToDoItems(sortedItems);
    saveState(sortedItems);
  };

  const uncheckItem = (toDoItemIndex) => {
    const newItems = [...toDoItems];
    newItems[toDoItemIndex].done = false;
    const sortedItems = sortItems(newItems);
    setToDoItems(sortedItems);
    saveState(sortedItems);
  };

  const toDoItemsElements = toDoItems.map((toDoItem, toDoItemIndex) => {
    return (
      <ToDoItem 
        key={toDoItemIndex} 
        toDoItem={toDoItem} 
        onDelete={(event) => deleteItem(toDoItemIndex)} 
        onCheck={() => checkItem(toDoItemIndex)}
        onUncheck={() => uncheckItem(toDoItemIndex)}
      />
    );
  });
  return ( 
    <div>
      {toDoItemsElements}
      <AddToDoItemForm 
        onAddNewItem={addNewItem} 
        disabled={toDoItems.length >= maxAllowedItems}
      />
    </div>
  );
};