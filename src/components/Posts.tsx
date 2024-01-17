import React, { useState, useEffect } from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import { Post as PostType, Comment as CommentType } from '../types/post';
import { getPosts, getComments } from '../services/api';

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        const postsResponse = await getPosts();
        setPosts(postsResponse.data);

        const commentsResponse = await getComments();
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Błąd podczas pobierania postów lub komentarzy:", error);
      }
    };

    fetchPostsAndComments();
  }, []);

  const handleAddPost = (newPost: PostType) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <>
        <NewPostForm onAddPost={handleAddPost} />
    <PostList posts={posts} comments={comments} onDelete={handleDeletePost} />
  </>
  );
};

export default Posts;
