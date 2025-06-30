import { getSectionFromDate } from '../utils/task-utils.js';
class TaskApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.loadComponents();
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
      </style>
      <task-header></task-header>
      <task-dashboard></task-dashboard>
      <task-modal style="display:none;"></task-modal>
      <task-status-modal></task-status-modal>
    `;
  }

  setupEventListeners() {
    const header = this.shadowRoot.querySelector('task-header');
    const modal = this.shadowRoot.querySelector('task-modal');
    const statusModal = this.shadowRoot.querySelector('task-status-modal');
    const dashboard = this.shadowRoot.querySelector('task-dashboard');

    // Show modal to add new task
    header?.addEventListener('add-task', () => {
      modal?.show();
    });

    // When a task is added, place it in the appropriate section
    // modal?.addEventListener('task-added', (e) => {
    //   const { section, task } = e.detail;
    //   const board = dashboard.shadowRoot;
    //   const sectionEl = [...board.querySelectorAll('task-section')]
    //     .find(s => s.getAttribute('title') === section);
    //   sectionEl?.shadowRoot.querySelector('.task-list')?.appendChild(task);
    // });

    modal?.addEventListener('task-added', (e) => {
      let { section, task } = e.detail;

      // Pull due date from the task and get the date from helper
      const due = task.getAttribute('due');
      const suggested = getSectionFromDate(due);

      //Check for the new selection, is it will Overdue or Today chnage it 
      section = (suggested === 'Overdue') ? 'Today' : suggested;

      task.classList.remove('today', 'upcoming', 'backlog', 'completed', 'overdue');
      task.classList.add(suggested.toLowerCase());
      console.log('Classes on task:', task.className);
      if (suggested === 'Overdue') {
        task.classList.add('overdue');
      }

      const board = dashboard.shadowRoot;
      const sectionEl = [...board.querySelectorAll('task-section')]
        .find(s => s.getAttribute('title') === section);
      sectionEl?.shadowRoot.querySelector('.task-list')?.appendChild(task);
    });


    // Show status modal when a task is clicked to move the task
    dashboard?.addEventListener('edit-task-status', (e) => {
      const { task } = e.detail;
      statusModal?.show(task);
    });

    // When status is changed, move task to correct section
    statusModal?.addEventListener('status-changed', (e) => {
      const { newSection, task } = e.detail;

      task.classList.remove('today', 'upcoming', 'backlog', 'completed', 'overdue');
      task.classList.add(newSection.toLowerCase());

      const board = dashboard.shadowRoot;
      const targetSection = [...board.querySelectorAll('task-section')]
        .find(section => section.getAttribute('title') === newSection);

      targetSection?.shadowRoot.querySelector('.task-list')?.appendChild(task);
    });

    header?.addEventListener('search-changed', (e) => {
      dashboard?.dispatchEvent(new CustomEvent('search-updated', {
        detail: e.detail,
        bubbles: true,
        composed: true
      }));
    });

    //For mock data in dashboard, to get the colors on load
    this.shadowRoot.querySelector('task-dashboard')
      .addEventListener('dashboard-ready', () => {
        const board = dashboard.shadowRoot;

        [...board.querySelectorAll('task-item')].forEach(task => {
          const due = task.getAttribute('due');
          const suggested = getSectionFromDate(due);

          console.log(suggested);

          task.classList.remove('today', 'upcoming', 'backlog', 'completed', 'overdue');

          // Apply section-based class
          const className = (suggested === 'Overdue') ? 'overdue' : suggested.toLowerCase();
          task.classList.add(className);
          const parentSection = task.closest('task-section')?.getAttribute('title');
          if (parentSection === 'Completed') {
            task.classList.remove('today', 'upcoming', 'backlog', 'overdue');
            task.classList.add('completed');
          }

        });

      });



  }

  async loadComponents() {
    await Promise.all([
      import('./task-header.js'),
      import('./task-dashboard.js'),
      import('./task-modal.js'),
      import('./task-status-modal.js')
    ]);
  }
}

customElements.define('task-app', TaskApp);
