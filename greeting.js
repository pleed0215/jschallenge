const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintGreetings(text) {
  const nowTime = new Date();
  const hour = nowTime.getHours();
  let hiSentence = "";
  console.log(hour);

  if (hour >= 5 && hour < 12) {
    hiSentence = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    hiSentence = "Good afternoon";
  } else if ((hour >= 17 && hour < 24) || (hour >= 0 && hour < 5)) {
    hiSentence = "Good evening";
  }

  form.classList.remove(SHOWING_CN);
  greetings.classList.add(SHOWING_CN);
  greetings.style.cursor = "pointer";
  greetings.innerText = `${hiSentence}, ${text}!`;
  greetings.addEventListener("click", (_) => {
    localStorage.removeItem(USER_LS);
    window.location.reload();
  });
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;

  saveName(currentValue);
  paintGreetings(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    askForName();
  } else {
    paintGreetings(currentUser);
  }
}

function init() {
  loadName();
}

init();
