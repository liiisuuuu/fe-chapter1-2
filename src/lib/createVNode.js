export function createVNode(type, props, ...children) {
  children = children.flat(Infinity).filter((v) => v);
  return { type, props, children };
}
