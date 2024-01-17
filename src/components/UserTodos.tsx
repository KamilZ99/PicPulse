import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTodos } from '../services/api';
import { Todo } from '../types/todos';
import '../css/Todos.css';

const UserTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const { userId } = useParams<{ userId: string }>();
  

    useEffect(() => {
        const fetchTodos = async () => {
          try {
            const response = await getTodos();
            const userTodos = response.data.filter((todo: Todo) => todo.userId.toString() === userId);
            setTodos(userTodos);
          } catch (error) {
            console.error('Error fetching todos:', error);
          }
        };
    
        fetchTodos();
      }, [userId]);

      return (
        <div>
          <h1>Zadania użytkownika</h1>
          <ul className="user-todos-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                {todo.title} - 
                <span className="todo-status">{todo.completed ? 'Ukończono' : 'Do wykonania'}</span>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default UserTodos;
