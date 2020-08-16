const clockContainer = document.querySelector(".js-clock");
const clokcTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clokcTitle.innerText = `${makeTwoDigit(hours)}:${makeTwoDigit(
    minutes
  )}:${makeTwoDigit(seconds)}`;
}

function makeTwoDigit(number) {
  return number < 10 ? `0${number}` : "" + number;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
