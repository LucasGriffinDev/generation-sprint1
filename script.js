class TaskManager {
  constructor () {
    this._tasks = []
  }
  loadTasks() {
    if (localStorage.getItem('tasks')) {
      let item = JSON.parse(localStorage.getItem('tasks'));
      for(let i in item){
        console.log(item[i])
        this.addTask(item[i]._name, item[i]._assigned, item[i]._date, item[i]._status, item[i]._description)
      }
      console.log(this._tasks)
    }
  }
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }
  addTask(name, assigned, date, status, description) {
      let task = new Task(name, assigned, date, status, description)
      this._tasks.push(task)
  }
  editTask(index, task) {}
  deleteTask(index) {
      if (index !== -1) {
          this._tasks.splice(index, 1);
        }
  }
  getAllTasks() {
      return this._tasks
  }
  getTask(index) {
      return this._tasks[index]
  }
  setStatus(index, status) {
      // this._tasks[index].status = status;
    if(typeof index === 'number' && index < this._tasks.length && ['IN PROGRESS', 'COMPLETED', 'REVIEW', 'NOT STARTED'].includes(status)){
      this._tasks[index].status = status
    }
  }
}

class Task {
  constructor (name, assigned, date, status, description) {
    this._name = name;
    this._assigned = assigned;
    this._date = date;
    this._status = status;
    this._description = description;
    this._taskStatusClass = Task.taskStatusClass(status)
  }
  get name(){
      return this._name;
  }
  get assigned(){
      return this._assigned;
  }
  get date(){
      return this._date;
  }
  get status(){
      return this._status;
  }
  get description(){
      return this._description;
  }
  get item(){
    return {
      name: this._name,
      assigned: this._assigned,
      date: this._date,
      status: this._status,
      description: this._description
    };
  }
  static taskStatusClass(status) {
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
  }
  set name(name){
    if(typeof name === 'string'){
      this._name = name;
    }
  }
  set assigned(assigned){
    if(typeof assigned === 'string'){
      this._assigned = assigned;
    }
  }
  set date(date){
    if(date.length == 10 && Date.parse(date)){
      this._date = date;
    }
  }
  set status(status){
    if(['IN PROGRESS', 'COMPLETED', 'REVIEW', 'NOT STARTED'].includes(status)){
      this._status = status
    }
  }
  set description(description){
    if(typeof description === 'string'){
      this._description = description;
    }
  }
  set item(item){
      this._name = item.name;
      this._assigned = item.assigned;
      this._date = item.date;
      this._status = item.status;
      this._description = item.description;
    }
}

// Task class creation
const taskList = new TaskManager();
taskList.loadTasks();


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
    taskList.getTask(currentTaskIndex).item = {
      name: name,
      assigned: assignedTo,
      date: date,
      status: statusSelected,
      description, description
    };

    // Clear the currentTaskIndex
    currentTaskIndex = undefined;
  } else {
    // If no task is being edited, create a new one
    taskList.addTask(name, assignedTo, date, statusSelected, description);
  }

  taskForm.reset();
  renderTasks(taskList);
  // close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
  taskList.saveTasks();

  modal.hide();
});


const renderTasks = (taskList) => {
  console.log('list', taskList.getAllTasks()[0])
  taskContainer.innerHTML = '';

  for(let i in taskList.getAllTasks()){
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
          <div class="text-white text-center rounded-2 p-1 ${taskList.getAllTasks()[i]._taskStatusClass}">
            ${taskList.getAllTasks()[i].status}
          </div>
        </td>
        <td class="text-size-lg">${taskList.getAllTasks()[i].name}</td>
        <td>
          <div>${taskList.getAllTasks()[i].assigned}</div>
        </td>
        <td>
          <p>${taskList.getAllTasks()[i].date}</p>
        </td>
        <td class="text-end">
          <button class="btn btn-secondary m-2 edit-btn modal-open-button" data-bs-toggle="modal" data-bs-target="#myModal" data-task-name="${taskList.getAllTasks()[i].name}" data-task-id="${i}">
            Edit
          </button>
          <button class="btn btn-warning delete-btn" data-task-name="${taskList.getAllTasks()[i].name}" data-task-id="${i}">Delete</button>
        </td>
      </tr>
      <tr>
        <td colspan="5" class="fw-bold">
          Description:
        </td>
      </tr>
      <tr>
        <td colspan="5" class="description text-size-lg">
          <span>${taskList.getAllTasks()[i].description}</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  
      `;
  };
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
    renderTasks(taskList);
  }
});

// Event listener for task container
taskContainer.addEventListener('click', function (e) {
  // Handle delete
  if (e.target.classList.contains('delete-btn')) {
    // let taskName = e.target.dataset.taskName;
    let index = e.target.dataset.taskId;

    // let index = taskList.findIndex((task) => task.name === taskName);
    taskList.deleteTask(index);
    taskList.saveTasks();
    renderTasks(taskList);
  }
  // Handle edit
  if (e.target.classList.contains('edit-btn')) {
    // const taskName = e.target.dataset.taskName;
    // currentTaskIndex = taskList.findIndex((task) => task.name === taskName);
    currentTaskIndex = e.target.dataset.taskId;

    // let task = taskList.find((task) => task.name === taskName);
    let task = taskList.getTask(currentTaskIndex);
    console.log('cTI', currentTaskIndex)
    console.log('task', task)
    if (task) {
      modalNameInput.value = task.name;
      modalAssignedToInput.value = task.assigned;
      modalDateInput.value = task.date;
      modalStatusSelect.value = task.status;
      modalStatusSelect.dispatchEvent(new Event('change'));
      modalDescriptionInput.value = task.description;
    }
    renderTasks(taskList);
  }
});

renderTasks(taskList);

