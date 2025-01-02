import express from 'express';
import { getFilteredPhotos } from '../controllers/api.controller';

const router = express.Router();

router.get('/externalapi/photos', getFilteredPhotos);

export default router;
