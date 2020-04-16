class CurrentTime extends HTMLElement {
  constructor() {
    // 클래스 초기화. 속성이나 하위 노드는 접근할 수는 없다.
    super();
  }
  static get observedAttributes() {
    // 모니터링 할 속성 이름
    return ["locale"];
  }
  connectedCallback() {
    // DOM에 추가되었다. 렌더링 등의 처리를 하자.
    this.start();
  }
  disconnectedCallback() {
    // DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
    this.stop();
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    // 속성이 추가/제거/변경되었다.
    this[attrName] = newVal;
  }
  adoptedCallback(oldDoc, newDoc) {
    // 다른 Document에서 옮겨져 왔음 자주 쓸 일은 없을 것.
  }
  start() {
    // `document.querySelector('current-time').start()`로 호출할 수 있다.
    this.stop();
    this._timer = window.setInterval(() => {
      this.innerHTML = `${new Date().toLocaleString(this.locale)}`;
    }, 1000);
  }
  stop() {
    if (this._timer) {
      window.clearInterval(this._timer);
      this._timer = null;
    }
  }
}

customElements.define("current-time", CurrentTime);
