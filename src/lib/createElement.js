// import { addEvent } from "./eventManager"; // push 에러 임시 주석처리

export function createElement(vNode) {
  if (
    vNode === null ||
    typeof vNode === "undefined" ||
    typeof vNode === "boolean"
  ) {
    return document.createTextNode("");
  } else if (typeof vNode === "number" || typeof vNode === "string") {
    return document.createTextNode(vNode.toString());
  } else if (typeof vNode === "object" && vNode.length > 0) {
    // 배열일 경우 fragment 생성 및 element 생성해서 append

    const $f = document.createDocumentFragment();
    vNode.forEach((v) => $f.appendChild(createElement(v)));
    return $f;
  } else {
    // node
    const $el = document.createElement(vNode.type);
    vNode.children.forEach((v) => $el.appendChild(createElement(v)));
    updateAttributes($el, vNode.props);
    return $el;
  }
}

function updateAttributes($el, props) {
  if (!props) return;
  Object.entries(props).forEach(([k, v]) => {
    if (k === "className") k = "class";
    $el.setAttribute(k, v);
  });
}
