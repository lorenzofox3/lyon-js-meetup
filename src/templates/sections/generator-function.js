function* name() {
  yield 4 + 3;
  yield 'hello world';
  yield;
  const foo = yield;
  const bar = yield 'some value';
  yield* gen();
}
