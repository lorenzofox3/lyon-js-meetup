class MyElement extends HTMLParagraphElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['my-attr'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // update
  }

  connectedCallback() {
    // component mounted
  }

  disconnectedCallback() {
    // component unmounted
  }
}

customElements.define('my-element', MyElement, {
  extends: 'p',
});

const html = `<p is="my-element" my-attr="foo">Some text content</p>`;
