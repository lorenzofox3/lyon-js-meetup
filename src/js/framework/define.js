import { component } from "./component.js";

export const define = (tag, coroutine, opts = {}) => {
  customElements.define(
    tag,
    component(coroutine, {
      observedAttributes: opts.observedAttributes,
      Klass: classElementMap[opts?.extends] ?? HTMLElement,
    }),
    opts
  );
};

const classElementMap = {
  button: HTMLButtonElement,
  span: HTMLSpanElement,
  form: HTMLFormElement,
  li: HTMLLIElement,
  ul: HTMLUListElement,
  input: HTMLInputElement,
  p: HTMLParagraphElement,
};
