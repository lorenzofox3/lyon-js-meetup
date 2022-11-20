export const getAttribute = (attr) => (el) => el?.getAttribute(attr) ?? '';

export const getAttributeNames = (el) => el?.getAttributeNames() ?? [];

export const querySelectorAll = (selector) => (el) =>
  el?.querySelectorAll(selector) ?? [];
