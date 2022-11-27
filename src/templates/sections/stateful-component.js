function* clickCountComponent({ $el }) {
  const { textContent: label } = $el;
  let clickCount = 0;

  $el.addEventListener('click', () => {
    clickCount++;
    $el.render();
  });

  while (true) {
    yield;
    $el.textContent = `${label} (${clickCount})`;
  }
}
