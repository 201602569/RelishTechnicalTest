import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, Typography, Card, CardContent } from '@mui/material';
import { getFilteredAndPaginatedPhotos } from '../services/photoService';
import { Photo } from '../interfaces/photo';

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filters, setFilters] = useState({
    title: '',
    albumTitle: '',
    email: '',
    offset: 0,
    limit: 25,
  });
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [noMorePhotos, setNoMorePhotos] = useState(false);

  const fetchPhotos = async () => {
    try {
      const data = await getFilteredAndPaginatedPhotos(filters);
      if (data?.length === 0 && filters.offset > 0) {
        setNoMorePhotos(true);
      } else {
        setNoMorePhotos(false);
      }
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleSearch = () => {
    setIsSearchClicked(true);
    setNoMorePhotos(false);
    fetchPhotos();
  };

  const handleNextPage = () => {
    if (photos.length < filters.limit || noMorePhotos) return;
    setFilters((prevFilters) => ({
      ...prevFilters,
      offset: prevFilters.offset + prevFilters.limit,
    }));
    setIsSearchClicked(true);
  };

  const handlePreviousPage = () => {
    if (filters.offset === 0) return;
    setFilters((prevFilters) => ({
      ...prevFilters,
      offset: Math.max(prevFilters.offset - prevFilters.limit, 0),
    }));
    setIsSearchClicked(true);
  };

  useEffect(() => {
    if (isSearchClicked) {
      fetchPhotos();
      setIsSearchClicked(false);
    }
  }, [filters, isSearchClicked]);

  const disableNextButton = photos.length < filters.limit || noMorePhotos;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
    <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#333' }}>Photo List</Typography>

    <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '20px' }}>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Title"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          variant="outlined"
          size="small"
          InputProps={{
            style: {
              textAlign: 'center',
              fontSize: '16px',
              padding: '10px',
            },
          }}
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Album Title"
          value={filters.albumTitle}
          onChange={(e) => setFilters({ ...filters, albumTitle: e.target.value })}
          variant="outlined"
          size="small"
          InputProps={{
            style: {
              textAlign: 'center',
              fontSize: '16px',
              padding: '10px',
            },
          }}
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          variant="outlined"
          size="small"
          InputProps={{
            style: {
              textAlign: 'center',
              fontSize: '16px',
              padding: '10px',
            },
          }}
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Grid>
    </Grid>

    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" marginRight="20px">
        <Typography variant="subtitle1" style={{ marginBottom: '5px' }}>Limit</Typography>
        <TextField
          type="number"
          value={filters.limit}
          onChange={(e) => setFilters({ ...filters, limit: Number(e.target.value) })}
          variant="outlined"
          size="small"
          fullWidth
          inputProps={{
            style: {
              textAlign: 'center',
              fontSize: '18px',
            },
          }}
          style={{
            width: '120px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="subtitle1" style={{ marginBottom: '5px' }}>Offset</Typography>
        <TextField
          type="number"
          value={filters.offset}
          onChange={(e) => setFilters({ ...filters, offset: Number(e.target.value) })}
          variant="outlined"
          size="small"
          fullWidth
          inputProps={{
            style: {
              textAlign: 'center',
              fontSize: '18px',
            },
          }}
          style={{
            width: '120px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>
    </Box>

    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Button onClick={handleSearch} variant="contained" color="primary" fullWidth style={{ padding: '12px', fontSize: '16px', borderRadius: '8px' }}>
          Search
        </Button>
      </Grid>
    </Grid>
      <Grid container spacing={4} justifyContent="center">
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card
              style={{
                display: 'flex',
                flexDirection: 'row',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box
                style={{
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                }}
              >
                <img
                  src={photo.thumbnailUrl}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Box>
              <CardContent style={{ width: '50%' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Photo Details
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                  Title:{photo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                  Album: {photo.album.title}
                </Typography>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  User Details
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Name: {photo.album.user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {photo.album.user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone: {photo.album.user.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {`${photo.album.user.address.street}, ${photo.album.user.address.suite}, ${photo.album.user.address.city}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Website: {`${photo.album.user.website}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Company: {`${photo.album.user.company.name}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="space-between" marginTop="40px">
        <Button
          onClick={handlePreviousPage}
          disabled={filters.offset === 0}
          variant="contained"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '8px' }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={disableNextButton}
          variant="contained"
          color="primary"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '8px' }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default PhotoList;
