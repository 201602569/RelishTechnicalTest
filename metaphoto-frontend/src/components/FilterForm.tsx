import React, { useState } from 'react';

interface FilterFormProps {
  onSubmit: (filters: any) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, albumTitle, userEmail });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Album Title" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />
      <input type="email" placeholder="User Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      <button type="submit">Filter</button>
    </form>
  );
};

export default FilterForm;
