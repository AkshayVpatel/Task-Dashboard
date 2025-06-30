class TaskSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Untitled';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          height: max-content;
          min-height: 500px;
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          padding: 1rem;
          width: 21%;
          flex-shrink: 0;
        }
        h2 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
      </style>

      <h2>${title}</h2>
      <div class="task-list">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('task-section', TaskSection);
