import React from 'react';

const Profile = () => {
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('token');

  return (
    <div>
      <h2>Profil Użytkownika</h2>
      <p>Nazwa użytkownika: {username}</p>
      <p>Token: {token}</p>
    </div>
  );
};

export default Profile;
