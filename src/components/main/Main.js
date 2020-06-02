import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Main.scss';

import MainContent from '../content/mainContent/MainContent';
import Spinner from '../spinner/Spinner';
import { loadMore, setMoviePage } from '../../redux/actions/movies';

const Main = ({ loadMore, page, totalPages, setMoviePage, movieType }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setMoviePage(currentPage, totalPages);
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMore(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const bottomLine = bottomLineRef.current.getBoundingClientRect().top;
    if (bottomLine <= containerHeight) {
      console.log('fetch new data');
      fetchData();
    }
  };

  return (
    <>
      <div className="main" ref={mainRef} onScroll={handleScroll}>
        {loading ? <Spinner /> : <MainContent />}
        <div ref={bottomLineRef} />
      </div>
    </>
  );
};

Main.propTypes = {
  list: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  setMoviePage: PropTypes.func.isRequired,
  movieType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType
});

export default connect(mapStateToProps, { loadMore, setMoviePage })(Main);
