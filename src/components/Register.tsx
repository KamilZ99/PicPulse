import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);

    const token = btoa(username + ':' + password);
    sessionStorage.setItem('token', token);
    alert('Rejestracja zakończona pomyślnie!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nazwa użytkownika"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Hasło"
      />
      <button type="submit">Zarejestruj się</button>
    </form>
  );
};

export default Register;
