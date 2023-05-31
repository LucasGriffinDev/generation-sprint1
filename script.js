const select = document.querySelector('#status-select');
select.addEventListener('change', () => {
  const selectedOption = select.options[select.selectedIndex];
  if (selectedOption.className == 'bg-warning') {
    select.className = selectedOption.className + ' form-select text-gray';
  } else {
    select.className = selectedOption.className + ' form-select text-white';
  }
});

//  json obect
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
