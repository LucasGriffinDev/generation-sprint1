const select = document.querySelector('#status-select');
const taskContainer = document.getElementById('task-container');
const taskForm = document.querySelector('#task-form');
const deleteBtn = document.querySelector('.delete-btn');

select.addEventListener('change', () => {
  const selectedOption = select.options[select.selectedIndex];
  if (selectedOption.className == 'bg-warning') {
    select.className = selectedOption.className + ' form-select text-gray';
  } else {
    select.className = selectedOption.className + ' form-select text-white';
  }
});

taskForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent form from submitting normally

  // get form values
  let name = document.querySelector('#name').value;
  let assignedTo = document.querySelector('#assigned-to').value;
  let date = document.querySelector('#date').value;
  let status = document.querySelector('#status-select').value; // note the change here from '#status' to '#status-select'
  let description = document.querySelector('#description').value;

  // validate form values here if necessary

  // create new task
  let newTask = {
    name: name,
    assignedTo: assignedTo,
    dueDate: date,
    status: status,
    description: description,
  };

  // add new task to tasks array
  tasks.push(newTask);

  // clear form fields after submit
  taskForm.reset();

  // re-render tasks
  renderTasks(tasks);

  // close modal
  console.log(tasks);
});

//  json obect
// rowan task
const taskJSON = {
  name: 'Task 1',
  assignedTo: 'John Doe',
  dueDate: '2021-03-24',
  status: 'In Progress',
  description: 'This is a sample task.',
};

//array of tasks

const tasks = [
  {
    name: 'Task 1',
    assignedTo: 'John Doe',
    dueDate: '2021-03-24',
    status: 'In Progress',
    description: 'This is a sample task.',
  },
];

//render tasks

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
                <button class="btn btn-secondary float-end mx-2 modal-open-button"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                >Edit</button>

                  
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

// add event listener to task container
taskContainer.addEventListener('click', function (e) {
  // check if clicked element is a delete button
  if (e.target.classList.contains('delete-btn')) {
    // get the task name from the element's dataset
    const taskName = e.target.dataset.taskName;

    // find the task in the tasks array and remove it
    let index = tasks.findIndex((task) => task.name === taskName);
    if (index !== -1) {
      tasks.splice(index, 1);
    }

    // re-render tasks
    renderTasks(tasks);
  }
});

renderTasks(tasks);

// delete task
