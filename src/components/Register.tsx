import React, { useState } from 'react';
import '../css/Auth.css';
interface RegisterProps {
  onRegisterSuccess: () => void;
}
const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    const token = btoa(username + ':' + password);
    sessionStorage.setItem('token', token);
    alert('Rejestracja zakończona pomyślnie!');
    onRegisterSuccess();
  };

  return (
    <div className="auth-form">
    <div className="auth-box">
      <form onSubmit={handleSubmit}>
      <h1 className='loginName'> Rejestracja. </h1>
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
    </div>
    </div>
  );
};

export default Register;
