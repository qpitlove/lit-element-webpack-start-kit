import { LitElement, html } from 'lit-element';

class TodoView extends LitElement {
  render() {
    return html`
      todo-view
    `;
  }
}

customElements.define('todo-view', TodoView);