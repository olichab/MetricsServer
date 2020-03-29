import { CONSTANT } from './actionTypes';

const initialState = {
  payload: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT:
      return [
        ...state,
        {
          payload: action.payload,
        }
      ];
    default:
      return state
  }
};