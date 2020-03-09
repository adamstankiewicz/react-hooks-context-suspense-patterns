import { INCREMENT, DECREMENT } from './constants';

export const initialState = {
  todos: [],
  posts: [],
  count: 0,
};

export default function reducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
