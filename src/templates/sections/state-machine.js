const template = `
<div id="traffic-light">
    <div></div>
    <div></div>
    <div></div>
</div>
`;

function* trafficLight() {
  while (true) {
    yield 'green';
    yield 'orange';
    yield 'red';
  }
}

const possibleStates = ['green', 'orange', 'red'];

function* trafficLightBis() {
  while (true) {
    yield* possibleStates;
  }
}

const stateMachine = (gen) => {
  const it = gen();
  return () => it.next().value;
};

const getLightColor = stateMachine(trafficLight);

const el = document.getElementById('traffic-light');
const updateDOM = () => {
  const color = getLightColor();
  el.classList.remove(...possibleStates);
  el.classList.add(color);
};

el.addEventListener('click', updateDOM);
