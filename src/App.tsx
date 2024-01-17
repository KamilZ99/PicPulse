import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Posts from './components/Posts'
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import Gallery from './components/Gallery';
import Album from './components/Album';
import AlbumList from './components/AlbumList';
import Todos from './components/Todos';
import Users from './components/Users';
import UserTodos from './components/UserTodos';
import { Post as PostType } from './types/post';
import { getPosts } from './services/api';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [isRegistered, setIsRegistered] = useState(sessionStorage.getItem('isRegistered') === 'true');

  useEffect(() => {
    const savedPosts = sessionStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      getPosts().then(response => {
        setPosts(response.data);
        sessionStorage.setItem('posts', JSON.stringify(response.data));
      });
    }
  }, []);

  const handleRegisterSuccess = () => {
    setIsRegistered(true);
    sessionStorage.setItem('isRegistered', 'true');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', 'false');
    setIsRegistered(true);
  };

  return (
    <Router>
      <div className="app-container">
        {!isLoggedIn ? <Navigate to="/" /> : null}
        {isLoggedIn ? (
          <>
            <Sidebar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Navigate replace to="/posts" />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/posts"  element={<Posts />} />
                <Route path="/gallery/*" element={<Gallery />} />
                <Route path="/album" element={<AlbumList />} />
                <Route path="/album/:albumId" element={<Album />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/users" element={<Users />} />
                <Route path="/todos/user/:userId" element={<UserTodos />} />

              </Routes>
            </main>
          </>
        ) : (
          <main className="auth-form">
            <Routes>
              <Route path="/" element={isRegistered ? <Login onLoginSuccess={handleLoginSuccess} /> : <Register onRegisterSuccess={handleRegisterSuccess} />} />
            </Routes>
          </main>
        )}
      </div>
    </Router>
  );
  
};

export default App;
