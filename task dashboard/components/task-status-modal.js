class TaskStatusModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('#close').addEventListener('click', () => this.hide());
    this.shadowRoot.querySelector('#save').addEventListener('click', () => this.saveStatus());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          display: none;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1001;
        }
        .modal {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          min-width: 250px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        select {
          width: 100%;
          padding: 0.5rem;
          font-size: 0.9rem;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        #close {
          background: #f3f4f6;
          color: #374151;
        }
        #close:hover {
          background: #e5e7eb;
        }
        #save {
          background: #3b82f6;
          color: white;
        }
        #save:hover {
          background: #2563eb;
        }
      </style>

      <div class="modal">
        <label for="status">Move task to:</label>
        <select id="status">
          <option value="Today">Today</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Backlog">Backlog</option>
          <option value="Completed">Completed</option>
        </select>

        <div class="actions">
          <button id="close">Cancel</button>
          <button id="save">Save</button>
        </div>
      </div>
    `;
  }

  show(task) {
    this.task = task;
    this.style.display = 'flex';
  }

  hide() {
    this.style.display = 'none';
  }

  saveStatus() {
    const newSection = this.shadowRoot.querySelector('#status').value;
    this.dispatchEvent(new CustomEvent('status-changed', {
      detail: { task: this.task, newSection },
      bubbles: true,
      composed: true
    }));
    this.hide();
  }
}

customElements.define('task-status-modal', TaskStatusModal);
