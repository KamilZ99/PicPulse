import React, { useState } from 'react';

interface CommentFormProps {
  onAddComment: (comment: string) => void;
  onClose: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment, onClose }) => {
  const [comment, setComment] = useState('');

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
