import { createStore } from './store.js';
import { withInjectables, define } from './framework/index.js';

const store = createStore(
  (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          count: state.count + 1,
        };
      case 'decrement':
        return {
          ...state,
          count: state.count - 1,
        };
      default:
        return state;
    }
  },
  {
    count: 0,
  }
);

const withStore = withInjectables({ store });

export const connect = (component) =>
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

define(
  'action-button',
  withStore(function* ({ store, $el }) {
    $el.addEventListener('click', () => {
      store.dispatch({ type: $el.getAttribute('action') });
    });
  }),
  { extends: 'button' }
);

define(
  'app-counter',
  withStore(
    connect(function* ({ $el }) {
      while (true) {
        const viewModel = yield;
        $el.textContent = viewModel.state.count;
      }
    })
  )
);
