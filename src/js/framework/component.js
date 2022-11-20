import { getAttributes } from "./utils.js";

const defaultOptions = { observedAttributes: [], Klass: HTMLElement };

export const component = (
  renderLoop,
  { observedAttributes = [], Klass = HTMLElement } = defaultOptions
) =>
  class extends Klass {
    #loop;
    #lifeCycle = "CREATED";

    static get observedAttributes() {
      return [...observedAttributes];
    }

    constructor() {
      super();
      this.#loop = renderLoop({
        $el: this,
      });
      this.render = this.render.bind(this);
      this.#loop.next();
      this.render();
    }

    connectedCallback() {
      this.#lifeCycle = "CONNECTED";
    }

    disconnectedCallback() {
      this.#lifeCycle = "DISCONNECTED";
      this.#loop.return();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.#lifeCycle === "CONNECTED" && oldValue !== newValue) {
        this.render();
      }
    }

    render(updateNs = {}) {
      this.#loop.next({
        lifeCycle: this.#lifeCycle,
        attributes: getAttributes(this),
        ...updateNs,
      });
    }
  };
