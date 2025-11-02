const date = document.getElementById("date");
const day = document.getElementById("day");
const weatherLocation = document.getElementById("location");
const celsius = document.getElementById("celsius");
const weatherInfo = document.getElementById("weatherInfo");
const loading = document.getElementById("loading");
const icon = document.getElementById("icon");

const getDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const getMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const openweathermapIcon = "https://openweathermap.org/img/wn/";

const weatherConfig = {
    lat: 40.1386109,
    lon: 44.7623344,
    appid: "51829803db0509d11999386b5f13f0df"
}
loading.classList.add("active");
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherConfig.lat}&lon=${weatherConfig.lon}&exclude=current&units=metric&appid=${weatherConfig.appid}`)
    .then(response => response.json())
    .then(response => renderWeather(response))
    .catch(err => alert("Sxal e texi unecel"))
    .finally(() => loading.classList.remove("active"));

function renderWeather(obj) {
    const newDate = new Date();
    const amisAmsativ = `${newDate.getDate()} ${getMonth[newDate.getMonth()]} ${newDate.getFullYear()}`;
    console.log(newDate.getMonth());
    weatherLocation.textContent = obj.name;
    day.textContent = getDay[newDate.getDay()];
    date.textContent = amisAmsativ;
    console.log(obj)
    icon.src = `${openweathermapIcon + obj.weather[0].icon + ".png"}`;
    celsius.textContent = Math.round(obj.main.temp);
    weatherInfo.textContent = obj.weather[0].description;
}

