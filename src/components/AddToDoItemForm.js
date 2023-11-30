import React, {useState} from 'react';

export const AddToDoItemForm = (props) => {
  const [newTask, setNewTask] = useState({
    name: '',
    done: false,
  });

  const {onAddNewItem, disabled} = props;

  const onSubmit = (event) => {
    event.preventDefault();
    onAddNewItem(newTask);
    setNewTask({
      name: '',
      done: false,
    });
  };

  const onTaskNameChange = (event) => {
    const newName = event.target.value;
    const newToDoTask = {...newTask};
    newToDoTask.name = newName;
    setNewTask(newToDoTask);
  };

  return (
    <form onSubmit={onSubmit} className="d-flex">
      <input className="tasks-text"
        type="text" 
        onChange={onTaskNameChange} 
        value={newTask.name}
        maxLength="40"
        required
        disabled={disabled}
      />
      <input 
        type="submit" 
        value="add new one" 
        className="btn btn-secondary btn-sm add-new-one"
        disabled={disabled}
      />
    </form>
  )
};
