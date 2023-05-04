function getPositionCursor(textarea) {
  const startCursor = textarea.selectionStart;
  const endCursor = textarea.selectionEnd;

  if (startCursor !== endCursor) {
    return [startCursor, endCursor];
  }
  return startCursor;
}

function changeTextAreaValue(textarea, position, char) {
  let { value, selectionStart, selectionEnd } = textarea;
  if (position.length) {
    const textBefore = value.substring(0, position[0]);
    const textAfter = value.substring(position[1], value.length);

    value = textBefore + char + textAfter;
    selectionStart = position[0] + 1;
    selectionEnd = selectionStart;
  } else if (!position.length && position !== value.length - 1) {
    const textBefore = value.substring(0, position);
    const textAfter = value.substring(position, value.length);

    value = textBefore + char + textAfter;
    selectionStart = position + 1;
    selectionEnd = selectionStart;
  } else {
    value += char;
  }

  return { value, selectionStart, selectionEnd };
}
function editTextAreaData(textarea, key) {
  const buttonEdit = ['Enter', 'Tab', 'Space', 'Backspace', 'Delete'];
  const positionCursor = getPositionCursor(textarea);

  if (!buttonEdit.includes(key.id)) {
    changeTextAreaValue(textarea, positionCursor, key.innerText);
  } else {
    if (key.id === 'Enter') {
      changeTextAreaValue(textarea, positionCursor, '\n');
    }
    if (key.id === 'Tab') {
      changeTextAreaValue(textarea, positionCursor, '\t');
    }
    if (key.id === 'Space') {
      changeTextAreaValue(textarea, positionCursor, ' ');
    }
    if (key.id === 'Backspace') {
      let { value, selectionStart, selectionEnd } = textarea;

      if (positionCursor.length) {
        const positionStart = positionCursor[0];
        const positionEnd = positionCursor[1];
        const textBefore = value.substring(0, positionStart);
        const textAfter = value.substring(positionEnd, value.length);

        value = textBefore + textAfter;
        selectionStart = positionStart;
        selectionEnd = selectionStart;
      } else if (!positionCursor.length && positionCursor !== value.length - 1
        && positionCursor !== 0) {
        const textBefore = value.substring(0, positionCursor);
        const textAfter = value.substring(positionCursor, value.length);

        value = textBefore.substring(0, textBefore.length - 1) + textAfter;
        selectionStart = positionCursor - 1;
        selectionEnd = selectionStart;
      }

      return { value, selectionStart, selectionEnd };
    }
    if (key.id === 'Delete') {
      let { value, selectionStart, selectionEnd } = textarea;

      if (positionCursor.length) {
        const positionStart = positionCursor[0];
        const positionEnd = positionCursor[1];

        const textBefore = value.substring(0, positionStart);
        const textAfter = value.substring(positionEnd, value.length);

        value = textBefore + textAfter;
        selectionStart = positionStart;
        selectionEnd = selectionStart;
      } else if (!positionCursor.length && positionCursor !== value.length) {
        const textBefore = value.substring(0, positionCursor);
        const textAfter = value.substring(positionCursor + 1, value.length);

        value = textBefore + textAfter;
        selectionStart = positionCursor;
        selectionEnd = selectionStart;
      }

      return { value, selectionStart, selectionEnd };
    }
  }

  return 'End fucntion';
}

function changeLetterCase(elemKeys) {
  const alphabetEnLowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetEnUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabetRuLowerCase = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const ingnoreButtons = ['Tab', 'Enter', 'Backspace', 'Delete', 'ControlLeft', 'ControlRight',
    'MetaLeft', 'AltLeft', 'AltRight', 'ShiftLeft', 'ShiftRight', 'Delete', 'CapsLock'];

  for (let i = 0; i < elemKeys.length; i += 1) {
    const button = elemKeys[i];
    if (!ingnoreButtons.includes(elemKeys[i].id)) {
      if (alphabetEnLowerCase.includes(elemKeys[i].innerText)) {
        button.innerText = elemKeys[i].innerText.toUpperCase();
      } else if (alphabetEnUpperCase.includes(elemKeys[i].innerText)) {
        button.innerText = elemKeys[i].innerText.toLowerCase();
      } else if (alphabetRuLowerCase.includes(elemKeys[i].innerText)) {
        button.innerText = elemKeys[i].innerText.toUpperCase();
      } else {
        button.innerText = elemKeys[i].innerText.toLowerCase();
      }
    }
  }
}

function changeCharValue(valueKeys, elemKeys, keyboardState) {
  const listKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
    'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyA',
    'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN',
    'KeyM', 'Comma', 'Period', 'Slash',
  ];
  const { isCapsPress, language, isShiftPress } = keyboardState;

  for (let i = 0; i < elemKeys.length; i += 1) {
    const button = elemKeys[i];
    if (listKeys.includes(elemKeys[i].id)) {
      if (language === 'en') {
        if (!isShiftPress) {
          button.innerText = valueKeys[elemKeys[i].id].valuePressShift;
        } else {
          button.innerText = valueKeys[elemKeys[i].id].value;
        }
      } else if (!isShiftPress) {
        button.innerText = valueKeys[elemKeys[i].id].valuePressShiftRu;
      } else {
        button.innerText = valueKeys[elemKeys[i].id].valueRu;
      }
    }
  }

  if (isCapsPress) {
    changeLetterCase(elemKeys);
  }
}

function changeLanguage(valueKeys, elemKeys, keyboardState) {
  const listKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
    'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyA',
    'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN',
    'KeyM', 'Comma', 'Period', 'Slash',
  ];
  const { isCapsPress, language, isShiftPress } = keyboardState;

  for (let i = 0; i < elemKeys.length; i += 1) {
    const button = elemKeys[i];
    if (listKeys.includes(elemKeys[i].id)) {
      if (language === 'en') {
        if (isShiftPress) {
          button.innerText = valueKeys[elemKeys[i].id].valuePressShift;
        } else {
          button.innerText = valueKeys[elemKeys[i].id].value;
        }
      } else if (isShiftPress) {
        button.innerText = valueKeys[elemKeys[i].id].valuePressShiftRu;
      } else {
        button.innerText = valueKeys[elemKeys[i].id].valueRu;
      }
    }
  }

  if (isCapsPress) {
    changeLetterCase(elemKeys);
  }
}

function copyText(textarea, temp) {
  let clipboard = temp;
  const positionCursor = getPositionCursor(textarea);

  if (!positionCursor.length) {
    return clipboard;
  }

  const text = textarea.value;
  clipboard = text.substring(positionCursor[0], positionCursor[1] + 1);
  return temp;
}

function selectAllText(textarea) {
  textarea.select();
}

function pasteText(textarea, temp) {
  const positionCursor = getPositionCursor(textarea);
  let { value, selectionStart, selectionEnd } = textarea;

  if (positionCursor.length) {
    const textBefore = value.substring(0, positionCursor[0]);
    const textAfter = value.substring(positionCursor[1], value.length);

    value = textBefore + temp + textAfter;
    selectionStart = positionCursor[0] + temp.length;
    selectionEnd = selectionStart;
  } else if (!positionCursor.length && positionCursor !== value.length - 1) {
    const textBefore = value.substring(0, positionCursor);
    const textAfter = value.substring(positionCursor, value.length);

    value = textBefore + temp + textAfter;
    selectionStart = positionCursor + temp.length;
    selectionEnd = selectionStart;
  } else {
    value += temp;
  }

  return { value, selectionStart, selectionEnd };
}

export {
  editTextAreaData, changeCharValue, changeLetterCase,
  changeLanguage, copyText, selectAllText, pasteText,
};
