const withInjectables =
  (injectables = {}) =>
  (gen) =>
    function* (arg = {}) {
      yield* gen({
        ...injectables,
        ...arg,
      });
    };

const withStore = withInjectables({ store });

define(
  'foo-bar',
  withStore(function* CountDisplay({ store }) {
    /* store is injected */
  })
);

const CountDisplay = function* ({ store, $el }) {
  const { render } = $el;
  $el.render = (arg = {}) => {
    render({
      state: store.getState(),
      ...arg,
    });
  };

  const unsubscribe = store.subscribe($el.render);

  try {
    while (true) {
      const { state } = yield;
      $el.textContent = `count: ${state.count}`;
    }
  } finally {
    unsubscribe();
  }
};

const connectController = (component) =>
  function* ({ $el, store, ...rest }) {
    const { render } = $el;
    $el.render = (arg = {}) => {
      render({
        ...arg,
        state: store.getState(),
      });
    };

    const unsubscribe = store.subscribe($el.render);

    try {
      yield* component({
        $el,
        store,
        ...rest,
      });
    } finally {
      unsubscribe();
    }
  };

define('foo-bar', withStore(connectController(CountDisplay)));
