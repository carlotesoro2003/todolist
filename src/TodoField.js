import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoField() {
  //provide state variables
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

 

  //add todos 
  const addTodo = () => {
    if (newTodo.trim() !== '') { //check if newTodo is not empty string 
      const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  // set state into editing mdoe 
  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  //update Todo 
  const updateTodo = () => {
    setTodos(todos.map((todo) => 
      todo.id === currentTodo.id ? currentTodo : todo
    ));
    setIsEditing(false);
    setCurrentTodo({});
  };

  //delete a todo using id 
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //update text while editing 
  const changeTodo = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };


  //handling completion of tasks 
  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className='todoField'>
      
      <div>
        <h1>Todo List</h1>
        <p>Add your Tasks here</p>
        <input 
          type='text' 
          value={isEditing ? currentTodo.text : newTodo}
          onChange={isEditing ? changeTodo : (e) => setNewTodo(e.target.value)}
          placeholder='Enter your task'
        />
        <button className='add'  onClick={isEditing ? updateTodo : addTodo}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
     
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todo.id)} 
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button   onClick={() => editTodo(todo)}>
              <FontAwesomeIcon icon={faPen} /> Edit
            </button>
            <button className='delete'  onClick={() => removeTodo(todo.id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoField;