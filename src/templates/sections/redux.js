function* stateLoop({ reducer, initialState }) {
  let state = initialState;
  while (true) {
    const action = yield state;
    state = reducer(state, action);
  }
}

const reducer = (state, action) => {
  switch (action?.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + (action?.step ?? 1),
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - (action?.step ?? 1),
      };
  }
  return state;
};

const coroutine =
  (gen) =>
  ({ reducer, initialState }) => {
    const loop = gen({ reducer, initialState });
    loop.next();
    return (action) => loop.next(action).value;
  };

const createDispatch = coroutine(stateLoop);
const dispatch = createDispatch({
  reducer,
  initialState: { count: 0 },
});

console.log(dispatch({ type: 'increment' }));
// { count: 1 }
console.log(dispatch({ type: 'increment', step: 3 }));
// { count: 4 }
console.log(dispatch({ type: 'decrement' }));
// { count: 3 }

const createSubscribable = (eventName = 'state-changed') => {
  const eventTarget = new EventTarget();

  const notify = () => {
    eventTarget.dispatchEvent(new CustomEvent(eventName));
  };

  const subscribe = (listener) => {
    eventTarget.addEventListener(eventName, listener);
    return () => unsubscribe(listener);
  };

  const unsubscribe = (listener) =>
    eventTarget.removeEventListener(eventName, listener);

  return {
    unsubscribe,
    subscribe,
    notify,
  };
};

export const createStore = (reducer, initialState = {}) => {
  let state = initialState;
  const { notify, ...subscribable } = createSubscribable();
  const dispatch = createDispatch({ reducer, initialState });

  return {
    ...subscribable,
    getState() {
      return structuredClone(state);
    },
    dispatch(action) {
      state = dispatch(action);
      notify();
    },
  };
};

const store = createStore(reducer, {
  initialState: {
    count: 0,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: 'increment' });
// etc
