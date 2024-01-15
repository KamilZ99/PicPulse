import React, { useState , useEffect } from 'react';

interface CommentFormProps {
  onAddComment: (comment: string) => void;
  onClose: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment, onClose }) => {
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) {
      alert('Musisz być zalogowany, aby dodać komentarz.');
      onClose();  
    }
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(comment);
    setComment('');
    onClose();  
  };

  return (
    <div className="comment-popup">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Dodaj komentarz"
        />
        <button type="submit">Wyślij</button>
        <button onClick={onClose}>Zamknij</button>
      </form>
    </div>
  );
};

export default CommentForm;
