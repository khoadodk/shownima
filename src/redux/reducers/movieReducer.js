import { MOVIE_LIST, MOVIE_PAGE, LOAD_MORE, MOVIE_TYPE } from '../types';

const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieType: 'now_playing'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_LIST:
      return {
        ...state,
        list: action.payload
      };

    case MOVIE_PAGE:
      return {
        ...state,
        page: action.page,
        totalPages: action.total_pages
      };
    case LOAD_MORE:
      return {
        ...state,
        list: [...state.list, ...action.payload],
        page: action.page,
        totalPages: action.total_pages
      };
    case MOVIE_TYPE:
      return {
        ...state,
        movieType: action.payload
      };
    default:
      return state;
  }
};
