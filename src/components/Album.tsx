import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlbumType, PhotoType } from '../types/album';
import { getAlbums, getPhotosByAlbum } from '../services/api';

const Album = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const { albumId } = useParams();

  useEffect(() => {
    if (albumId) {
      getPhotosByAlbum(parseInt(albumId))
        .then(response => {
          setPhotos(response.data);
        })
        .catch(error => console.log(error));
    }
  }, [albumId]);

  return (
    <div className="photos-grid">
      {photos.map(photo => (
        <div key={photo.id} className="photo-item">
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <div className="photo-title">{photo.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Album;
