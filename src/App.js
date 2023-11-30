import React from 'react';
import './App.css';
import { ToDoList } from './components/ToDoList';



function App() {
  return (
    <div className="container-md d-flex flex-column justify-content-start align-items-center">
      <h1>Welcome to reminder application </h1>
     <ToDoList/>
    </div>
  );
}

export default App;
