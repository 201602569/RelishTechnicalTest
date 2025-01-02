import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const getAlbumById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/albums/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching album with ID ${id}:`, error);
    throw error;
  }
};

export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL}/photos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const getPhotoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photo with ID ${id}:`, error);
    throw error;
  }
};
