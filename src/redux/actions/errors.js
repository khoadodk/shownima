import { SET_ERROR } from '../types';

export const setError = (errorMsg) => async (dispatch) => {
  if (errorMsg) {
    dispatch({
      type: SET_ERROR,
      payload: {
        message: errorMsg.message,
        statusCode: errorMsg.statusCode
      }
    });
  } else {
    dispatch({
      type: SET_ERROR,
      payload: {
        message: '',
        statusCode: null
      }
    });
  }
};
