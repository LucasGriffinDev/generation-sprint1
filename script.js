// Selectors for the elements we'll be interacting with
const select = document.querySelector('#status-select');
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
  if (selectedOption.className == 'bg-warning') {
    select.className = selectedOption.className + ' form-select text-gray';
  } else {
    select.className = selectedOption.className + ' form-select text-white';
  }
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
});

// Array of tasks

const tasks = [
  {
    name: 'Task 1',
    assignedTo: 'John Doe',
    dueDate: '2021-03-24',
    status: 'In Progress',
    description: 'This is a sample task.',
  },
  {
    name: 'Task 2',
    assignedTo: 'Jane Doe',
    dueDate: '2021-01-24',
    status: 'completed',
    description: 'This is a sample task.',
  },
];

// Render tasks

const renderTasks = (tasks) => {
  taskContainer.innerHTML = '';

  tasks.forEach(({ name, assignedTo, dueDate, status, description }) => {
    taskContainer.innerHTML += `
  <div class="table-responsive">
        <table class="table table-bordered bg-light mt-2">
          <thead>
            <tr>
              <th class="col-1">Status</th>
              <th class="col-2">Name</th>
              <th class="col-2">Assigned to</th>
              <th class="col-1">Due date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="bg-success text-white text-center rounded-2 p-1">
                  ${status}
                </div>
              </td>
              <td>${name}</td>
              <td>
                <div>${assignedTo}</div>
              </td>
              <td>
                <p>${dueDate}</p>
              </td>
            </tr>
            <tr>
              <td class="fw-bold">
                Description:

              </td>
              <td colspan="2" class="description">
                <span>${description}</span>
              </td>
              <td colspan="1">
              <button class="btn btn-secondary float-end mx-2 edit-btn modal-open-button"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              data-task-name="${name}" <!-- make sure this attribute is correctly assigned -->
            Edit</button>

                  
                </button>
                <button class="btn btn-warning float-end delete-btn" data-task-name="${name}">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
  });
};

// Event listener for task container
taskContainer.addEventListener('click', function (e) {
  // Handle delete
  if (e.target.classList.contains('delete-btn')) {
    let taskName = e.target.dataset.taskName;

    let index = tasks.findIndex((task) => task.name === taskName);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
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
      modalDescriptionInput.value = task.description;
    }
    renderTasks(tasks);
  }
});

renderTasks(tasks);
