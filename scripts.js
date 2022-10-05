const h1 = document.querySelector("h1");
const darkModeColor = "#181A1B";
const lightModeColor = "#f7f7f7";
let isDarkMode = false;
sunIcon.style.display = "none";

if (localStorage.recordArea) recordArea.value = localStorage.recordArea;
if (localStorage.playArea) playArea.value = localStorage.playArea;
if (localStorage.volume) volumeSlider.value = localStorage.volume;
if (localStorage.dark === "true") {
  isDarkMode = true;
  enableDarkMode();
}

recordArea.scrollTop = recordArea.scrollHeight;
playArea.scrollTop = playArea.scrollHeight;
volumeTextInput.value = volumeSlider.value;

const DELAY = 250;  // ms
const CHORD_THRESHOLD = 15;  // ms

let time = new Date();
let chords = [];

setInterval(() => {
  const newTime = new Date();
  if (newTime - time > CHORD_THRESHOLD) {
    if (chords.length >= 2) {
      playArea.value += `(${chords.join('')})`;
      recordArea.value += `(${chords.join('')})`;
    } else if (chords.length === 1) {
      playArea.value += chords[0];
      recordArea.value += chords[0];
    }
    chords = [];
  }
  time = newTime;
}, CHORD_THRESHOLD);

class Note {
  constructor(...params) {
    [this.inputKey, this.path, this.selector, this.classUp, this.classDown] = params;
    this.htmlElement = document.querySelector(this.selector);
    this.down = false;
  }

  play(inputKey, isRecorded = false) {
    if (inputKey !== this.inputKey || this.down) return;
    playAudio(this.path);
    this.lower();
    if (isRecorded) {
      setTimeout(() => this.raise(this.inputKey), DELAY);
      return;
    };

    recordArea.scrollTop = recordArea.scrollHeight;
    if (playArea !== document.activeElement) {
      const newTime = new Date();
      if (newTime - time <= CHORD_THRESHOLD) {
        chords.push(this.inputKey);
      }
      else {
        if (chords.length >= 2) {
          playArea.value += `(${chords.join('')})`;
          recordArea.value += `(${chords.join('')})`;
        } else if (chords.length === 1) {
          playArea.value += chords[0];
          recordArea.value += chords[0];
        }
        chords = [this.inputKey];
      }
      time = newTime;
    }

    localStorage.recordArea = recordArea.value;
    localStorage.playArea = playArea.value;
  }

  lower() {
    this.htmlElement.classList.add(this.classDown);
    this.htmlElement.classList.remove(this.classUp);
    this.down = true;
  }

  raise(inputKey) {
    if (inputKey !== this.inputKey) return;
    this.htmlElement.classList.add(this.classUp);
    this.htmlElement.classList.remove(this.classDown);
    this.down = false;
  }
}

function playAudio(src) {
  const audio = new Audio();
  const source = document.createElement("source");
  source.src = src;
  audio.appendChild(source);
  audio.volume = volumeSlider.value;
  audio.play();
  // TODO: Do we need to clean up these DOM elements?
}

const notes = [
  // Middle row
  new Note("a", "./piano-notes/4-c-cut-fade.mp3", ".white-1", "white", "white-keydown"),
  new Note("s", "./piano-notes/4-d-cut-fade.mp3", ".white-2", "white", "white-keydown"),
  new Note("d", "./piano-notes/4-e-cut-fade.mp3", ".white-3", "white", "white-keydown"),
  new Note("f", "./piano-notes/4-f-cut-fade.mp3", ".white-4", "white", "white-keydown"),
  new Note("g", "./piano-notes/4-g-cut-fade.mp3", ".white-5", "white", "white-keydown"),
  new Note("h", "./piano-notes/4-a-cut-fade.mp3", ".white-6", "white", "white-keydown"),
  new Note("j", "./piano-notes/4-b-cut-fade.mp3", ".white-7", "white", "white-keydown"),
  new Note("k", "./piano-notes/5-c-cut-fade.mp3", ".white-8", "white", "white-keydown"),
  new Note("l", "./piano-notes/5-d-cut-fade.mp3", ".white-9", "white", "white-keydown"),
  new Note(";", "./piano-notes/5-e-cut-fade.mp3", ".white-10", "white", "white-keydown"),
  // Top row
  new Note("w", "./piano-notes/4-cs-cut-fade.mp3", ".black-1", "black", "black-keydown"),
  new Note("e", "./piano-notes/4-ds-cut-fade.mp3", ".black-2", "black", "black-keydown"),
  new Note("t", "./piano-notes/4-fs-cut-fade.mp3", ".black-3", "black", "black-keydown"),
  new Note("y", "./piano-notes/4-gs-cut-fade.mp3", ".black-4", "black", "black-keydown"),
  new Note("u", "./piano-notes/4-as-cut-fade.mp3", ".black-5", "black", "black-keydown"),
  new Note("o", "./piano-notes/5-cs-cut-fade.mp3", ".black-6", "black", "black-keydown"),
  new Note("p", "./piano-notes/5-ds-cut-fade.mp3", ".black-7", "black", "black-keydown"),
]

document.addEventListener("keydown", e => {
  notes.forEach(note => note.play(e.key));
});

document.addEventListener("keyup", e => {
  notes.forEach(note => note.raise(e.key));
});

piano.addEventListener("mousedown", e => {
  notes.forEach(note => note.play(e.target.innerText.toLowerCase()));
});

piano.addEventListener("mouseup", e => {
  notes.forEach(note => note.raise(e.target.innerText.toLowerCase()));
});

function enableDarkMode() {
  document.body.style.backgroundColor = darkModeColor;
  h1.style.color = lightModeColor;
  moonIcon.style.display = "none";
  sunIcon.style.display = "block";
  darkModeButton.style.border = isDarkMode ? `1px solid ${darkModeColor}` : `1px solid ${lightModeColor}`;
  darkModeButton.style.backgroundColor = darkModeColor;
}

darkModeButton.addEventListener("click", e => {
  isDarkMode = !isDarkMode;
  localStorage.dark = isDarkMode;
  if (isDarkMode) {
    enableDarkMode();
  } else {
    document.body.style.backgroundColor = lightModeColor;
    h1.style.color = darkModeColor;
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    darkModeButton.style.backgroundColor = lightModeColor;
  }
})

darkModeButton.addEventListener("mouseenter", e => {
  darkModeButton.style.border = isDarkMode ? `1px solid ${lightModeColor}` : `1px solid ${darkModeColor}`;
});

darkModeButton.addEventListener("mouseleave", e => {
  darkModeButton.style.border = isDarkMode ? `1px solid ${darkModeColor}` : `1px solid ${lightModeColor}`;
});

let notesToPlay = [];
let isChord = false;
playButton.addEventListener("click", e => {
  if (playButton.innerText === "Stop") {
    playButton.innerText = "Play";
    notesToPlay = [];
    return;
  }
  playButton.innerText = "Stop";
  notesToPlay = [];
  for (let i = 0; i < playArea.value.length; i++) {
    const symbol = playArea.value[i];
    if (symbol === "(") {
      notesToPlay.push([]);
      isChord = true;
      continue;
    }
    else if (symbol === ")") {
      isChord = false;
      continue;
    }

    if (isChord) {
      notesToPlay[notesToPlay.length - 1].push(symbol);
    }
    else {
      notesToPlay.push([symbol]);
    }
  }
  playRecording();
})

function playRecording() {
  if (notesToPlay.length === 0) {
    playButton.innerText = "Play";
    return;
  };
  const inputKeys = notesToPlay.shift();  // TODO: Use an index instead of mutating. Clear after max index
  inputKeys.forEach(inputKey => notes.forEach(note => note.play(inputKey, true)))
  setTimeout(() => playRecording(), DELAY);
}

playArea.addEventListener("input", e => {
  localStorage.playArea = playArea.value;
})

clearPlayAreaButton.addEventListener("click", e => {
  localStorage.playArea = "";
  playArea.value = "";
})

clearRecordAreaButton.addEventListener("click", e => {
  localStorage.recordArea = "";
  recordArea.value = "";
})

volumeSlider.addEventListener("input", e => {
  volumeTextInput.value = volumeSlider.value;
  localStorage.volume = volumeSlider.value;
});

volumeTextInput.addEventListener("input", e => {
  volumeSlider.value = volumeTextInput.value;
  localStorage.volume = volumeTextInput.value;
});
