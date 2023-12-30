import React from 'react';
import Register from './Register';

interface RegisterPopupProps {
  onClose: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <Register />
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};

export default RegisterPopup;
