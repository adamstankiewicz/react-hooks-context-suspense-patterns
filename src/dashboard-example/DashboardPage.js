import React from 'react';

import { makeFetchModuleStore, makeServiceResource } from '../fetch-module-with-store';
import Dashboard from './Dashboard';

import reducer, { initialState } from './data/reducer';
import { fetchPosts, fetchTodos } from './data/service';

const resource = makeServiceResource({
  posts: fetchPosts,
  todos: fetchTodos,
});

export const FetchModuleStore = makeFetchModuleStore({
  reducer,
  initialState,
  resource,
});

export default function DashboardPage() {
  return (
    <FetchModuleStore.Component fallback={<h1>loading...</h1>}>
      <Dashboard />
    </FetchModuleStore.Component>
  );
}
