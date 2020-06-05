import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import './Reviews.scss';

const Reviews = ({ movie }) => {
  const [reviews] = useState(movie[3]);

  return (
    <>
      <div className="movie-reviews">
        <div className="div-title">
          Reviews {reviews.results.length > 0 ? reviews.results.length : ''}
        </div>
        {reviews.results.length ? (
          reviews.results.map((data) => (
            <div className="reviews" key={uuid()}>
              <h3>{data.author}</h3>
              <div>{data.content}</div>
            </div>
          ))
        ) : (
          <p>No reviews to show</p>
        )}
      </div>
    </>
  );
};

Reviews.propTypes = {
  movie: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, {})(Reviews);
