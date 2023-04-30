import { KEYBOARD } from './modules/keyboardObj.js';
import { createPage } from './modules/createPage.js';
import { keyboardState } from './modules/keyboardState.js';
import { addEventHandler } from './modules/eventHandler.js';
createPage(KEYBOARD);

addEventHandler(KEYBOARD, keyboardState);
