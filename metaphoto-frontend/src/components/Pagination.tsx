import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}>Next</button>
    </div>
  );
};

export default Pagination;
