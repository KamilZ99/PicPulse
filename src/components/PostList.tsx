import React from 'react';
import { Post as PostType } from '../types/post';
import '../css/Post.css'

interface PostListProps {
  posts: PostType[];
  onDelete: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
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
            </div>
          ))}
        </div>
      );
    };

export default PostList;
