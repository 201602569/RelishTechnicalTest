import axios from 'axios';

// URL base para las peticiones
const API_URL = 'https://jsonplaceholder.typicode.com';

// Servicio para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;  // Retorna los usuarios obtenidos
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Servicio para obtener un usuario específico
export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;  // Retorna el usuario con el ID especificado
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Servicio para obtener todos los álbumes
export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data;  // Retorna los álbumes obtenidos
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

// Servicio para obtener un álbum específico
export const getAlbumById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/albums/${id}`);
    return response.data;  // Retorna el álbum con el ID especificado
  } catch (error) {
    console.error(`Error fetching album with ID ${id}:`, error);
    throw error;
  }
};

// Servicio para obtener todas las fotos
export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL}/photos`);
    return response.data;  // Retorna las fotos obtenidas
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

// Servicio para obtener una foto específica
export const getPhotoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/photos/${id}`);
    return response.data;  // Retorna la foto con el ID especificado
  } catch (error) {
    console.error(`Error fetching photo with ID ${id}:`, error);
    throw error;
  }
};
