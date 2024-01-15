import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');
    sessionStorage.setItem('username', username);
    if (username === storedUsername && password === storedPassword) {
      alert('Zalogowano pomyślnie!');
      onLoginSuccess();
    } else {
      alert('Błędny login lub hasło!');
    }
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
      <button type="submit">Zaloguj się</button>
    </form>
  );
};

export default Login;
