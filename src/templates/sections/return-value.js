import { test } from 'zora';

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 42;
}

test('generator function returns a GeneratorObject', (t) => {
  t.eq(typeof gen(), 'object');
});
