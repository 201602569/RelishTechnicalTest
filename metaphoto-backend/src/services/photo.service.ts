import axios from 'axios';

export const getEnrichedPhotoData = async (photoId: number) => {
  try {
    // Obtener la foto
    const photoResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
    const photo = photoResponse.data;

    // Obtener el álbum de la foto
    const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`);
    const album = albumResponse.data;

    // Obtener el usuario del álbum
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
    const user = userResponse.data;

    // Crear y devolver la respuesta enriquecida
    return {
      id: photo.id,
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
      album: {
        id: album.id,
        title: album.title,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          website: user.website,
          company: user.company
        }
      }
    };
  } catch (error) {
    throw new Error('Error al obtener los datos: ' + error);
  }
};
