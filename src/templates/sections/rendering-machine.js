function* trafficLight() {
  console.log('hello');

  while (true) {
    el.classList.remove('red');
    el.classList.add('green');
    yield;
    el.classList.remove('green');
    el.classList.add('orange');
    yield;
    el.classList.remove('orange');
    el.classList.add('red');
    yield;
  }
}
