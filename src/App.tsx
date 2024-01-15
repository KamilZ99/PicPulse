import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NewPostForm from './components/NewPostForm';
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile'; 
import { Post as PostType } from './types/post';
import { getPosts } from './services/api';
import './App.css';
import RegisterPopup from './components/RegisterPopup';
import LoginPopup from './components/LoginPopup';
import Gallery from './components/Gallery';
import Album from './components/Album';


const App = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const openRegisterPopup = () => setShowRegisterPopup(true);
  const closeRegisterPopup = () => setShowRegisterPopup(false);
  const openLoginPopup = () => setShowLoginPopup(true);
  const closeLoginPopup = () => setShowLoginPopup(false);



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
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  const handleAddPost = (newPost: PostType) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    sessionStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    sessionStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
    setShowLoginPopup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar
          isLoggedIn={isLoggedIn}
          onRegisterClick={openRegisterPopup}
          onLoginClick={openLoginPopup}
          onLogout={handleLogout}
        />
        {showRegisterPopup && <RegisterPopup onClose={closeRegisterPopup} />}
        {showLoginPopup && <LoginPopup onClose={closeLoginPopup} onLoginSuccess={handleLoginSuccess} />}
    
        <main className="main-content">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={
              <>
                <div> <h1 className='newpostss'> O czym myślisz...</h1></div>
                <NewPostForm onAddPost={handleAddPost} />
                <PostList posts={posts} onDelete={handleDeletePost} />
              </>
            } />
       <Route path="/gallery" element={<Gallery />} />
       <Route path="/album" element={<Album />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
          }
export default App;
