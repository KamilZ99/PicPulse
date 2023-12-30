import React from 'react';
import Login from './Login';

interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onLoginSuccess }) => {
  return (
    <div className="popup">
      <Login onLoginSuccess={onLoginSuccess} />
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};

export default LoginPopup;
