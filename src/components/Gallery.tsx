import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/Gallery.css';
import {Image } from '../types/image';

  

const Gallery = () => {
  const [newImage, setNewImage] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const username = sessionStorage.getItem('username'); 

 useEffect(() => {
  const savedImages = JSON.parse(localStorage.getItem('galleryImages') || '[]').map((image: Image) => ({
    ...image,
    likes: image.likes ?? 0,
    likedByCurrentUser: image.likedByCurrentUser ?? false
  }));
  setImages(savedImages);
}, []);

  

  const handleLikeImage = (index: number) => {
    setImages(images.map((image, i) => {
      if (i === index) {
        if (!image.likedByCurrentUser) {
          return { ...image, likes: image.likes + 1, likedByCurrentUser: true };
        } else {
          return { ...image, likes: image.likes - 1, likedByCurrentUser: false };
        }
      }
      return image;
    }));
  };

  const handleAddImage = () => {
    if (newImage) {
      const username = sessionStorage.getItem('username') || 'Anonim';
      const updatedImages = [...images, { url: newImage, user: username, likes: 0, likedByCurrentUser: false }];
      setImages(updatedImages);
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
      setNewImage('');
    }
  };

  return (

      <div>
      <p>Cześć ({username}) dodaj jakieś zdjęcie !</p>
      <div className="add-image-box">
  <input 
    type="text" 
    className="add-image-input"
    placeholder="URL obrazu" 
    value={newImage} 
    onChange={(e) => setNewImage(e.target.value)} 
  />
  <button className="add-image-button" onClick={handleAddImage}>Dodaj Zdjęcie</button>
</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {images.map((image, index) => (
      <div key={index} className="image-container">
      <img src={image.url} alt={`Zdjęcie od ${image.user}`} className="gallery-image" />
      <FontAwesomeIcon 
        icon={faHeart} 
        className={`image-heart ${image.likedByCurrentUser ? 'liked' : ''}`} 
        onClick={() => handleLikeImage(index)} 
      />
      {image.likes > 0 && (
        <div className="image-likes">{image.likes}</div>
      )}
      <p>Dodane przez: {image.user} - {image.likes} {image.likes === 1 ? 'polubienie' : 'polubienia'}</p>
  </div>
))}
      </div>
    </div>
  );
};

export default Gallery;
