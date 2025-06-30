class TaskItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Untitled Task';
    const description = this.getAttribute('description') || '';
    const due = this.getAttribute('due') || 'No date';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #f3f4f6;
          border-radius: 6px;
          padding: 0.75rem;
          font-size: 0.9rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: background 0.2s ease;
          cursor: pointer;
        }
        :host(:hover) {
          background: #e5e7eb;
        }
       :host(.today) {
          border-left: 4px solid #3b82f6;
          background: #eff6ff;
        }
        :host(.upcoming) {
          border-left: 4px solid #a855f7;
          background: #f3e8ff;
        }
        :host(.backlog) {
          border-left: 4px solid #9ca3af;
          background: #f9fafb;
        }
        :host(.completed) {
          border-left: 4px solid #10b981;
          background: #ecfdf5;
        }
        :host(.overdue) {
          border-left: 4px solid #ef4444;
          background: #fff1f2;
        }
        .title {
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
        .description {
          font-size: 0.85rem;
          color: #4b5563;
          margin-bottom: 0.5rem;
        }
        .due {
          font-size: 0.75rem;
          color: #9ca3af;
        }
      </style>

      <div class="title">${title}</div>
      <div class="description">${description}</div>
      <div class="due">Due: ${due}</div>
    `;

    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('edit-task-status', {
        bubbles: true,
        composed: true,
        detail: { task: this }
      }));
    });
  }
}

customElements.define('task-item', TaskItem);
