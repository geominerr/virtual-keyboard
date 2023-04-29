import { editTextAreaData, changeCharValue } from './buttonActions.js';

const keyboardState = {
  language: 'en',
  isCapsPress: false,
  isShiftPress: false,
  isCtrlPress: false,
  isAltPress: false,

  pressKey(keyCode) {
    if (keyCode == 'CapsLock') {
      this.isCapsPress = this.isCapsPress ? false : true;
    }
    if (keyCode == 'ShiftLeft' || keyCode == 'ShiftRight') {
      this.isShiftPress = true;
    }
    if (keyCode == 'ControlLeft' || keyCode == 'ControlRight') {
      this.isCtrlPress = true;
    }
    if (keyCode == 'AltLeft' || keyCode == 'AlrRight') {
      this.isAltPress = true;
    }
  },

  unPressKey(keyCode) {
    if (keyCode == 'ShiftLeft' || keyCode == 'ShiftRight') {
      this.isShiftPress = false;
    }
    if (keyCode == 'ControlLeft' || keyCode == 'ControlRight') {
      this.isCtrlPress = false;
    }
    if (keyCode == 'AltLeft' || keyCode == 'AlrRight') {
      this.isAltPress = false;
    }
  }

};

export function addEventHandler(keyboardObj) {
  const { keysChar, keysShift, keys } = keyboardObj;
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

    console.log(keyboardState.isAltPress);
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