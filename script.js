// Customising modal contents
var exampleModal = document.getElementById('myModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
  let taskNum = event.relatedTarget.getAttribute('data-edit')

  if(taskNum.length > 0){
    myModal.querySelector('.modal-title').textContent = 'Edit Task'
    myModal.querySelector('#name').value = tasks[taskNum].name
    myModal.querySelector('#assigned-select').value = tasks[taskNum].assignedTo
    myModal.querySelector('#date').value = tasks[taskNum].dueDate
    myModal.querySelector('#status-select').value = tasks[taskNum].status
    myModal.querySelector('#status-select').dispatchEvent(new Event('change'))
    myModal.querySelector('#description').value = tasks[taskNum].description
  }
})

const select = document.querySelector('#status-select');
select.addEventListener('change', () => {
  const selectedOption = select.options[select.selectedIndex];
  select.className = selectedOption.className + ' form-select';
  // if (selectedOption.className == 'bg-warning') {
  //   select.className = selectedOption.className + ' form-select text-gray';
  // } else {
  //   select.className = selectedOption.className + ' form-select text-white';
  // }
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

//  json obect
// rowan task
submitTask = () => {
  let taskItem = {
    name: document.getElementById('name').value,
    assignedTo: document.getElementById('assigned-select').value,
    dueDate: document.getElementById('date').value,
    status: document.getElementById('status-select').value,
    description: document.getElementById('description').value
  }
  // console.log(taskItem)
  tasks.push(taskItem)
  console.log(tasks)
}

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
    name: 'Wireframe',
    assignedTo: 'Rowan',
    dueDate: '2023-05-22',
    status: 'done',
    description: 'Finish the wireframe.',
  },
  {
    name: 'Overall aesthetic',
    assignedTo: 'Matt',
    dueDate: '2023-05-22',
    status: 'in progress',
    description: 'Design and implement the overall aesthetic',
  },
  {
    name: 'Navbar',
    assignedTo: 'Rowan',
    dueDate: '2023-05-22',
    status: 'review',
    description: 'design and implement navbar',
  },
  {
    name: 'Task list',
    assignedTo: 'Lucas',
    dueDate: '2023-05-22',
    status: 'todo',
    description: 'write code for task lists',
  },
  {
    name: 'Task modal',
    assignedTo: 'Lucas',
    dueDate: '2023-05-22',
    status: 'done',
    description: 'Design and implement code for new/edit task modal',
  },
];

//render tasks

tasks.forEach((task) => {});

// delete task
