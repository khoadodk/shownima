import React, { useEffect, useState } from 'react';
import './Paginate.scss';
import PropTypes from 'prop-types';

const Paginate = ({ currentPage, totalPages, paginate }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage, totalPages]);
  return (
    <>
      <span className="pageCount">
        {page} - {totalPages}
      </span>
      <button
        className={`paginate-button ${page <= 1 && 'disable'}`}
        onClick={() => paginate('prev')}
      >
        Prev
      </button>
      <button
        className={`paginate-button ${currentPage === totalPages && 'disable'}`}
        onClick={() => paginate('next')}
      >
        Next
      </button>
    </>
  );
};

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  paginate: PropTypes.func.isRequired
};

export default Paginate;
