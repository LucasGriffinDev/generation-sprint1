const select = document.querySelector('#status-select');
const taskContainer = document.getElementById('task-container');
const taskForm = document.querySelector('#task-form');

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
  let status = document.querySelector('#status').value;
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

  // re-render tasks if necessary

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
  tasks.forEach((task) => {
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
                  DONE
                </div>
              </td>
              <td>${task.name}</td>
              <td>
                <div>Rowan</div>
              </td>
              <td>
                <p>22/05/2023</p>
              </td>
            </tr>
            <tr>
              <td class="fw-bold">
                Description:

              </td>
              <td colspan="2" class="description">
                <span>Finish the wireframe</span>
              </td>
              <td colspan="1">
                <button class="btn btn-secondary float-end mx-2 modal-open-button"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                >Edit</button>

                  
                </button>
                <button class="btn btn-warning float-end">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
  });
};

renderTasks(tasks);

// delete task
