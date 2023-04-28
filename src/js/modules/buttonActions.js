 export function editTextAreaData(textarea, key) {
  const buttonEdit = ['Enter', 'Tab', 'Space', 'Backspace', 'Delete'];
  const positionCursor = getPositionCursor(textarea);

  if (!buttonEdit.includes(key.id)) {
    changeTextAreaValue(textarea, positionCursor, key.innerText);
  } else {
    if (key.id == 'Enter') {
      changeTextAreaValue(textarea, positionCursor, '\n');
    }
    if (key.id == 'Tab') {
      changeTextAreaValue(textarea, positionCursor, '\t');
    }
    if (key.id == 'Space') {
      changeTextAreaValue(textarea, positionCursor, ' ');
    }
    if (key.id == 'Backspace') {
      if (positionCursor.length) {
        let text = textarea.value;
        let textBefore = text.substring(0, positionCursor[0]);
        let textAfter = text.substring(positionCursor[1], text.length);

        textarea.value = textBefore + textAfter;
        textarea.selectionStart = positionCursor[0];
        textarea.selectionEnd = textarea.selectionStart;
      } else {
        if (!positionCursor.length && positionCursor !== textarea.value.length - 1 && positionCursor !== 0) {
          let text = textarea.value;
          let textBefore = text.substring(0, positionCursor);
          let textAfter = text.substring(positionCursor, text.length);

          textarea.value = textBefore.substring(0, textBefore.length - 1) + textAfter;
          textarea.selectionStart = positionCursor - 1;
          textarea.selectionEnd = textarea.selectionStart;
          console.log(positionCursor);
        }
      }
    }
    if (key.id == "Delete") {
      if (positionCursor.length) {
        let text = textarea.value;
        let textBefore = text.substring(0, positionCursor[0]);
        let textAfter = text.substring(positionCursor[1], text.length);

        textarea.value = textBefore + textAfter;
        textarea.selectionStart = positionCursor[0];
        textarea.selectionEnd = textarea.selectionStart;
      } else {
        if (!positionCursor.length && positionCursor !== textarea.value.length) {
          let text = textarea.value;
          let textBefore = text.substring(0, positionCursor);
          let textAfter = text.substring(positionCursor + 1, text.length);

          console.log(text.length, positionCursor)
          textarea.value = textBefore + textAfter;
          textarea.selectionStart = positionCursor;
          textarea.selectionEnd = textarea.selectionStart;
          console.log(positionCursor);
        }
      }
    }
  }
}

export function changeCharValue(valueKeys, listKeys, elemKeys) {
  for (let i = 0; i < elemKeys.length; i += 1) {
    if (listKeys.includes(elemKeys[i].id)) {
      elemKeys[i].innerText = valueKeys[elemKeys[i].id].valuePressShift;
    }
  }
}

function changeLetterCase() { }

function changeLanguage() { }

function getPositionCursor(textarea) {
  const startCursor = textarea.selectionStart;
  const endCursor = textarea.selectionEnd;

  if (startCursor !== endCursor) {
    return [startCursor, endCursor];
  } else {
    return startCursor;
  }
}


function changeTextAreaValue(textarea, position, char) {
  if (position.length) {
    let text = textarea.value;
    let textBefore = text.substring(0, position[0]);
    let textAfter = text.substring(position[1], text.length);

    textarea.value = textBefore + char + textAfter;
    textarea.selectionStart = position[0] + 1;
    textarea.selectionEnd = textarea.selectionStart;
  } else {
    if (!position.length && position !== textarea.value.length - 1) {
      let text = textarea.value;
      let textBefore = text.substring(0, position);
      let textAfter = text.substring(position, text.length);

      textarea.value = textBefore + char + textAfter;
      textarea.selectionStart = position + 1;
      textarea.selectionEnd = textarea.selectionStart;
    } else {
      textarea.value += char;
    }
  }
}

