import React, { useState, useEffect } from 'react';
import NewPostForm from './components/NewPostForm';
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import { Post as PostType } from './types/post';
import { getPosts } from './services/api';
import './App.css';
const App = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

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

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div> <h1 className='newpostss'> O czym myślisz...</h1></div>
        <NewPostForm onAddPost={handleAddPost} />
        <PostList posts={posts} onDelete={handleDeletePost} />
      </main>
    </div>
  );
};

export default App;
