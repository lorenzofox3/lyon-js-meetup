const template = document.createElement('template');
template.innerHTML = `<div>
    <span id="data-container"></span>
    <button id="action-button">Some action</button>
</div>`;

function* SomeComponent({ $el }) {
  const onClick = (ev) => {
    /* ... */
  };

  $el.appendChild(template.content.cloneNode(true));
  $el.getElementById('action-button').addEventListener('click', onClick);
  const span = $el.getElementById('data-container');

  while (true) {
    const viewModel = yield;
    span.textContent = viewModel.data;
  }
}

import { render, html } from 'lit-html';

const withTemplateLib = withInjectables({
  render,
  html,
});

export const SomeComponent = withTemplateLib(function* ({ $el, render, html }) {
  const onClick = () => {
    $el.render({ data: 'foo bar bim' });
  };

  while (true) {
    const viewModel = yield;
    render(template(viewModel), $el);
  }

  function template(viewModel) {
    return html`<div>
      <span>${viewModel.data}</span>
      <button @click="${onClick}">Some action</button>
    </div>`;
  }
});

const SomeComponent = ({ $el, html }) => {
  const onClick = () => $el.render({ data: 'foo bar bim' });
  return (viewModel) => html`<div>
    <span>${viewModel.data}</span>
    <button @click="${onClick}">Some action</button>
  </div>`;
};

const withTemplate = (component) =>
  withTemplateLib(function* ({ $el, render, ...rest }) {
    const templateFn = component({
      $el,
      ...rest,
    });
    while (true) {
      const viewModel = yield;
      render(templateFn(viewModel), $el);
    }
  });

define('some-tag', withTemplate(SomeComponent));
