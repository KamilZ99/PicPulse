import React, { useState, useEffect } from 'react';
import { Post as PostType } from '../types/post';
import CommentForm from './CommentForm';
import '../css/Post.css';

interface PostListProps {
  posts: PostType[];
  onDelete: (postId: number) => void;
}

interface Comments {
  [postId: number]: string[];
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [comments, setComments] = useState<Comments>(() => {
    const savedComments = sessionStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : {};
  });

  useEffect(() => {

    sessionStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (postId: number, comment: string) => {
    setComments(prev => {
      const updatedComments = {
        ...prev,
        [postId]: [...(prev[postId] || []), comment]
      };
      return updatedComments;
    });
    setSelectedPost(null);
  };

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="post-image" />
          )}
          <button onClick={() => onDelete(post.id)} className="delete-button">Usuń</button>
          <button onClick={() => setSelectedPost(post.id)} className="comment-button">Komentuj</button>

          <div className="comments-section">
            <h4>Komentarze: </h4>
            {comments[post.id]?.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        </div>
      ))}
      {selectedPost !== null && (
        <CommentForm
          onAddComment={(comment) => handleAddComment(selectedPost, comment)}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default PostList;
