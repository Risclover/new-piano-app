document.body.addEventListener("keydown", function (e) {
  // Middle row
  if (e.key === "a") {
    play("./piano-notes/4-c.wav");
    document.querySelector(".white-1").classList.add("white-keydown");
    document.querySelector(".white-1").classList.remove("white");
  }
  if (e.key === "s") play("./piano-notes/4-d.wav");
  if (e.key === "d") play("./piano-notes/4-e.wav");
  if (e.key === "f") play("./piano-notes/4-f.wav");
  if (e.key === "g") play("./piano-notes/4-g.wav");
  if (e.key === "h") play("./piano-notes/4-a.wav");
  if (e.key === "j") play("./piano-notes/4-b.wav");
  if (e.key === "k") play("./piano-notes/5-c.wav");
  if (e.key === "l") play("./piano-notes/5-d.wav");
  if (e.key === ";") play("./piano-notes/5-e.wav");

  // Top row
  if (e.key === "w") play("./piano-notes/4-cs.wav");
  if (e.key === "e") play("./piano-notes/4-ds.wav");
  if (e.key === "t") play("./piano-notes/4-fs.wav");
  if (e.key === "y") play("./piano-notes/4-gs.wav");
  if (e.key === "u") play("./piano-notes/4-as.wav");
  if (e.key === "i") play("./piano-notes/5-bs.wav");
  if (e.key === "o") play("./piano-notes/5-cs.wav");
  if (e.key === "p") play("./piano-notes/5-ds.wav");
});

function play(path) {
  const sound = new Audio();
  const source = document.createElement("source");
  source.src = path;
  sound.appendChild(source);
  sound.play();
}

const whiteKeys = Array.from(document.querySelectorAll("white"));

const keys = document.querySelectorAll("div");

keys.forEach((key) => {
  key.addEventListener("mousedown", function () {
    let keyText = key.innerText;
    if (key.dataset.key === keyText) {
      key.classList.add("white-keydown");
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
  });
});

document.body.addEventListener("keyup", function (e) {
  if (e.key === "a") {
    document.querySelector(".white-1").classList.remove("white-keydown");
    document.querySelector(".white-1").classList.add("white");
  }
});
