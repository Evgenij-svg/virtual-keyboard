const body = document.querySelector('body');
const Keybord = document.createElement('div');
const input = document.createElement('textarea');
Keybord.classList.add('Keybord');
const keysEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'Caps-Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift1', '?', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift2', 'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'];
const keysDey = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü', '|', '\\', 'Del', 'Caps-Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', 'Enter', 'Shift1', '?', 'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift2', 'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'];

let keys = keysEng;
keys = keysDey;

let CapsLock = false;

let EngDeu = false;

function KeyClick(nameKey) {
  if (nameKey === 'Shift') {
    const event = new KeyboardEvent('keydown', { shiftKey: true });
    input.focus();
    document.dispatchEvent(event);
    input.focus();
  } else if (nameKey === 'Backspace') {
    const currentValue = input.value;
    const newValue = currentValue.slice(0, -1); // удалить последний символ
    input.value = newValue;
  } else if (nameKey === 'Del') {
    const Value = input.value;
    if (input.selectionStart === input.selectionEnd) {
      const BeforeSubstring = Value.substring(0, input.selectionStart);
      input.value = BeforeSubstring + Value.substring(input.selectionEnd + 1);
      input.selectionStart = input.selectionEnd;
    } else {
      const BeforeSubstring = Value.substring(0, input.selectionStart);
      input.value = BeforeSubstring + Value.substring(input.selectionEnd);
      input.selectionStart = input.selectionEnd;
    }
  } else if (nameKey === '←') {
    input.selectionEnd = Math.max(input.selectionEnd - 1, 0);
    input.selectionStart = input.selectionEnd;
    input.focus();
  } else if (nameKey === '→') {
    input.selectionStart = Math.min(input.selectionStart + 1, input.value.length);
    input.selectionStart = input.selectionEnd;
    input.focus();
  } else if (nameKey === '↑') {
    const lineHeight = parseInt(getComputedStyle(input).lineHeight, 10);
    const currentLine = Math.floor(input.selectionStart / input.cols);
    input.selectionStart = Math.max(input.selectionStart - input.cols, 0);
    input.selectionEnd = Math.max(input.selectionEnd - input.cols, 0);
    const newLine = Math.floor(input.selectionStart / input.cols);
    if (newLine < currentLine) {
      input.scrollTop = Math.max(input.scrollTop - lineHeight, 0);
    }
    input.focus();
  } else if (nameKey === '↓') {
    const lineHeight = parseInt(getComputedStyle(input).lineHeight, 10);
    const currentLine = Math.floor(input.selectionStart / input.cols);
    input.selectionStart = Math.min(input.selectionStart + input.cols, input.value.length);
    input.selectionEnd = Math.min(input.selectionEnd + input.cols, input.value.length);
    const newLine = Math.floor(input.selectionStart / input.cols);
    if (newLine > currentLine) {
      const Cursor = input.scrollTop + lineHeight;
      input.scrollTop = Math.min(Cursor, input.scrollHeight - input.offsetHeight);
    }
    input.focus();
  } else if (nameKey === 'Space') {
    input.value += ' ';
    input.focus();
  } else if (nameKey === 'Enter') {
    input.value += '\n';
    input.focus();
  } else if (nameKey === 'Tab') {
    input.value += '    ';
    input.focus();
  } else if (nameKey === 'Caps-Lock') {
    CapsLock = !CapsLock;
  } else if (CapsLock) {
    input.value += nameKey.toUpperCase();
  } else {
    input.value += nameKey;
  }
}
let count = 0;

keys.forEach((elem) => {
  const KeybordKey = document.createElement('div');
  const NameKey = document.createElement('span');
  KeybordKey.classList.add(`Keybord-key-${elem}`);
  KeybordKey.classList.add('Keybord-key');
  NameKey.textContent = elem.startsWith('Shift') ? 'Shift' : elem;
  KeybordKey.appendChild(NameKey);
  KeybordKey.onclick = () => {
    KeyClick(elem.startsWith('Shift') ? 'Shift' : elem);
  };
  Keybord.appendChild(KeybordKey);
});

const KeybordKeyAll = Keybord.querySelectorAll('.Keybord-key');

function handle(e) {
  if (e.key === 'Shift') {
    const filteredKeys = keys.filter((elem) => elem.startsWith('Shift'));
    const indexes = filteredKeys.map((elem) => keys.indexOf(elem));
    indexes.forEach((elem) => {
      KeybordKeyAll[elem].classList.toggle('Visible');
    });
  } else if (e.key === 'Control') {
    const ctrlIndexes = keys.reduce((indexes, key, index) => {
      if (key.startsWith('Ctrl')) {
        indexes.push(index);
      }
      return indexes;
    }, []);
    ctrlIndexes.forEach((elem) => {
      KeybordKeyAll[elem].classList.toggle('Visible');
    });
  } else if (e.key === 'Alt') {
    const ctrlIndexes = keys.reduce((indexes, key, index) => {
      if (key.startsWith('Alt')) {
        indexes.push(index);
      }
      return indexes;
    }, []);
    ctrlIndexes.forEach((elem) => {
      KeybordKeyAll[elem].classList.toggle('Visible');
    });
  } else if (e.key === 'Backspace') {
    KeybordKeyAll[keys.indexOf(e.key)].classList.toggle('Visible');
  } else if (e.key === 'Meta') {
    KeybordKeyAll[keys.indexOf('Win')].classList.toggle('Visible');
  } else if (e.key === 'Enter') {
    KeybordKeyAll[keys.indexOf('Enter')].classList.toggle('Visible');
  } else if (e.key === 'Delete') {
    KeybordKeyAll[keys.indexOf('Del')].classList.toggle('Visible');
  } else if (e.key === 'ArrowUp') {
    KeybordKeyAll[keys.indexOf('↑')].classList.toggle('Visible');
  } else if (e.key === 'ArrowDown') {
    KeybordKeyAll[keys.indexOf('↓')].classList.toggle('Visible');
  } else if (e.key === 'ArrowLeft') {
    KeybordKeyAll[keys.indexOf('←')].classList.toggle('Visible');
  } else if (e.key === 'ArrowRight') {
    KeybordKeyAll[keys.indexOf('→')].classList.toggle('Visible');
  } else if (e.key === ' ') {
    KeybordKeyAll[keys.indexOf('Space')].classList.toggle('Visible');
  } else {
    const text = e.key;
    if (keys.indexOf(text.toLowerCase()) === -1) {
      if (e.code.startsWith('Digit')) {
        const result = e.code.replace('Digit', '');
        KeybordKeyAll[keys.indexOf(result.toLowerCase())].classList.toggle('Visible');
      } else if (e.code === 'IntlBackslash') {
        KeybordKeyAll[keys.indexOf('\\')].classList.toggle('Visible');
      } else if (e.code === 'Backquote') {
        KeybordKeyAll[keys.indexOf('`')].classList.toggle('Visible');
      } else if (e.code === 'Minus') {
        KeybordKeyAll[keys.indexOf('-')].classList.toggle('Visible');
      } else if (e.code === 'Equal') {
        KeybordKeyAll[keys.indexOf('=')].classList.toggle('Visible');
      } else if (e.code === 'BracketLeft') {
        KeybordKeyAll[keys.indexOf('[')].classList.toggle('Visible');
      } else if (e.code === 'BracketRight') {
        KeybordKeyAll[keys.indexOf(']')].classList.toggle('Visible');
      } else if (e.code === 'Semicolon') {
        KeybordKeyAll[keys.indexOf(';')].classList.toggle('Visible');
      } else if (e.code === 'Quote') {
        KeybordKeyAll[keys.indexOf("'")].classList.toggle('Visible');
      } else if (e.code === 'Comma') {
        KeybordKeyAll[keys.indexOf(',')].classList.toggle('Visible');
      } else if (e.code === 'Period') {
        KeybordKeyAll[keys.indexOf('.')].classList.toggle('Visible');
      }
    } else {
      KeybordKeyAll[keys.indexOf(text.toLowerCase())].classList.toggle('Visible');
    }
  }
  const ctrlIndexes = keys.reduce((indexes, key, index) => {
    if (key.startsWith('Ctrl')) {
      indexes.push(index);
    }
    return indexes;
  }, []);
  const filteredKeys = keys.filter((elem) => elem.startsWith('Shift'));
  const indexes = filteredKeys.map((elem) => keys.indexOf(elem));
  indexes.forEach((elem) => {
    ctrlIndexes.forEach((element) => {
      if (KeybordKeyAll[elem].classList.contains('Visible') && KeybordKeyAll[element].classList.contains('Visible')) {
        count += 1;
        if (count % 4 === 0) {
          count = 0;
          EngDeu = !EngDeu;
          console.log(EngDeu);
        }
      }
    });
  });
}

input.onkeydown = handle;
input.onkeyup = handle;
body.appendChild(input);
body.appendChild(Keybord);
