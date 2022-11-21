test('generator object implements the iterator protocol', (t) => {
  const iterableIterator = gen();
  t.eq(typeof iterableIterator.next, 'function');
  t.eq(typeof iterableIterator.throw, 'function');
  t.eq(typeof iterableIterator.return, 'function');
});

test('calling next returns an iterator result', (t) => {
  const iterableIterator = gen();
  t.eq(iterableIterator.next(), { value: 1, done: false });
  t.eq(iterableIterator.next(), { value: 2, done: false });
  t.eq(iterableIterator.next(), { value: 3, done: false });
  t.eq(iterableIterator.next(), { value: 42, done: true });
  t.eq(iterableIterator.next(), { value: undefined, done: true });
});
