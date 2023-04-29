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
  const { keysChar, keys } = keyboardObj;
  const textArea = document.querySelector('.textarea');
  const buttons = document.querySelectorAll('.key');
  const shiftLeft = document.getElementById('ShiftLeft');
  const shiftRight = document.getElementById('ShiftRight');

  textArea.addEventListener('blur', (e) => {
    e.preventDefault();
    textArea.focus();
  });


  document.addEventListener('click', (e) => {
    let target = e.target;

    if (target.id == 'ShiftLeft' || target.id == 'ShiftRight') {
      if (keyboardState.isShiftPress) {
        if (target.classList.contains('key--active')) {
          target.classList.remove('key--active');
          changeCharValue(keys, buttons, keyboardState);
          keyboardState.unPressKey(target.id);
        } else {
          if (target.id == 'ShiftLeft') {
            shiftLeft.classList.add('key--active');
            shiftRight.classList.remove('key--active');
          } else {
            shiftRight.classList.add('key--active');
            shiftLeft.classList.remove('key--active');
          }
        }
      } else {
        changeCharValue(keys, buttons, keyboardState);
        keyboardState.pressKey(target.id);

        if (target.id == 'ShiftLeft') {
          shiftLeft.classList.add('key--active');
        } else {
          shiftRight.classList.add('key--active');
        }
      }

    }

    for (let i = 0; i < buttons.length; i += 1) {
      if (target.id == buttons[i].id) {

        if (keysChar.includes(buttons[i].id)) {
          editTextAreaData(textArea, buttons[i]);

          if (keyboardState.isShiftPress) {
            changeCharValue(keys, buttons, keyboardState);
            keyboardState.unPressKey('ShiftLeft');
            shiftLeft.classList.remove('key--active');
            shiftRight.classList.remove('key--active');
          }
        }
      }
    }


    console.log(keyboardState.isShiftPress);
  });


  textArea.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log('blaaaaaaa');
    for (let i = 0; i < buttons.length; i += 1) {
      if (e.code == buttons[i].id) {
        buttons[i].classList.add('key--active');

        if (keysChar.includes(buttons[i].id)) {
          editTextAreaData(textArea, buttons[i]);
        } else {
          if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
            if (!keyboardState.isShiftPress)
              changeCharValue(keys, buttons, keyboardState);
            keyboardState.pressKey(e.code);
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

    if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
      changeCharValue(keys, buttons, keyboardState);
      keyboardState.unPressKey(e.code);
    }
  });
}