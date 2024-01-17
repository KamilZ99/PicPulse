import React, { useState, useEffect } from 'react';
import { getTodos, getUsers } from '../services/api';
import { Todo, User } from '../types/todos';
import '../css/Todos.css';

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const todosResponse = await getTodos();
      setTodos(todosResponse.data);

      const usersResponse = await getUsers();
      setUsers(usersResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ul>
      {todos.map(todo => (
  <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
    {todo.title} - 
    <strong>
      {users.find(user => user.id === todo.userId)?.name || 'Nieznany użytkownik'}
    </strong>
    <span>{todo.completed ? ' (ukończono)' : ' (nieukończono)'}</span>
  </li>
))}
      </ul>
    </div>
  );
};

export default Todos;
