import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import './Search.scss';
import '../grid/Grid.scss';

import { IMAGE_URL } from '../../../services/movies.service';
import Rating from '../rating/Rating';
import LazyImage from '../../lazyImage/LazyImage';

const Search = ({ searchResult }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  return (
    <>
      <div className="search-result">{searchResult.length} movies found!</div>
      <div className="grid">
        {movieData.map((data) => (
          <Fragment key={uuid()}>
            {data.poster_path && (
              <LazyImage
                className="grid-cell"
                src={`${IMAGE_URL}${data.poster_path}`}
                alt="placeholder"
              >
                <div className="grid-read-more">
                  <button className="grid-cell-button">Read More</button>
                </div>
                <div className="grid-detail">
                  <span className="grid-detail-title">{data.title}</span>
                  <div className="grid-detail-rating">
                    <Rating rating={data.vote_average} totalStars={10} />
                    &nbsp;&nbsp;
                    <div className="grid-vote-average">{data.vote_average}</div>
                  </div>
                </div>
              </LazyImage>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

Search.propTypes = {
  searchResult: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  searchQuery: state.movies.searchQuery
});

export default connect(mapStateToProps, {})(Search);
