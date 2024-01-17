import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getTodos } from '../services/api';
import { Todo, User } from '../types/todos';
import '../css/Todos.css';

const Users = () => {
    const [users, setUsers] = useState<User[]>([]); 

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await getUsers();
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    return (
      <div>
        <h1>Użytkownicy i ich zadania</h1>
        {users.map(user => (
          <div key={user.id} className="user-todo-box">
            <h2>{user.name} ({user.username})</h2>
            <p>Email: {user.email}</p>
            <p>Adres: {user.address.street}, {user.address.city}</p>
            <p>Telefon: {user.phone}</p>
            <p>Strona internetowa: <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
            <p>Firma: {user.company.name}</p>
            <Link to={`/todos/user/${user.id}`}>Zobacz zadania użytkownika</Link>
          </div>
        ))}
      </div>
    );
  };
  
  export default Users;
