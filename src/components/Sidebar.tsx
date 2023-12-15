import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/picpulse.png';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <ul className="menu-items">
        <li><FontAwesomeIcon icon={faHome} className="icon" /> Home</li>
        <li><FontAwesomeIcon icon={faUser} className="icon" /> Profile</li>
        <li><FontAwesomeIcon icon={faSearch} className="icon" /> Wyszukaj</li>
        <li><FontAwesomeIcon icon={faHeart} className="icon" /> Powiadomienia</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
