import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, 
  faUser, 
  faSignOutAlt, 
  faImages,
  faClipboardList, 
  faUsers 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../img/picpulse.png';
import '../css/Sidebar.css';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';


interface SidebarProps {
  isLoggedIn: boolean;
  onLogout: () => void; 
}


const Sidebar: React.FC<SidebarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <aside className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <ul className="menu-items">
      <li><Link to="/"><FontAwesomeIcon icon={faHome} className="icon" /> Home</Link></li>

        {isLoggedIn && (
   <>
        <li><Link to="/profile"><FontAwesomeIcon icon={faUser} className="icon" /> Profil</Link></li>
        <li><Link to="/gallery"><FontAwesomeIcon icon={faImages} className="icon" /> Galeria</Link></li>
        <li><Link to="/album"><FontAwesomeIcon icon={faPhotoVideo} className="icon" /> Albumy</Link></li>
       <li><Link to="/todos"><FontAwesomeIcon icon={faClipboardList} className="icon" /> Todos</Link></li>
       <li><Link to="/users"><FontAwesomeIcon icon={faUsers} className="icon" /> Użytkownicy</Link></li>
      <li onClick={onLogout}><FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Wyloguj</li>
 </>
)}
        {!isLoggedIn && <>
        </>}
      </ul>
    </aside>
    
  );
};

export default Sidebar;
