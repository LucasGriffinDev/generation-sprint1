const select = document.querySelector('#status-select');
select.addEventListener('change', () => {
  const selectedOption = select.options[select.selectedIndex];
  if (selectedOption.className == 'bg-warning') {
    select.className = selectedOption.className + ' form-select text-gray';
  } else {
    select.className = selectedOption.className + ' form-select text-white';
  }
});
