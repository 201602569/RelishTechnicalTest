import { Request, Response } from 'express';
import { getFilteredAndEnrichedPhotos } from '../services/photo.service';

export const getFilteredPhotos = async (req: Request, res: Response) => {
  const filters: { title?: string, albumTitle?: string, userEmail?: string } = {};
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 25;
  const offset = req.query.offset ? parseInt(req.query.offset.toString()) : 0;
  const pagination = { limit, offset };
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
    const filteredPhotos = await getFilteredAndEnrichedPhotos(filters,pagination);
    res.json(filteredPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while filtering photos');
  }
};
