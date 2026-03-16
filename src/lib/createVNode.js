export function createVNode(type, props, ...children) {
  children = children.flat(Infinity).filter((v) => v || typeof v === "number");
  return { type, props, children };
}
