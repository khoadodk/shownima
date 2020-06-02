import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './MainContent.scss';
import SlideShow from '../slideShow/SlideShow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';
import { IMAGE_URL } from '../../../services/movies.service';
import { getMovies, setMoviePage } from '../../../redux/actions/movies';

const HEADER_TYPE = {
  now_playing: 'Now Playing',
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming'
};

const MainContent = ({
  list,
  movieType,
  totalPages,
  page,
  getMovies,
  setMoviePage
}) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [slideShowImages, setSlideShowImages] = useState([]);
  const randomMovies = list
    .sort(() => Math.random() - Math.random())
    .slice(0, 4);

  useEffect(() => {
    if (randomMovies.length) {
      const IMAGES = [
        {
          id: 1,
          url: `${IMAGE_URL}${randomMovies[0].backdrop_path}`
        },
        {
          id: 2,
          url: `${IMAGE_URL}${randomMovies[1].backdrop_path}`
        },
        {
          id: 3,
          url: `${IMAGE_URL}${randomMovies[2].backdrop_path}`
        },
        {
          id: 4,
          url: `${IMAGE_URL}${randomMovies[3].backdrop_path}`
        }
      ];
      setSlideShowImages(IMAGES);
    }
    // eslint-disable-next-line
  }, [movieType]);

  useEffect(() => {
    setCurrentPage(page);
    // eslint-disable-next-line
  }, [page]);

  const paginate = (type) => {
    let pageNum = currentPage;
    if (type === 'prev') {
      pageNum -= 1;
    } else {
      pageNum += 1;
    }
    setCurrentPage(pageNum);
    setMoviePage(pageNum, totalPages);
    getMovies(movieType, pageNum);
  };

  return (
    <div className="main-content">
      <SlideShow images={slideShowImages} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
      <Grid />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  movieType: PropTypes.string.isRequired,
  getMovies: PropTypes.func.isRequired,
  setMoviePage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType,
  totalPages: state.movies.totalPages,
  page: state.movies.page
});

export default connect(mapStateToProps, { setMoviePage, getMovies })(
  MainContent
);
