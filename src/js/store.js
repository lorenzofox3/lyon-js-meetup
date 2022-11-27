function* EventLoop({ reducer, initialState }) {
  let state = initialState;
  while (true) {
    const action = yield state;
    state = reducer(state, action);
  }
}

const createEventLoop = ({ reducer, initialState }) => {
  const eventLoop = EventLoop({ reducer, initialState });
  eventLoop.next();
  return (action) => eventLoop.next(action).value;
};

const createSubscribable = (eventName = 'state-changed') => {
  const eventTarget = new EventTarget();

  const notify = () => eventTarget.dispatchEvent(new CustomEvent(eventName));

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

  const dispatch = createEventLoop({ reducer, initialState });

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
