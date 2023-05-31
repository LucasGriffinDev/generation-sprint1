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

tasks.forEach((task) => {});

// delete task
