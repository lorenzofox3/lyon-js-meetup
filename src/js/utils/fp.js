export const map = (mapFn) =>
  function* (iterable) {
    for (const el of iterable) {
      yield mapFn(el);
    }
  };

export const filter = (filterFn) =>
  function* (iterable) {
    for (const el of iterable) {
      if (filterFn(el)) {
        yield el;
      }
    }
  };

export const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((y, fn) => fn(y), arg);

export const trace = (message) => (args) => {
  console.log('tracing ', message);
  console.log(args);
  return args;
};

export const first = (iterable) => {
  for (const el of iterable) {
    return el;
  }
};
