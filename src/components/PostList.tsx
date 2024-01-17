import React, { useState } from 'react';
import { Post as PostType, Comment as CommentType } from '../types/post';
import '../css/Post.css';

interface PostListProps {
  posts: PostType[];
  comments: CommentType[];
  onDelete: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, comments, onDelete }) => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

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

          <div className="comments-section">
            <h4>Komentarze: </h4>
            {comments.filter(comment => comment.postId === post.id).map((comment, index) => (
              <div key={index}>
                <p><strong>{comment.name}</strong> ({comment.email})</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
};

export default PostList;
