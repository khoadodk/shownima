import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.scss';
import logo from '../../assets/logo.JPG';
import {
  getMovies,
  setMovieType,
  setMoviePage
} from '../../redux/actions/movies';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fa fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fa fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fa fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fa fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = ({
  getMovies,
  setMoviePage,
  setMovieType,
  page,
  totalPages
}) => {
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now_playing');

  useEffect(() => {
    getMovies(type, page);
    setMoviePage(page, totalPages);
    // eslint-disable-next-line
  }, [type]);

  const setMovieTypeUrl = (type) => {
    setType(type);
    setMovieType(type);
  };

  const toggleMenu = () => {
    menuClass = !menuClass;
    navClass = !navClass;
    setMenuClass(menuClass);
    setNavClass(navClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  return (
    <div className="header-nav-wrapper">
      <div className="header-bar"></div>
      <div className="header-navbar">
        <div className="header-image">
          <img src={logo} alt="logo" />
        </div>
        <div
          className={`${
            menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'
          }`}
          id="header-mobile-menu"
          onClick={() => toggleMenu()}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul
          className={`${
            navClass ? 'header-nav header-mobile-nav' : 'header-nav'
          }`}
        >
          {HEADER_LIST.map((data) => (
            <li
              key={data.id}
              className={
                data.type === type
                  ? 'header-nav-item active-item'
                  : 'header-nav-item'
              }
              onClick={() => setMovieTypeUrl(data.type)}
            >
              <span className="header-list-name">
                <i className={data.iconClass}></i>
              </span>
              &nbsp;
              <span className="header-list-name">{data.name}</span>
            </li>
          ))}
          <input
            type="text"
            className="search-input"
            placeholder="Search A Movie"
          />
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {
  getMovies: PropTypes.func.isRequired,
  setMovieType: PropTypes.func.isRequired,
  setMoviePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages
});

export default connect(mapStateToProps, {
  getMovies,
  setMovieType,
  setMoviePage
})(Header);
