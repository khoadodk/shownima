import {
  MOVIE_LIST,
  MOVIE_PAGE,
  LOAD_MORE,
  MOVIE_TYPE,
  SEARCH_QUERY,
  SEARCH_RESULT
} from '../types';

const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieType: 'now_playing',
  searchQuery: '',
  searchResult: []
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
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case LOAD_MORE:
      return {
        ...state,
        list: [...state.list, ...action.payload.results],
        page: action.payload.page,
        totalPages: action.payload.total_pages
      };
    case MOVIE_TYPE:
      return {
        ...state,
        movieType: action.payload
      };
    case SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    case SEARCH_RESULT:
      console.log(action.payload);
      return {
        ...state,
        searchResult: action.payload
      };
    default:
      return state;
  }
};
