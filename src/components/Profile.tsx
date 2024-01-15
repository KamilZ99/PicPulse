import React, { useState, useEffect, CSSProperties } from 'react';


const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover' as 'cover', 
  },
};

const Profile = () => {
  const [username] = useState(sessionStorage.getItem('username') || '');
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [biography, setBiography] = useState(sessionStorage.getItem('biography') || '');
  const [avatarUrl, setAvatarUrl] = useState(sessionStorage.getItem('avatar') || '');

  useEffect(() => {
    sessionStorage.setItem('biography', biography);
    sessionStorage.setItem('avatar', avatarUrl);
  }, [biography, avatarUrl]);

  const handleBiographyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBiography(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Zmiany zostały zapisane!');
  };

  return (
    <div style={styles.container}>
      <h2>Profil Użytkownika</h2>
      <p>Nazwa użytkownika: {username}</p>
      <p>Token: {token}</p>
      {avatarUrl && <img src={avatarUrl} alt="Avatar" style={styles.avatar} />}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label htmlFor="biography">Biogram:</label>
          <textarea id="biography" value={biography} onChange={handleBiographyChange} style={styles.input} />
        </div>
        <div>
          <label htmlFor="avatar">Awatar:</label>
          <input type="file" id="avatar" onChange={handleAvatarChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.input}>Zapisz zmiany</button>
      </form>
    </div>
  );
};

export default Profile;