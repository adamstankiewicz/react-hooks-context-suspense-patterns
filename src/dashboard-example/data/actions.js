import { INCREMENT, DECREMENT } from './constants';

export function incrementCount() {
  return {
    type: INCREMENT,
  };
}

export function decrementCount() {
  return {
    type: DECREMENT,
  };
}
