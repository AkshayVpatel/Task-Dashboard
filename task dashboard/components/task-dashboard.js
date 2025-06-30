class TaskBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListener('search-updated', (e) => {
      const query = e.detail;

      this.shadowRoot.querySelectorAll('task-item').forEach(item => {
        const title = item.getAttribute('title')?.toLowerCase() || '';
        const desc = item.getAttribute('description')?.toLowerCase() || '';
        const match = title.includes(query) || desc.includes(query);
        item.style.display = match ? 'block' : 'none';
      });
    });

    this.loadSectionComponent().then(() => {
      requestAnimationFrame(() => {
        this.dispatchEvent(new CustomEvent('dashboard-ready', {
          bubbles: true,
          composed: true
        }));
      });
    });

  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          gap: 1rem;
          padding: 1rem 2rem;
          background: #f9fafb;
          flex: 1;
          overflow-x: auto;
        }
      </style>

    <task-section title="Today">
      <task-item title="Write test cases" description="Write test cases for all the components using Jest" due="2025-06-28"></task-item>
      <task-item title="Dynamic color styling" description="Add style tasks based on due date" due="2025-06-30"></task-item>
    </task-section>

    <task-section title="Upcoming">
      <task-item title="ADA accessibility" description="Add ARIA labels and keyboard support to all components" due="2025-07-01"></task-item>
      <task-item title="Add filters" description="Add filters to all the coulumns" due="2025-07-02"></task-item>
    </task-section>

    <task-section title="Backlog">
      <task-item title="Drag and drop tasks" description="Allow reordering between sections using drag and drop" due=""></task-item>
      <task-item title="Data persistence" description="Save tasks using localStorage or create db" due=""></task-item>
      <task-item title="Validations" description="Add validations to the Add task form" due=""></task-item>
    </task-section>

   <task-section title="Completed">
    <task-item title="Built with Custom Elements" description="Use web standards for component structure" due="2025-06-27" class="completed"></task-item>
    <task-item title="Shadow DOM styling" description="Scoped styles using :host() selectors" due="2025-06-27" class="completed"></task-item>
    <task-item title="Async module loading" description="Use dynamic imports to load components on demand" due="2025-06-28" class="completed"></task-item>
    <task-item title="Event-driven architecture" description="Communicattion between components using custom events" due="2025-06-28" class="completed"></task-item>
    <task-item title="Modular dashboard layout" description="Structure app with clean separation of parts" due="2025-06-29" class="completed"></task-item>
    <task-item title="Real-time task search" description="Add a live filter with instant results on header" due="2025-06-29" class="completed"></task-item>
    <task-item title="Mock task styling" description="Apply colors to hardcoded tasks on load" due="2025-06-29" class="completed"></task-item>
    <task-item title="Create Utils" description="Create util to handle dates along with current date" due="2025-06-29" class="completed"></task-item>
  </task-section>

    `;

    this.loadSectionComponent();
    import('./task-item.js');
  }

  async loadSectionComponent() {
    await import('./task-section.js');
  }
}

customElements.define('task-dashboard', TaskBoard);
