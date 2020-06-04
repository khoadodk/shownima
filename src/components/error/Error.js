import React from 'react';
import { Link } from 'react-router-dom';

import './Error.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong.</p>
      <div className="error-link">
        <Link to={'/'}>
          <i className="icon-home"></i> Go back to home page.
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
