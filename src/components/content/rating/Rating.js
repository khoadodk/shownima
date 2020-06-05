import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Rating.scss';

const Rating = ({ rating, totalStars }) => {
  const [numberOfStars, setNumberOfStars] = useState();
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map((i) => i + 1));
    const percentage = (rating / 10) * 100;
    const starPercentage = `${Math.floor(percentage)}%`; //0-100%
    ratingRef.current.style.width = starPercentage;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className="back-stars">
        {numberOfStars &&
          numberOfStars.map((i) => (
            <div key={i}>
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
          ))}

        <div className="front-stars" ref={ratingRef}>
          {numberOfStars &&
            numberOfStars.map((i) => (
              <div key={i}>
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired
};

export default Rating;
