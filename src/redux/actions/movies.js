import {
  MOVIE_LIST,
  SET_ERROR,
  MOVIE_PAGE,
  LOAD_MORE,
  MOVIE_TYPE,
  SEARCH_RESULT,
  SEARCH_QUERY
} from '../types';
import { MOVIE_API_URL, SEARCH_API_URL } from '../../services/movies.service';

export const getMovies = (type, pages) => async (dispatch) => {
  try {
    const response = await MOVIE_API_URL(type, pages);
    const { results, page, total_pages } = response.data;
    dispatch({ type: MOVIE_LIST, payload: results });
    dispatch({ type: MOVIE_PAGE, payload: { page, totalPages: total_pages } });
    console.log('GET MOVIES ACTION', type, pages);
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
    dispatch({ type: LOAD_MORE, payload: { results, page, total_pages } });
    console.log('LOAD MORE ACTION', type, pages);
  } catch (error) {
    if (error.response) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message });
    }
  }
};

export const setMoviePage = (page, totalPages) => async (dispatch) => {
  console.log('SET MOVIE PAGE ACTION', page, totalPages);

  dispatch({ type: MOVIE_PAGE, payload: { page, totalPages } });
};

export const setMovieType = (type) => async (dispatch) => {
  console.log('SET MOVIE TYPE ACTION', type);
  dispatch({ type: MOVIE_TYPE, payload: type });
};

export const searchQuery = (query) => async (dispatch) => {
  console.log('SEARCH QUERY ACTION', query);
  dispatch({ type: SEARCH_QUERY, payload: query });
};

export const searchResult = (query) => async (dispatch) => {
  try {
    if (query) {
      const response = await SEARCH_API_URL(query);
      const { results } = response.data;
      dispatch({ type: SEARCH_RESULT, payload: results });
    } else {
      dispatch({ type: SEARCH_RESULT, payload: [] });
    }
  } catch (error) {
    if (error.response) {
      dispatch({ type: SET_ERROR, payload: error.response.data.message });
    }
  }
};
