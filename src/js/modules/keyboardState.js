const keyboardState = {
  language: 'en',
  isCapsPress: false,
  isShiftPress: false,
  isCtrlPress: false,
  isAltPress: false,
  isSavedState: false,

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
  },

  changeLanguage() {
    this.language = this.language == 'en' ? 'ru' : 'en';
    localStorage.setItem('PinkPeppaPig', JSON.stringify(keyboardState));
    this.isSavedState = true;
  },

  setLanguage() {
    if (localStorage.getItem('PinkPeppaPig')) {
      const savedKeyboardState = JSON.parse(localStorage.getItem('PinkPeppaPig'));
      if (savedKeyboardState?.language) {
        this.language = savedKeyboardState.language;
      } else {
        console.warn('Anyone else used PinkPeppaPig :-0 ?! Please clear localStorage!');
      }
    } else {
      if (this.isSavedState) {
        console.warn('Please enable localStorage in your browser settings!');
      }
    }
  }
};

export { keyboardState };