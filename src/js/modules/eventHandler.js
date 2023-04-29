import { editTextAreaData, changeCharValue } from './buttonActions.js';

export function addEventHandler(keyboardObj) {
  const { keysChar, keysShift, keys} = keyboardObj;
  const textArea = document.querySelector('.textarea');
  const buttons = document.querySelectorAll('.key');

  textArea.addEventListener('blur', (e) => {
    e.preventDefault();
    textArea.focus();
  });


  document.addEventListener('click', (e) => {
    let target = e.target;
    for (let i = 0; i < buttons.length; i += 1) {
      if (target.id == buttons[i].id) {

        if (keysChar.includes(buttons[i].id)) {
          editTextAreaData(textArea, buttons[i]);
        }
      }
    }
  });

  textArea.addEventListener('keydown', (e) => {
    e.preventDefault();

    for (let i = 0; i < buttons.length; i += 1) {
      if (e.code == buttons[i].id) {
        buttons[i].classList.add('key--active');

        if (keysChar.includes(buttons[i].id)) {
          editTextAreaData(textArea, buttons[i]);
        } else {
          if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
            changeCharValue(keys, keysShift, buttons);
          }
        }
      }
    }
  });

  textArea.addEventListener('keyup', (e) => {
    e.preventDefault();
    for (let i = 0; i < buttons.length; i += 1) {
      if (e.code == buttons[i].id) {
        buttons[i].classList.remove('key--active');
      }
    }
  });
}