import React, { useState , useEffect  } from 'react';
import { createPost } from '../services/api';
import { Post as PostType } from '../types/post';
import '../css/NewPost.css';

interface NewPostFormProps {
  onAddPost: (post: PostType) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionStorage.getItem('isLoggedIn')) {
      alert('Musisz być zalogowany, aby dodać post.');
      return;
    }


    const newPost = {
      title,
      body,
      imageUrl,  
      userId: 1,
    };
    
    const response = await createPost(newPost);
    onAddPost({ ...newPost, id: response.data.id }); 
    setTitle('');
    setBody('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <input
        className="form-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tytuł"
      />
      <textarea
        className="form-textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Treść posta"
      />
      <input
        className="form-input"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="URL obrazu"
      />
      <button type="submit" className="submit-button">Dodaj Post</button>
    </form>
  );
};


export default NewPostForm;
