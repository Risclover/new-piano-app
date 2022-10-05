const h1 = document.querySelector("h1");
const darkModeColor = "#181A1B";
const lightModeColor = "#f7f7f7";
let isDarkMode = false;
sunIcon.style.display = "none";

function updatePlayArea(song) {
  localStorage.playArea = song;
  playArea.value = song;
  window.history.pushState("object or string", "Title", "/new-piano-app/?song=" + playArea.value);
}

const urlSong = window.location.href.split("=")[1];
if (urlSong) updatePlayArea(urlSong)
else if (localStorage.playArea) updatePlayArea(localStorage.playArea);
else updatePlayArea(playArea.value);

if (localStorage.volume) volumeSlider.value = localStorage.volume;
if (localStorage.dark === "true") enableDarkMode();

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
    } else if (chords.length === 1) {
      playArea.value += chords[0];
    }
    chords = [];
  }
  time = newTime;
}, CHORD_THRESHOLD);

function createAudio() {
  this.audio = new Audio();
  const source = document.createElement("source");
  source.src = this.path;
  this.audio.appendChild(source);
}

class Note {
  constructor(...params) {
    [this.inputKey, this.path, this.selector, this.classUp, this.classDown] = params;
    this.htmlElement = document.querySelector(this.selector);
    this.down = false;
    createAudio.call(this);
  }

  play(inputKey, isRecorded = false) {
    if (inputKey !== this.inputKey || this.down) return;
    if (this.audio.duration > 0 && !this.audio.paused) createAudio.call(this);
    this.audio.volume = volumeSlider.value;
    this.audio.play();
    this.lower();
    if (isRecorded) {
      setTimeout(() => this.raise(this.inputKey), DELAY);
      return;
    };

    if (playArea !== document.activeElement) {
      const newTime = new Date();
      if (newTime - time <= CHORD_THRESHOLD) {
        chords.push(this.inputKey);
      }
      else {
        if (chords.length >= 2) {
          playArea.value += `(${chords.join('')})`;
        } else if (chords.length === 1) {
          playArea.value += chords[0];
        }
        chords = [this.inputKey];
      }
      time = newTime;
    }

    updatePlayArea(playArea.value);
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
  isDarkMode = true;
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
  updatePlayArea(playArea.value);
})

clearPlayAreaButton.addEventListener("click", e => {
  updatePlayArea("");
})

volumeSlider.addEventListener("input", e => {
  volumeTextInput.value = volumeSlider.value;
  localStorage.volume = volumeSlider.value;
});

volumeTextInput.addEventListener("input", e => {
  volumeSlider.value = volumeTextInput.value;
  localStorage.volume = volumeTextInput.value;
});
