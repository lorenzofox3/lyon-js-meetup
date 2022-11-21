test('generator object implements the @@iterator method', (t) => {
  t.eq(typeof gen()[Symbol.iterator], 'function');
  t.eq(typeof [][Symbol.iterator], 'function');
  t.eq(typeof new Map()[Symbol.iterator], 'function');
});

test('generator object can be spread', (t) => {
  t.eq([...gen()], [1, 2, 3]);
});

test('for .. of loop consumes a generator object', (t) => {
  const values = [];
  for (const el of gen()) {
    values.push(el);
  }
  t.eq(values, [1, 2, 3]);
});

test('various APIs take an iterable', (t) => {
  t.eq(Array.from(gen()), [1, 2, 3]);
});

test('generator can delegate to a generator object', (t) => {
  function* around() {
    yield 0;
    yield* gen();
    yield 5;
  }
  t.eq([...around()], [0, 1, 2, 3, 5]);
});
