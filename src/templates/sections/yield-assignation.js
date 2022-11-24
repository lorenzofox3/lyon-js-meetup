function* renderingRoutine() {
  let state = 'initial';
  const { classList } = el;
  while (true) {
    const newState = yield;
    classList.remove(state);
    classList.add(newState);
    state = newState;
  }
}

const it = renderingRoutine();
it.next();
it.next('green');
it.next('orange');
it.next('red');
// etc

const coroutine = (gen) => {
  const it = gen();
  it.next();
  return (value) => it.next(value);
};

const render = coroutine(renderingRoutine);
const dispatch = () => render(getLightColor());

el.addEventListener('click', dispatch);
