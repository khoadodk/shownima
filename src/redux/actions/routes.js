import { APP_ROUTES, PATH_URL } from '../types';

export const appRoutes = (routes) => async (dispatch) => {
  // console.log('ROUTE ACTION', routes);
  dispatch({ type: APP_ROUTES, payload: routes });
};

export const pathUrl = (path, url) => async (dispatch) => {
  dispatch({ type: PATH_URL, payload: { path, url } });
};
