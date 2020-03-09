export function wrapPromise(promise) {
  const PENDING = 'pending';
  const SUCCESS = 'success';
  const ERROR = 'error';

  let status = PENDING;
  let response;

  const suspender = promise.then(
    res => {
      status = SUCCESS;
      response = res;
    },
    err => {
      status = ERROR;
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case PENDING:
        throw suspender;
      case ERROR:
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

export function makeServiceResource(options) {
  const promises = {};

  const wrapPromises = () => {
    Object.entries(options).forEach(([key, callableFn]) => {
      const promise = callableFn();
      promises[key] = wrapPromise(promise);
    });
  };

  wrapPromises();

  return {
    readAll: () => {
      const data = {};
      Object.keys(promises).forEach(key => {
        data[key] = promises[key].read();
      });
      return data;
    },
  };
}
