import axios from 'axios';

interface FilterOptions {
  title?: string;
  albumTitle?: string;
  userEmail?: string;
}

interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export const getFilteredAndEnrichedPhotos = async (filters: FilterOptions, pagination: PaginationOptions) => {
  try {
    // Establecer valores predeterminados para limit y offset
    const limit = pagination.limit || 25;
    const offset = pagination.offset || 0;

    // Fetch all photos
    const photoResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');
    let photos = photoResponse.data;

    // Apply filters
    if (filters.title) {
      photos = photos.filter((photo: any) =>
        photo.title.toLowerCase().includes(filters.title?.toLowerCase() || "")
      );
    }

    if (filters.albumTitle) {
      const albumResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
      const albums = albumResponse.data;

      // Filter photos by album title
      const albumIds = albums.filter((album: any) =>
        album.title.toLowerCase().includes(filters.albumTitle?.toLowerCase() || "")
      ).map((album: any) => album.id);

      photos = photos.filter((photo: any) => albumIds.includes(photo.albumId));
    }

    if (filters.userEmail) {
      const albumResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
      const albums = albumResponse.data;

      // Buscar el usuario por el email
      const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = userResponse.data;
      const user = users.find((user: any) => user.email.toLowerCase() === filters.userEmail?.toLowerCase());

      if (!user) {
        return [];  // No hay fotos para este usuario
      }

      // Filtrar álbumes por el usuario
      const userAlbums = albums.filter((album: any) =>
        album.userId === user.id
      );

      const userAlbumIds = userAlbums.map((album: any) => album.id);
      photos = photos.filter((photo: any) => userAlbumIds.includes(photo.albumId));
    }

    // Paginación: Limitar los resultados de acuerdo al límite y desplazamiento
    photos = photos.slice(offset, offset + limit);

    // Enriquecer datos con información de álbum y usuario
    const enrichedPhotos = await Promise.all(photos.map(async (photo: any) => {
      const album = await axios.get(`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`);
      const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${album.data.userId}`);
      return {
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
        album: {
          id: album.data.id,
          title: album.data.title,
          user: {
            id: user.data.id,
            name: user.data.name,
            username: user.data.username,
            email: user.data.email,
            address: user.data.address,
            phone: user.data.phone,
            website: user.data.website,
            company: user.data.company
          }
        }
      };
    }));

    return enrichedPhotos;

  } catch (error) {
    throw new Error('Error while fetching or enriching data: ' + error);
  }
};
