const date = document.getElementById("date");
const day = document.getElementById("day");
const weatherLocation = document.getElementById("location");
const celsius = document.getElementById("celsius");
const weatherInfo = document.getElementById("weatherInfo");
const loading = document.getElementById("loading");
const icon = document.getElementById("icon");
const errorModalContainer = document.getElementById("errorModalContainer");

const getDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const getMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.forms[0];
const openWeatherMapIcon = "https://openweathermap.org/img/wn/";
const baseURI = "https://api.openweathermap.org/data/2.5/";
const errorIcon = document.createElement("i");
errorIcon.classList.add("bi", "bi-ban");

form.addEventListener("submit", (e) => {
  loading.classList.add("active");
  e.preventDefault();
  let city = e.target[0].value ? e.target[0].value : "Yerevan";
  getWeatherData(city);
});

function getWeatherData(city = "Yerevan") {
  errorModalContainer.textContent = "";
  fetch(`${baseURI}weather?q=${city}&appid=ba8608127335c6068af01ea8e811dad7`)
    .then((response) => response.json())
    .then((response) => renderWeather(response))
    .catch(() => {
      errorModalContainer.append(errorIcon, `${city}- city not found`);
      errorModalContainer.style.cssText = "transform: translateX(-20px)";
      setTimeout(() => {
        errorModalContainer.style.cssText = "";
      }, 2000);
    })
    .finally(() => loading.classList.remove("active"));
}

function renderWeather(obj) {
  const newDate = new Date();
  const amisAmsativ = `${newDate.getDate()} ${
    getMonth[newDate.getMonth()]
  } ${newDate.getFullYear()}`;
  console.log(newDate.getMonth());
  weatherLocation.textContent = obj.name;
  day.textContent = getDay[newDate.getDay()];
  date.textContent = amisAmsativ;
  icon.src = `${openWeatherMapIcon}${obj.weather[0].icon}.png`;
  celsius.textContent = Math.round(obj.main.temp - 273.15);
  weatherInfo.textContent = obj.weather[0].description;
}

getWeatherData();