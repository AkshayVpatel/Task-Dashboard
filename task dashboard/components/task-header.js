class TaskHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        position: sticky;
        top: 0;
        z-index: 10;
        gap: 1rem;
        }
        .left {
          flex: 1;
        }
        .center {
          flex: 2;
          display: flex;
          justify-content: center;
        }
        .right-controls {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
        }
        input {
          width: 100%;
          max-width: 400px;
          padding: 0.6rem 1rem;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #ffffff;
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
        }
        select {
          padding: 0.4rem 0.6rem;
          font-size: 0.9rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #f9f9f9;
        }
        button {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        button:hover {
          background-color: #1e4bb8;
        }
      </style>
      <div class="left">
        <div class="title">My Dashboard</div>
      </div>
      <div class="center">
        <input id="searchInput" type="text" placeholder="Search tasks..." />
      </div>
      <div class="right-controls">
        <button id="addTaskBtn">+ Add New Task</button>
      </div>

    `;
    // Handle Add new button and search field in header on action
    const addButton = this.shadowRoot.querySelector('#addTaskBtn');
    addButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-task', {
        bubbles: true,
        composed: true
      }));
    });

    this.shadowRoot.querySelector('#searchInput')
      .addEventListener('input', (e) => {
        this.dispatchEvent(new CustomEvent('search-changed', {
          detail: e.target.value.toLowerCase(),
          bubbles: true,
          composed: true
        }));
      });

  }
}

customElements.define('task-header', TaskHeader);
