import React, { createContext, useReducer, useMemo, Suspense } from 'react';

export default function makeFetchModuleStore({ reducer, initialState, resource }) {
  const Context = createContext(null);

  const BaseComponent = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const resourceData = useMemo(() => resource.readAll(), []);
    const contextState = useMemo(() => ({ ...state, ...resourceData }), [
      state,
      resourceData,
    ]);

    return (
      <Context.Provider
        value={{
          state: contextState,
          dispatch,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  const Component = ({ children, fallback }) => {
    return (
      <Suspense fallback={fallback}>
        <BaseComponent>{children}</BaseComponent>
      </Suspense>
    );
  };

  return {
    Component,
    Context,
  };
}
