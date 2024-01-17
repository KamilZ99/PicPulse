import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlbumType } from '../types/album';
import { getAlbums } from '../services/api';

const AlbumList = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  useEffect(() => {
    getAlbums()
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Albumy</h1>
      <div>
        {albums.map(album => (
          <div key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
