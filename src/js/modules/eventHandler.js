export function addEventHandler() {
  const textArea = document.querySelector('.textarea');
  const keys = document.querySelectorAll('.key');

  textArea.addEventListener('blur', (e)=> {
    e.preventDefault();
    textArea.focus();
  })


  document.addEventListener('click', (e) => {
    let target = e.target;

    if (target.classList.contains('key')) {
      textArea.value += target.innerHTML;
    }
  })

  textArea.addEventListener('keydown', (e) => {
    e.preventDefault();

    for (let i = 0; i < keys.length; i += 1) {
      if (e.code == keys[i].id) {
        keys[i].classList.add("key--active");
        textArea.value += keys[i].innerHTML;
      }
    }
  });

  textArea.addEventListener('keyup', (e) => {
    e.preventDefault();
    for (let i = 0; i < keys.length; i += 1) {
      if (e.code == keys[i].id) {
        keys[i].classList.remove("key--active");
      }
    }
  })
};