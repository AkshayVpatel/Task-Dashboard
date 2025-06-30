class TaskModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('#close').addEventListener('click', () => this.hide());
    this.shadowRoot.querySelector('#submit').addEventListener('click', () => this.addTask());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          width: 400px;
          max-width: 90%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          font-weight: 500;
          margin-bottom: 0.2rem;
        }
        input, textarea, select {
          width: 100%;
          padding: 0.5rem;
          font-size: 0.9rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        #close {
          background: #e5e7eb;
        }
        #submit {
          background: #3b82f6;
          color: white;
        }
      </style>

      <div class="modal">
        <center><h3> Add New Task</h3></center>
        <label>Title</label>
        <input id="title" type="text" />

        <label>Description</label>
        <textarea id="description" rows="3"></textarea>

        <label>Due Date</label>
        <input id="due" type="date" />

        <label>Section</label>
        <select id="section">
          <option value="Today">Today</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Backlog">Backlog</option>
          <option value="Completed">Completed</option>
        </select>

        <div class="actions">
          <button id="close">Cancel</button>
          <button id="submit">Add Task</button>
        </div>
      </div>
    `;
  }

  show() {
    this.style.display = 'flex';
  }

  hide() {
    this.style.display = 'none';
  }

  addTask() {
    const title = this.shadowRoot.querySelector('#title').value;
    const description = this.shadowRoot.querySelector('#description').value;
    const due = this.shadowRoot.querySelector('#due').value;
    const section = this.shadowRoot.querySelector('#section').value;

    const task = document.createElement('task-item');
    task.setAttribute('title', title);
    task.setAttribute('description', description);
    task.setAttribute('due', due);

    const event = new CustomEvent('task-added', {
      detail: { section, task },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(event);
    this.hide();
  }
}

customElements.define('task-modal', TaskModal);
