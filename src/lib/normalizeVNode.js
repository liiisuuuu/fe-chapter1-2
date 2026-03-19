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
    return "";
  } else if (typeof vNode === "number" || typeof vNode === "string") {
    return vNode.toString();
  } else if (typeof vNode?.type === "function") {
    // "props: vNode.props" => "{ props: {id: abc} }" 로 들어가서 스프레드 연산자 사용
    const props = { ...(vNode.props || {}), children: vNode.children };

    const transfered = vNode.type(props);
    return normalizeVNode(transfered);
  }
  // nNode가 함수 아닌 일반 태그

  // 자식 태그 - children이 함수 아닐때까지 처리해서 뭉텅이 가져오기
  const nNode = vNode.children
    .map((v) => normalizeVNode(v))
    .filter((a) => a || Boolean(a));

  // object spread 연산자로 객체 프로퍼티 업데이트 or 복사 가능
  // children 태그로 다 풀어진거 합체
  const asn = { ...vNode, children: nNode };
  return asn;
}
