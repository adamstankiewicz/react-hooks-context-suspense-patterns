import React, { useContext } from 'react';

import { FetchStore } from './DashboardPage';

export default function Counter() {
  const { state } = useContext(FetchStore.Context);
  return (
    <>
      <p>Count: {state.count}</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
}
