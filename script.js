const select = document.querySelector('#status-select');
  select.addEventListener('change', () => {
    const selectedOption = select.options[select.selectedIndex];
    select.className = selectedOption.className;
  });
  
    const button = document.getElementById('modal-open-button');
    button.addEventListener('click', () => {
      console.log('clicked');
    });
  });
  