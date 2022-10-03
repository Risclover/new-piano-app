function playAudio(path) {
  const sound = new Audio();
  const source = document.createElement("source");
  source.src = path;
  sound.appendChild(source);
  sound.play();
}

class Note {
  constructor(...params) {
    [this.inputKey, this.path, this.selector, this.classUp, this.classDown] = params;
    this.htmlElement = document.querySelector(this.selector);
  }

  play(inputKey) {
    if (inputKey !== this.inputKey) return;
    playAudio(this.path);
    this.lower();
  }

  lower() {
    this.htmlElement.classList.add(this.classDown);
    this.htmlElement.classList.remove(this.classUp);
  }

  raise(inputKey) {
    if (inputKey !== this.inputKey) return;
    this.htmlElement.classList.add(this.classUp);
    this.htmlElement.classList.remove(this.classDown);
  }
}

const middleRow = {
  classUp: "white",
  classDown: "white-keydown"
}

const topRow = {
  classUp: "black",
  classDown: "black-keydown"
}

const notes = [
  // Middle row
  new Note("a", "./piano-notes/4-c-cut-fade.mp3", ".white-1", middleRow.classUp, middleRow.classDown),
  new Note("s", "./piano-notes/4-d-cut-fade.mp3", ".white-2", middleRow.classUp, middleRow.classDown),
  new Note("d", "./piano-notes/4-e-cut-fade.mp3", ".white-3", middleRow.classUp, middleRow.classDown),
  new Note("f", "./piano-notes/4-f-cut-fade.mp3", ".white-4", middleRow.classUp, middleRow.classDown),
  new Note("g", "./piano-notes/4-g-cut-fade.mp3", ".white-5", middleRow.classUp, middleRow.classDown),
  new Note("h", "./piano-notes/4-a-cut-fade.mp3", ".white-6", middleRow.classUp, middleRow.classDown),
  new Note("j", "./piano-notes/4-b-cut-fade.mp3", ".white-7", middleRow.classUp, middleRow.classDown),
  new Note("k", "./piano-notes/5-c-cut-fade.mp3", ".white-8", middleRow.classUp, middleRow.classDown),
  new Note("l", "./piano-notes/5-d-cut-fade.mp3", ".white-9", middleRow.classUp, middleRow.classDown),
  new Note(";", "./piano-notes/5-e-cut-fade.mp3", ".white-10", middleRow.classUp, middleRow.classDown),
  // Top row
  new Note("w", "./piano-notes/4-cs-cut-fade.mp3", ".black-1", topRow.classUp, topRow.classDown),
  new Note("e", "./piano-notes/4-ds-cut-fade.mp3", ".black-2", topRow.classUp, topRow.classDown),
  new Note("t", "./piano-notes/4-fs-cut-fade.mp3", ".black-3", topRow.classUp, topRow.classDown),
  new Note("y", "./piano-notes/4-gs-cut-fade.mp3", ".black-4", topRow.classUp, topRow.classDown),
  new Note("u", "./piano-notes/4-as-cut-fade.mp3", ".black-5", topRow.classUp, topRow.classDown),
  new Note("o", "./piano-notes/5-cs-cut-fade.mp3", ".black-6", topRow.classUp, topRow.classDown),
  new Note("p", "./piano-notes/5-ds-cut-fade.mp3", ".black-7", topRow.classUp, topRow.classDown),
]

document.addEventListener("keydown", function (e) {
  notes.forEach(note => note.play(e.key));
});

document.addEventListener("keyup", function (e) {
  notes.forEach(note => note.raise(e.key));
});

document.addEventListener("mousedown", function (e) {
  notes.forEach(note => note.play(e.target.innerText.toLowerCase()));
});

document.addEventListener("mouseup", function (e) {
  notes.forEach(note => note.raise(e.target.innerText.toLowerCase()));
});
