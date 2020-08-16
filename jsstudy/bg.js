const body = document.querySelector("body");
const IMAGE_COUNT = 15;
const IMAGE_FILE = [];
const IMAGE_DIR = "images/";

function handleLoadFinish() {}

function paintImage(imgNumber) {
  body.style.backgroundImage = `url(${IMAGE_FILE[imgNumber]}`;
  body.classList.add("bgImage");
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function init() {
  const randBagroundIndex = getRandomNumber(IMAGE_COUNT);

  for (var i = 0; i < IMAGE_COUNT; i++)
    IMAGE_FILE.push(`${IMAGE_DIR}sample${i + 1}.jpg`);
  paintImage(randBagroundIndex);
}

init();
