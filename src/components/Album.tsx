import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AlbumType } from '../types/album';


const Album = () => {
    const [albums, setAlbums] = useState<AlbumType[]>([]);
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
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
            <Link to={`/gallery/${album.id}`}>{album.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
