import { editTextAreaData, changeCharValue, changeLetterCase, changeLanguage, copyText, selectAllText, pasteText } from './buttonActions.js';

export function addEventHandler(keyboardObj, keyboardState) {
  const { keysChar, keys } = keyboardObj;
  const textArea = document.querySelector('.textarea');
  const buttons = document.querySelectorAll('.key');
  const shiftLeft = document.getElementById('ShiftLeft');
  const shiftRight = document.getElementById('ShiftRight');
  const capsLock = document.getElementById('CapsLock');
  let clipBoard = '';

  textArea.addEventListener('blur', (e) => {
    e.preventDefault();
    textArea.focus();
  });

  document.addEventListener('click', (e) => {
    let target = e.target;

    if (target.id == 'CapsLock') {
      changeLetterCase(buttons);
      if (!target.classList.contains('key--active')) {
        target.classList.add('key--active');
        keyboardState.pressKey(target.id);
      } else {
        target.classList.remove('key--active');
        keyboardState.pressKey(target.id);
      }
    }

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
  });

  textArea.addEventListener('keydown', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.code == 'CapsLock') {
      changeLetterCase(buttons);
      if (!capsLock.classList.contains('key--active')) {
        capsLock.classList.add('key--active');
        keyboardState.pressKey(e.code);
      } else {
        capsLock.classList.remove('key--active');
        keyboardState.pressKey(e.code);
      }
    }

    if (e.code == 'ControlLeft') {
      keyboardState.pressKey(e.code);
    }

    if (e.code == 'AltLeft') {
      if (keyboardState.isCtrlPress) {
        keyboardState.changeLanguage();
        changeLanguage(keys, buttons, keyboardState);
        keyboardState.saveLanguageToLocalStorage();
      }
    }

    if (e.code == 'KeyA') {
      if (keyboardState.isCtrlPress) {
        selectAllText(textArea);
      }
    }

    if (e.code == 'KeyC') {
      if (keyboardState.isCtrlPress) {
        clipBoard = copyText(textArea, clipBoard);
      }
    }

    if (e.code == 'KeyV') {
      if (keyboardState.isCtrlPress) {
        pasteText(textArea, clipBoard);
      }
    }

    for (let i = 0; i < buttons.length; i += 1) {
      if (e.code == buttons[i].id) {
        buttons[i].classList.add('key--active');

        if (keysChar.includes(buttons[i].id)) {
          if (!keyboardState.isCtrlPress) {
            editTextAreaData(textArea, buttons[i]);
          }
        } else {
          if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
            if (!keyboardState.isShiftPress) {
              changeCharValue(keys, buttons, keyboardState);
              keyboardState.pressKey(e.code);
            }
          }
        }
      }
    }
  });

  textArea.addEventListener('keyup', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (let i = 0; i < buttons.length; i += 1) {
      if (e.code == buttons[i].id) {
        buttons[i].classList.remove('key--active');
      }
    }

    if (e.code == 'ControlLeft' || e.code == 'ControlRight') {
      keyboardState.unPressKey(e.code);
    }

    if (keyboardState.isCapsPress) {
      capsLock.classList.add('key--active');
    }

    if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
      changeCharValue(keys, buttons, keyboardState);
      keyboardState.unPressKey(e.code);
    }
  });

  textArea.addEventListener('input', (e) => {
    e.stopPropagation();
    console.log('bla');
  });
}