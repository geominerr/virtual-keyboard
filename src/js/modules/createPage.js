export function createPage(obj) {
  const { rows, keys } = obj;
  const body = document.querySelector('body');
  const wrapper = createElement('div', 'wrapper');
  const title = createElement('h1', 'title');
  title.innerText = 'Virtual keyboard';
  const textArea = createElement('textarea', 'textarea');
  const keyboard = createElement('div', 'keyboard');
  const paragraphOS = createElement('p', 'description');
  paragraphOS.innerText = 'The keyboard was created in the Windows OS';
  const paragraphLang = createElement('p', 'description');
  paragraphLang.innerText = 'To switch the language combination: left ctrl + alt';

  for (let i = 0; i < rows.length; i += 1) {
    const rowKeys = createRowKeys(rows[i], keys);

    keyboard.appendChild(rowKeys);
  }

  addElements(wrapper, title, textArea, keyboard, paragraphOS, paragraphLang);

  body.appendChild(wrapper);
}

function createElement(tag, style) {
  const element = document.createElement(tag);
  element.className = style;

  return element;
}

function createRowKeys(row, obj) {
  const rowElement = createElement('div', 'row');

  for (let i = 0; i < row.length; i += 1) {
    const key = createKey(row[i], obj);
    rowElement.appendChild(key);
  }

  return rowElement;
}

function createKey(key, obj) {
  const style = obj[key].styleCSS;
  const valueKey = obj[key].value;
  const button = createElement('div', style);
  button.innerHTML = valueKey;

  return button;
}

function addElements(parent, ...elements) {
  for (let i = 0; i < elements.length; i += 1) {
    parent.appendChild(elements[i]);
  }
}