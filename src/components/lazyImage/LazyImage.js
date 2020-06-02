import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import placeHolder from '../../assets/lazy_loader.gif';

const LazyImage = ({ src, alt, children, className }) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    // Set the src image at thresholds 10%, and rootmargin 75%

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%'
          }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <>
      <div
        className={className}
        ref={setImageRef}
        style={{ backgroundImage: `url(${imageSrc})` }}
        alt={alt}
      >
        {children}
      </div>
    </>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.any.isRequired
};

export default LazyImage;
