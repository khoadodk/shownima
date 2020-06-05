import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import './Grid.scss';
import { Link } from 'react-router-dom';

import { IMAGE_URL } from '../../../services/movies.service';
import Rating from '../rating/Rating';
import LazyImage from '../../lazyImage/LazyImage';

const Grid = ({ list }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <>
      <div className="grid">
        {movieData.map((data, i) => (
          <div key={uuid()}>
            <LazyImage
              className="grid-cell"
              src={`${IMAGE_URL}${data.poster_path}`}
              alt="placeholder"
            >
              <div className="grid-read-more">
                <Link className="grid-cell-button" to={`/${data.id}/details`}>
                  Read More
                </Link>
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
          </div>
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list
});

export default connect(mapStateToProps, {})(Grid);
