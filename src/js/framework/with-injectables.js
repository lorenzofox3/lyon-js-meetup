export const withInjectables =
  (injectables = {}) =>
  (gen) =>
    function* (arg = {}) {
      yield* gen({
        ...injectables,
        ...arg,
      });
    };
