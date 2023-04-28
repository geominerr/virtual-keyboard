import { editTextAreaData } from "./buttonActions.js";

export function addEventHandler(keyboardObj) {
  const { keysChar } = keyboardObj;
  const textArea = document.querySelector('.textarea');
  const keys = document.querySelectorAll('.key');

  textArea.addEventListener('blur', (e) => {
    e.preventDefault();
    textArea.focus();
  })


  document.addEventListener('click', (e) => {
    let target = e.target;
    for (let i = 0; i < keys.length; i += 1) {
      if (target.id == keys[i].id) {

        if (keysChar.includes(keys[i].id)) {
          editTextAreaData(textArea, keys[i]);
        }
      }
    }
  })

  textArea.addEventListener('keydown', (e) => {
    e.preventDefault();

    for (let i = 0; i < keys.length; i += 1) {
      if (e.code == keys[i].id) {
        keys[i].classList.add("key--active");

        if (keysChar.includes(keys[i].id)) {
          editTextAreaData(textArea, keys[i]);
        }
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