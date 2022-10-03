document.body.addEventListener("keypress", function (e) {
  // Middle row
  if (e.key === "a") {
    if (play("./piano-notes/4-c.wav")) {
      return;
    } else {
      play("./piano-notes/4-c.wav");
      document.querySelector(".white-1").classList.add("white-keydown");
      document.querySelector(".white-1").classList.remove("white");
    }
  }
  if (e.key === "s") {
    play("./piano-notes/4-d.wav");
    document.querySelector(".white-2").classList.add("white-keydown");
    document.querySelector(".white-2").classList.remove("white");
  }
  if (e.key === "d") {
    play("./piano-notes/4-e.wav");
    document.querySelector(".white-3").classList.add("white-keydown");
    document.querySelector(".white-3").classList.remove("white");
  }
  if (e.key === "f") {
    play("./piano-notes/4-f.wav");
    document.querySelector(".white-4").classList.add("white-keydown");
    document.querySelector(".white-4").classList.remove("white");
  }
  if (e.key === "g") {
    play("./piano-notes/4-g.wav");
    document.querySelector(".white-5").classList.add("white-keydown");
    document.querySelector(".white-5").classList.remove("white");
  }
  if (e.key === "h") {
    play("./piano-notes/4-a.wav");
    document.querySelector(".white-6").classList.add("white-keydown");
    document.querySelector(".white-6").classList.remove("white");
  }
  if (e.key === "j") {
    play("./piano-notes/4-b.wav");
    document.querySelector(".white-7").classList.add("white-keydown");
    document.querySelector(".white-7").classList.remove("white");
  }
  if (e.key === "k") {
    play("./piano-notes/5-c.wav");
    document.querySelector(".white-8").classList.add("white-keydown");
    document.querySelector(".white-8").classList.remove("white");
  }
  if (e.key === "l") {
    play("./piano-notes/5-d.wav");
    document.querySelector(".white-9").classList.add("white-keydown");
    document.querySelector(".white-9").classList.remove("white");
  }
  if (e.key === ";") {
    play("./piano-notes/5-e.wav");
    document.querySelector(".white-10").classList.add("white-keydown");
    document.querySelector(".white-10").classList.remove("white");
  }

  // Top row
  if (e.key === "w") {
    play("./piano-notes/4-cs.wav");
    document.querySelector(".black-1").classList.add("black-keydown");
    document.querySelector(".black-1").classList.remove("black");
  }
  if (e.key === "e") {
    play("./piano-notes/4-ds.wav");
    document.querySelector(".black-2").classList.add("black-keydown");
    document.querySelector(".black-2").classList.remove("black");
  }
  if (e.key === "t") {
    play("./piano-notes/4-fs.wav");
    document.querySelector(".black-3").classList.add("black-keydown");
    document.querySelector(".black-3").classList.remove("black");
  }
  if (e.key === "y") {
    play("./piano-notes/4-gs.wav");
    document.querySelector(".black-4").classList.add("black-keydown");
    document.querySelector(".black-4").classList.remove("black");
  }
  if (e.key === "u") {
    play("./piano-notes/4-as.wav");
    document.querySelector(".black-5").classList.add("black-keydown");
    document.querySelector(".black-5").classList.remove("black");
  }
  if (e.key === "o") {
    play("./piano-notes/5-cs.wav");
    document.querySelector(".black-6").classList.add("black-keydown");
    document.querySelector(".black-6").classList.remove("black");
  }
  if (e.key === "p") {
    play("./piano-notes/5-ds.wav");
    document.querySelector(".black-7").classList.add("black-keydown");
    document.querySelector(".black-7").classList.remove("black");
  }
});
function play(path) {
  const sound = new Audio();
  const source = document.createElement("source");
  source.src = path;
  sound.appendChild(source);
  // sound.play();
  if (sound.paused) {
    sound.play();
  } else {
    sound.pause();
  }

  document.body.addEventListener("keyup", function () {
    sound.stop();
  });
}
const whiteKeys = Array.from(document.querySelectorAll("white"));
const keys = document.querySelectorAll("div");
keys.forEach((key) => {
  key.addEventListener("mousedown", function () {
    let keyText = key.innerText;
    if (key.dataset.key === keyText) {
      key.classList.add("white-keydown");
    }
    if (key.dataset.black === keyText) {
      key.classList.add("black-keydown");
    }
    if (keyText === "a".toUpperCase()) play("./piano-notes/4-c.wav");
    if (keyText === "s".toUpperCase()) play("./piano-notes/4-d.wav");
    if (keyText === "d".toUpperCase()) play("./piano-notes/4-e.wav");
    if (keyText === "f".toUpperCase()) play("./piano-notes/4-f.wav");
    if (keyText === "g".toUpperCase()) play("./piano-notes/4-g.wav");
    if (keyText === "h".toUpperCase()) play("./piano-notes/4-a.wav");
    if (keyText === "j".toUpperCase()) play("./piano-notes/4-b.wav");
    if (keyText === "k".toUpperCase()) play("./piano-notes/5-c.wav");
    if (keyText === "l".toUpperCase()) play("./piano-notes/5-d.wav");
    if (keyText === ";".toUpperCase()) play("./piano-notes/5-e.wav");
    // Top row
    if (keyText === "w".toUpperCase()) play("./piano-notes/4-cs.wav");
    if (keyText === "e".toUpperCase()) play("./piano-notes/4-ds.wav");
    if (keyText === "t".toUpperCase()) play("./piano-notes/4-fs.wav");
    if (keyText === "y".toUpperCase()) play("./piano-notes/4-gs.wav");
    if (keyText === "u".toUpperCase()) play("./piano-notes/4-as.wav");
    if (keyText === "i".toUpperCase()) play("./piano-notes/5-bs.wav");
    if (keyText === "o".toUpperCase()) play("./piano-notes/5-cs.wav");
    if (keyText === "p".toUpperCase()) play("./piano-notes/5-ds.wav");
  });
  key.addEventListener("mouseup", function (e) {
    e.stopPropagation();
    key.classList.remove("white-keydown");
    key.classList.remove("black-keydown");
  });
});

const blackKeys = Array.from(document.querySelectorAll("black"));

document.body.addEventListener("keyup", function (e) {
  sound.stop();
  if (e.key === "a") {
    document.querySelector(".white-1").classList.remove("white-keydown");
    document.querySelector(".white-1").classList.add("white");
  }
  if (e.key === "s") {
    document.querySelector(".white-2").classList.remove("white-keydown");
    document.querySelector(".white-2").classList.add("white");
  }
  if (e.key === "d") {
    document.querySelector(".white-3").classList.remove("white-keydown");
    document.querySelector(".white-3").classList.add("white");
  }
  if (e.key === "f") {
    document.querySelector(".white-4").classList.remove("white-keydown");
    document.querySelector(".white-4").classList.add("white");
  }
  if (e.key === "g") {
    document.querySelector(".white-5").classList.remove("white-keydown");
    document.querySelector(".white-5").classList.add("white");
  }
  if (e.key === "h") {
    document.querySelector(".white-6").classList.remove("white-keydown");
    document.querySelector(".white-6").classList.add("white");
  }
  if (e.key === "j") {
    document.querySelector(".white-7").classList.remove("white-keydown");
    document.querySelector(".white-7").classList.add("white");
  }
  if (e.key === "k") {
    document.querySelector(".white-8").classList.remove("white-keydown");
    document.querySelector(".white-8").classList.add("white");
  }
  if (e.key === "l") {
    document.querySelector(".white-9").classList.remove("white-keydown");
    document.querySelector(".white-9").classList.add("white");
  }
  if (e.key === ";") {
    document.querySelector(".white-10").classList.remove("white-keydown");
    document.querySelector(".white-10").classList.add("white");
  }

  // Top row
  if (e.key === "w") {
    play("./piano-notes/4-cs.wav");
    document.querySelector(".black-1").classList.remove("black-keydown");
    document.querySelector(".black-1").classList.add("black");
  }
  if (e.key === "e") {
    play("./piano-notes/4-ds.wav");
    document.querySelector(".black-2").classList.remove("black-keydown");
    document.querySelector(".black-2").classList.add("black");
  }
  if (e.key === "t") {
    play("./piano-notes/4-fs.wav");
    document.querySelector(".black-3").classList.remove("black-keydown");
    document.querySelector(".black-3").classList.add("black");
  }
  if (e.key === "y") {
    play("./piano-notes/4-gs.wav");
    document.querySelector(".black-4").classList.remove("black-keydown");
    document.querySelector(".black-4").classList.add("black");
  }
  if (e.key === "u") {
    play("./piano-notes/4-as.wav");
    document.querySelector(".black-5").classList.remove("black-keydown");
    document.querySelector(".black-5").classList.add("black");
  }
  if (e.key === "o") {
    play("./piano-notes/5-cs.wav");
    document.querySelector(".black-6").classList.remove("black-keydown");
    document.querySelector(".black-6").classList.add("black");
  }
  if (e.key === "p") {
    play("./piano-notes/5-ds.wav");
    document.querySelector(".black-7").classList.remove("black-keydown");
    document.querySelector(".black-7").classList.add("black");
  }
});
