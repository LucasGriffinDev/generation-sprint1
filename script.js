// Selectors for the elements we'll be interacting with
const select = document.querySelector('#status-select');
const newContainer = document.getElementById('new-container');
const taskContainer = document.getElementById('task-container');
const taskForm = document.querySelector('#task-form');
const modalNameInput = document.querySelector('#name');
const modalAssignedToInput = document.querySelector('#assigned-to');
const modalDateInput = document.querySelector('#date');
const modalStatusSelect = document.querySelector('#status-select');
const modalDescriptionInput = document.querySelector('#description');
let currentTaskIndex;

// Event listener for select change
select.addEventListener('change', () => {
  const selectedOption = select.options[select.selectedIndex];
  select.className = selectedOption.className + ' form-select';
});

// Event listener for form submission
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let name = modalNameInput.value;
  let assignedTo = modalAssignedToInput.value;
  let date = modalDateInput.value;
  let statusSelected = modalStatusSelect.value;
  let description = modalDescriptionInput.value;

  if (currentTaskIndex !== undefined) {
    // If a task is being edited, update it
    tasks[currentTaskIndex] = {
      name: name,
      assignedTo: assignedTo,
      dueDate: date,
      status: statusSelected,
      description: description,
    };

    // Clear the currentTaskIndex
    currentTaskIndex = undefined;
  } else {
    // If no task is being edited, create a new one
    let newTask = {
      name: name,
      assignedTo: assignedTo,
      dueDate: date,
      status: statusSelected,
      description: description,
    };

    tasks.push(newTask);
  }

  taskForm.reset();
  renderTasks(tasks);
  // close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
  saveTasks();

  modal.hide();
});

// Array of tasks
let tasks;

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
} else {
  tasks = [
    {
      name: 'Task 1',
      assignedTo: 'John Doe',
      dueDate: '2018-03-24',
      status: 'IN PROGRESS',
      description: 'This is a sample task 1.',
    },
    {
      name: 'Task 2',
      assignedTo: 'Jane Doe',
      dueDate: '2019-01-24',
      status: 'COMPLETED',
      description: 'This is a sample task 2.',
    },
    {
      name: 'Task 3',
      assignedTo: 'John Smith',
      dueDate: '2020-01-24',
      status: 'REVIEW',
      description: 'This is a sample task 3.',
    },
    {
      name: 'Task 4',
      assignedTo: 'Jane Smith',
      dueDate: '2021-01-24',
      status: 'NOT STARTED',
      description: 'This is a sample task 4.',
    },
  ];
}
// Save tasks to local storage

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks

const getTaskStatusClass = (status) => {
  switch (status) {
    case 'IN PROGRESS':
      return 'bg-warning';
    case 'COMPLETED':
      return 'bg-success';
    case 'REVIEW':
      return 'bg-primary';
    case 'NOT STARTED':
      return 'bg-danger';
  }
};

const renderTasks = (tasks) => {
  taskContainer.innerHTML = '';

  tasks.forEach(({ name, assignedTo, dueDate, status, description }) => {
    taskContainer.innerHTML += `
    <div class="table-responsive">
  <table class="table table-bordered bg-light mt-2 rounded-lg">
    <thead>
      <tr>
        <th>Status</th>
        <th>Name</th>
        <th>Assigned to</th>
        <th>Due date</th>
        <th></th> <!-- Empty column for buttons on small screens -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="text-white text-center rounded-2 p-1 ${getTaskStatusClass(
            status
          )}">
            ${status}
          </div>
        </td>
        <td class="text-size-lg">${name}</td>
        <td>
          <div>${assignedTo}</div>
        </td>
        <td>
          <p>${dueDate}</p>
        </td>
        <td class="text-end">
          <button class="btn btn-secondary m-2 edit-btn modal-open-button" data-bs-toggle="modal" data-bs-target="#myModal" data-task-name="${name}">
            Edit
          </button>
          <button class="btn btn-warning delete-btn" data-task-name="${name}">Delete</button>
        </td>
      </tr>
      <tr>
        <td colspan="5" class="fw-bold">
          Description:
        </td>
      </tr>
      <tr>
        <td colspan="5" class="description text-size-lg">
          <span>${description}</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  
      `;
  });
};

newContainer.addEventListener('click', function (e) {
  // Handle new
  if (e.target.classList.contains('new-btn')) {
    currentTaskIndex = undefined;
    modalNameInput.value = '';
    modalAssignedToInput.value = '';
    modalDateInput.value = '';
    modalStatusSelect.value = '';
    modalStatusSelect.backgroundColor = '#aa0055';
    modalStatusSelect.dispatchEvent(new Event('change'));
    modalDescriptionInput.value = '';
    renderTasks(tasks);
  }
});

// Event listener for task container
taskContainer.addEventListener('click', function (e) {
  // Handle delete
  if (e.target.classList.contains('delete-btn')) {
    let taskName = e.target.dataset.taskName;

    let index = tasks.findIndex((task) => task.name === taskName);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    saveTasks();
    renderTasks(tasks);
  }
  // Handle edit
  if (e.target.classList.contains('edit-btn')) {
    const taskName = e.target.dataset.taskName;
    currentTaskIndex = tasks.findIndex((task) => task.name === taskName);

    let task = tasks.find((task) => task.name === taskName);
    if (task) {
      modalNameInput.value = task.name;
      modalAssignedToInput.value = task.assignedTo;
      modalDateInput.value = task.dueDate;
      modalStatusSelect.value = task.status;
      modalStatusSelect.dispatchEvent(new Event('change'));
      modalDescriptionInput.value = task.description;
    }
    renderTasks(tasks);
  }
});

renderTasks(tasks);
