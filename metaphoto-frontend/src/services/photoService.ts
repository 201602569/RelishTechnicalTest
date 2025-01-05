import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/externalapi/photos';

export const getFilteredAndPaginatedPhotos = async (filters: {
  title?: string;
  albumTitle?: string;
  userEmail?: string;
  limit?: number;
  offset?: number;
}) => {
  try {
    const params = new URLSearchParams();

    if (filters.title) params.append('title', filters.title);
    if (filters.albumTitle) params.append('albumTitle', filters.albumTitle);
    if (filters.userEmail) params.append('userEmail', filters.userEmail);
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.offset) params.append('offset', filters.offset.toString());

    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error while fetching photos: ${error}`);
  }
};
