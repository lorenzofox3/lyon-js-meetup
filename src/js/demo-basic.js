import { define } from './framework/index.js';

define(
  'hello-world',
  function* ({ $el }) {
    try {
      while (true) {
        const viewModel = yield;
        $el.textContent = `Hello ${viewModel?.attributes?.name ?? ''}`;
      }
    } finally {
      console.log('bye "hello world"');
    }
  },
  {
    extends: 'p',
    observedAttributes: ['name'],
  }
);
