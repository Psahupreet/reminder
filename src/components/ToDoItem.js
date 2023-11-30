import React from 'react';

export const ToDoItem = (props) => {
  const {toDoItem, onDelete, onCheck, onUncheck} = props;
  const onChange = (event) => {
    if (event.target.checked) {
      onCheck();
    } else {
      onUncheck();
    }
  };

  const style = {};
  if (toDoItem.done) {
    style['textDecoration'] = 'line-through';
  }

  return (
    <div className="added-new-task">
      <label className = "checkbox-container">
        <input 
          type="checkbox"
          checked={toDoItem.done}
          onChange={onChange} 
        />
        <span class="checkmark"></span>
      </label>
      
      <span style={style} className="to-do-item-name">{toDoItem.name}</span>
      <button onClick={(event) => onDelete()} className="delete-task">x</button>
    </div>
  )
};
