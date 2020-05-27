import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import movieReducer from './movieReducer';

const rootReducers = combineReducers({
  error: errorReducer,
  movies: movieReducer
});

export default rootReducers;
