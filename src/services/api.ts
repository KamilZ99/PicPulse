import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => {
  return axios.get(`${API_URL}/posts`);
};

export const createPost = (post: { title: string; body: string; userId: number }) => {
  return axios.post(`${API_URL}/posts`, post);
};
