import express from 'express';
import { 
  getUsers, 
  getUserById, 
  getAlbums, 
  getAlbumById, 
  getPhotos, 
  getPhotoById 
} from '../services/api.service';  // Ajusta la ruta a tu archivo de servicio
import { getEnrichedPhoto } from '../controllers/api.controller';

const router = express.Router();

// Rutas generales
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.get('/albums', async (req, res) => {
  try {
    const albums = await getAlbums();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums' });
  }
});

router.get('/photos', async (req, res) => {
  try {
    const photos = await getPhotos();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos' });
  }
});

// Rutas específicas
router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUserById(Number(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `Error fetching user with ID ${req.params.id}` });
  }
});

router.get('/albums/:id', async (req, res) => {
  try {
    const album = await getAlbumById(Number(req.params.id));
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: `Error fetching album with ID ${req.params.id}` });
  }
});

router.get('/photos/:id', async (req, res) => {
  try {
    const photo = await getPhotoById(Number(req.params.id));
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: `Error fetching photo with ID ${req.params.id}` });
  }
});

// Ruta para obtener la foto enriquecida con información adicional
router.get('/externalapi/photos/:id', getEnrichedPhoto);

export default router;
