import { Request, Response } from 'express';
import { 
  getUsers, 
  getUserById, 
  getAlbums, 
  getAlbumById, 
  getPhotos, 
  getPhotoById 
} from '../services/api.service';  // Asegúrate de que la ruta sea correcta a tu archivo de servicio

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Controlador para obtener un usuario específico
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));  // Extrae el ID de los parámetros
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user with ID ${req.params.id}:`, error);
    res.status(500).json({ message: `Error fetching user with ID ${req.params.id}` });
  }
};

// Controlador para obtener todos los álbumes
export const getAllAlbums = async (req: Request, res: Response) => {
  try {
    const albums = await getAlbums();
    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: 'Error fetching albums' });
  }
};

// Controlador para obtener un álbum específico
export const getAlbum = async (req: Request, res: Response) => {
  try {
    const album = await getAlbumById(Number(req.params.id));  // Extrae el ID de los parámetros
    res.json(album);
  } catch (error) {
    console.error(`Error fetching album with ID ${req.params.id}:`, error);
    res.status(500).json({ message: `Error fetching album with ID ${req.params.id}` });
  }
};

// Controlador para obtener todas las fotos
export const getAllPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await getPhotos();
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ message: 'Error fetching photos' });
  }
};

// Controlador para obtener una foto específica
export const getPhoto = async (req: Request, res: Response) => {
  try {
    const photo = await getPhotoById(Number(req.params.id));  // Extrae el ID de los parámetros
    res.json(photo);
  } catch (error) {
    console.error(`Error fetching photo with ID ${req.params.id}:`, error);
    res.status(500).json({ message: `Error fetching photo with ID ${req.params.id}` });
  }
};
