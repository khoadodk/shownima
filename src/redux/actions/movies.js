import {
  MOVIE_LIST,
  SET_ERROR,
  MOVIE_PAGE,
  LOAD_MORE,
  MOVIE_TYPE
} from '../types';
import { MOVIE_API_URL } from '../../services/movies.service';

export const getMovies = (type, pages) => async (dispatch) => {
  try {
    const response = await MOVIE_API_URL(type, pages);
    const { results, page, total_pages } = response.data;
    dispatch({ type: MOVIE_LIST, payload: results });
    dispatch({ type: MOVIE_PAGE, page, total_pages });
  } catch (error) {
    if (error.response) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message });
    }
  }
};

export const loadMore = (type, pages) => async (dispatch) => {
  try {
    const response = await MOVIE_API_URL(type, pages);
    const { results, page, total_pages } = response.data;
    dispatch({ type: LOAD_MORE, payload: results, page, total_pages });
  } catch (error) {
    if (error.response) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message });
    }
  }
};

export const setMoviePage = (page, totalPages) => async (dispatch) => {
  dispatch({ type: MOVIE_PAGE, page, totalPages });
};

export const setMovieType = (type) => async (dispatch) => {
  dispatch({ type: MOVIE_TYPE, payload: type });
};
