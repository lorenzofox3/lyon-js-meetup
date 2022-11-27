const component = (
  renderLoop,
  { Klass = HTMLElement, observedAttributes = [] } = {}
) =>
  class extends Klass {
    static get observedAttributes() {
      return [...observedAttributes];
    }
    // ...
    constructor() {
      super();
      this._loop = renderLoop({
        $el: this,
      });
      this._loop.next();
      this.render = this.render.bind(this);
      this.render();
    }

    disconnectedCallback() {
      this._loop.return();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
    render(viewModel = {}) {
      this._loop.next({
        attributes: getAttributes(this),
        ...viewModel,
      });
    }
  };

const define = (tag, coroutine, opts = {}) => {
  customElements.define(
    tag,
    component(coroutine, {
      observedAttributes: opts.observedAttributes,
      Klass: classElementMap[opts?.extends] ?? HTMLElement,
    }),
    opts
  );
};

define(
  'hello-world',
  function* helloWorldComp({ $el }) {
    try {
      while (true) {
        const viewModel = yield;
        $el.textContent = `Hello ${viewModel?.attributes?.name ?? ''}`;
      }
    } finally {
      console.log('removed');
    }
  },
  {
    extends: 'p',
    observedAttributes: ['name'],
  }
);

// <p is="hello-world" name="lyon-js"></p>
