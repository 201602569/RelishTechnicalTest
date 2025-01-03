import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { getFilteredAndPaginatedPhotos } from '../services/photoService';

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

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
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, offset: prevFilters.offset + prevFilters.limit };
      return newFilters;
    });
    setIsSearchClicked(true);
  };

  const handlePreviousPage = () => {
    if (filters.offset === 0) return;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, offset: Math.max(prevFilters.offset - prevFilters.limit, 0) };
      return newFilters;
    });
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

      <div style={{ marginTop: '20px' }}>
        {photos.length > 0 ? (
          <>
            <ul style={{
              listStyleType: 'none',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '20px',
              justifyContent: 'center',
            }}>
              {photos.map((photo) => (
                <li key={photo.id} style={{
                  marginBottom: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <img src={photo.thumbnailUrl} alt={photo.title} style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }} />
                  <Typography variant="body2" style={{ textAlign: 'center', marginTop: '8px' }}>
                    {photo.title}
                  </Typography>
                </li>
              ))}
            </ul>
            {noMorePhotos && (
              <Typography variant="h6" color="textSecondary" align="center">No more photos to display</Typography>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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
                variant="contained"
                color="primary"
                disabled={disableNextButton}
                style={{ padding: '10px', fontSize: '16px', borderRadius: '8px' }}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">No photos found</Typography>
        )}
      </div>
    </div>
  );
};

export default PhotoList;
