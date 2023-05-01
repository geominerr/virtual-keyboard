function createPage(obj, language) {
  const { rows, keys } = obj;
  const body = document.querySelector('body');
  const wrapper = createElement('div', 'wrapper');
  const title = createElement('h1', 'title');
  title.innerText = 'Virtual keyboard';
  const textArea = createElement('textarea', 'textarea');
  textArea.setAttribute('autofocus', true);
  const keyboard = createElement('div', 'keyboard');
  const paragraphOS = createElement('p', 'description');
  paragraphOS.innerText = 'The keyboard was created in the Windows OS';
  const paragraphLang = createElement('p', 'description');
  paragraphLang.innerText = 'To switch the language combination: left ctrl + alt';

  for (let i = 0; i < rows.length; i += 1) {
    const rowKeys = createRowKeys(rows[i], keys, language);
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

function createRowKeys(row, obj, language) {
  const rowElement = createElement('div', 'row');

  for (let i = 0; i < row.length; i += 1) {
    const key = createKey(row[i], obj, language);
    rowElement.appendChild(key);
  }

  return rowElement;
}

function createKey(key, obj, language) {
  const style = obj[key].styleCSS;
  const valueKey = language == 'en' ? obj[key].value : obj[key].valueRu;
  const button = createElement('div', style);
  button.setAttribute('id', key);
  button.innerHTML = valueKey;

  return button;
}

function addElements(parent, ...elements) {
  for (let i = 0; i < elements.length; i += 1) {
    parent.appendChild(elements[i]);
  }
}

export { createPage };