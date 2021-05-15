let now = new Date();

let h2 = document.querySelector("li");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h2.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;


function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "595772f32b2e7808bc60ef54e46fcfa0";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeathercondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute(
    "src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature= response.data.main.temp;

  getForecast(response.data.coord);


}

function searchCity(city) {
  let apiKey = "595772f32b2e7808bc60ef54e46fcfa0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeathercondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "595772f32b2e7808bc60ef54e46fcfa0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


function formatDay(timestamp){
  let date= new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];

}



function displayForecast(response){
  let forecast =response.data.daily;
  let forecastElement = document.querySelector("#forecast");

let forecastHTML=`<div class="row">`;

let days = ["Thu", "Fri", "Sat", "Sun"];
forecast.forEach(function(forecastDay, index){

  if(index <6){

  forecastHTML=forecastHTML + `

  <div class="col-2">
    <div class="weather-forecaste-date">${formatDay(forecastDay.dt)}</div>
 
    <img
    src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="42"
    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}</span>
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}</span>
    
  </div>
 </div>
 `;
}
});

forecastHTML= forecastHTML + `</div>`;
  forecastElement.innerHTML= forecastHTML;
 
}




function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement= document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature= (celsiusTemperature * 9)/5+32;
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement= document.querySelector("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
}

let celsiusTemperature= null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


searchCity("New York");
