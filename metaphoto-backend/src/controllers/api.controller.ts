import { Request, Response } from 'express';
import { getFilteredAndEnrichedPhotos } from '../services/photo.service';

export const getFilteredPhotos = async (req: Request, res: Response) => {
  const filters: { title?: string, albumTitle?: string, userEmail?: string } = {};

  if (req.query.title) {
    filters.title = req.query.title as string;
  }

  if (req.query['album.title']) {
    filters.albumTitle = req.query['album.title'] as string;
  }

  if (req.query['album.user.email']) {
    filters.userEmail = req.query['album.user.email'] as string;
  }

  try {
    const filteredPhotos = await getFilteredAndEnrichedPhotos(filters);
    res.json(filteredPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while filtering photos');
  }
};
