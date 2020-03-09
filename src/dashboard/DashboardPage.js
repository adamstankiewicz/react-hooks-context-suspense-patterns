import React from 'react';

import { makeFetchStore, makeServiceResource } from '../fetch-store';
import Dashboard from './Dashboard';

import reducer, { initialState } from './data/reducer';
import { fetchPosts, fetchTodos } from './data/service';

const resource = makeServiceResource({
  posts: fetchPosts,
  todos: fetchTodos,
});

export const FetchStore = makeFetchStore({
  reducer,
  initialState,
  resource,
});

export default function DashboardPage() {
  return (
    <FetchStore.Component fallback={<h1>loading...</h1>}>
      <Dashboard />
    </FetchStore.Component>
  );
}
