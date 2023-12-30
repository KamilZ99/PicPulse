import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faSearch, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../img/picpulse.png';
import '../css/Sidebar.css';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';



interface SidebarProps {
  isLoggedIn: boolean;
  onRegisterClick: () => void;
  onLoginClick: () => void;
  onLogout: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ isLoggedIn, onRegisterClick, onLoginClick, onLogout }) => {
  return (
    <aside className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <ul className="menu-items">
      <li><Link to="/"><FontAwesomeIcon icon={faHome} className="icon" /> Home</Link></li>

        {isLoggedIn && (
  <>
             <li><Link to="/profile"><FontAwesomeIcon icon={faUser} className="icon" /> Profil</Link></li>

    <li onClick={onLogout}><FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Wyloguj</li>
  </>
)}
        <li><FontAwesomeIcon icon={faSearch} className="icon" /> Wyszukaj</li>
        <li><FontAwesomeIcon icon={faHeart} className="icon" /> Powiadomienia</li>
        {!isLoggedIn && <>
          <li onClick={onRegisterClick}><FontAwesomeIcon icon={faUserPlus} className="icon" /> Rejestracja</li>
          <li onClick={onLoginClick}><FontAwesomeIcon icon={faSignInAlt} className="icon" /> Logowanie</li>
        </>}
      </ul>
    </aside>
    
  );
};

export default Sidebar;
