const eventTypes = ["click", "submit"];
const eventMap = new Map();

export function setupEventListeners(root) {
  eventTypes.forEach((evt) => {
    root.addEventListener(evt, (e) => {
      let target = e.target; // 선택한 태그 전체
      while (target && target != root) {
        // root까지 계속 버블링
        if (e.cancelBubble) break; // 이벤트 취소해야되면 break
        if (eventMap.has(target)) {
          // 이벤트 처리할거있으면
          const handlers = eventMap.get(target);
          if (handlers[evt]) {
            // 이벤트 처리
            handlers[evt](e);
          }
        }
        target = target.parentElement; // 상위 타겟으로 변경
      }
    });
  });
  return root;
}

export function addEvent(element, eventType, handler) {
  // element ex) button#post-submit.mt-2.bg-blue-600.text-white.px-4.py-2.rounded
  element.addEventListener(eventType, handler);

  if (!eventMap.has(element)) {
    eventMap.set(element, {});
  }

  eventMap.get(element)[eventType] = handler;
}

export function removeEvent(element, eventType, handler) {
  console.log(element, eventType, handler);
  return null;
}
