const COORDS_LS = "coords";
const API_KEY = "2e46d3899d3ca08b0137e22b2e4857b9";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${(temp - 273.15).toFixed(2)} ℃ @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude;

  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cannot access geolocation");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedObj = JSON.parse(loadedCoords);
    console.log(parsedObj);
    getWeather(parsedObj.latitude, parsedObj.longitude);
  }
}

function init() {
  loadCoords();
}

init();
