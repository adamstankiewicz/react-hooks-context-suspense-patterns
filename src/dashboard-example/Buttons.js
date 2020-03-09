import React, { useContext } from 'react';

import { FetchStore } from './DashboardPage';

import { incrementCount, decrementCount } from './data/actions';

function IncrementButton() {
  const { dispatch } = useContext(FetchStore.Context);
  const increment = () => dispatch(incrementCount());
  return <button onClick={increment}>Increment</button>;
}

function DecrementButton() {
  const { dispatch } = useContext(FetchStore.Context);
  const decrement = () => dispatch(decrementCount());
  return <button onClick={decrement}>Decrement</button>;
}

export default function Buttons() {
  return (
    <div>
      <IncrementButton />
      <DecrementButton />
    </div>
  );
}
