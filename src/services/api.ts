import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getAlbums = () => {
  return axios.get(`${API_URL}/albums`);
};

export const getPhotosByAlbum = (albumId: number) => {
  return axios.get(`${API_URL}/albums/${albumId}/photos`);
};

export const getPosts = () => {
  return axios.get(`${API_URL}/posts`);
};

export const createPost = (post: { title: string; body: string; userId: number }) => {
  return axios.post(`${API_URL}/posts`, post);
};

export const getComments = () => {
  return axios.get(`${API_URL}/comments`);
};

export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const getTodos = () => {
  return axios.get(`${API_URL}/todos`);
};