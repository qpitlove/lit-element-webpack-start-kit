import { LitElement, html } from "lit-element";

class currentTimeLitElement extends LitElement {
  constructor() {
    // 클래스 초기화. 속성이나 하위 노드는 접근할 수는 없다.
    super();
  }
  static get properties() {
    return {
      now: { type: String },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.now = new Date().toLocaleString(this.locale);
    this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }
  start() {
    // `document.querySelector('current-time').start()`로 호출할 수 있다.
    this.stop();
    this._timer = window.setInterval(() => {
      this.now = new Date().toLocaleString(this.locale);
    }, 1000);
  }
  stop() {
    if (this._timer) {
      window.clearInterval(this._timer);
      this._timer = null;
    }
  }
  render() {
    return html`<strong>now:</strong> ${this.now}`;
  }
}

customElements.define("current-time-lit-element", currentTimeLitElement);
