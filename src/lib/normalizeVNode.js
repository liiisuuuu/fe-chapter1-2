export function normalizeVNode(vNode) {
  /*
    가상 노드 표준화된 형태로 변환
    여러 타입의 입력 처리 -> 일관된 가상 노드 반환해서 DOM 조작/렌더링 과정에서 해당 데이터로 사용
  */

  if (
    vNode === null ||
    typeof vNode === "undefined" ||
    typeof vNode === "boolean"
  ) {
    vNode = "";
  } else if (typeof vNode === "number") {
    vNode = vNode.toString();
  } else if (typeof vNode?.type === "function") {
    normalizeVNode(vNode.type(vNode?.props || {}));
  }

  return vNode;
}
