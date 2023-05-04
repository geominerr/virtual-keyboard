import KEYBOARD from './modules/keyboardObj.js';
import createPage from './modules/createPage.js';
import keyboardState from './modules/keyboardState.js';
import addEventHandler from './modules/eventHandler.js';

keyboardState.setLanguage();

const { language } = keyboardState;

createPage(KEYBOARD, language);
addEventHandler(KEYBOARD, keyboardState);
