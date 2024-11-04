function refreshWeather(response){
    let updatedTemp = document.querySelector("#temperature-number");
    let temperature = Math.round(response.data.temperature.current);
    let updatedCity = document.querySelector("#weather-app-city");
    let humidity = response.data.temperature.humidity;
    let updatedHumidity = document.querySelector("#humidity");
    let windSpeed = response.data.wind.speed;
    let updatedSpeed = document.querySelector("#wind")
    let icon = response.data.condition.icon_url;
    let updatedIcon = document.querySelector("#temperature-icon");
    let description = response.data.condition.description;
    let updatedDescription = document.querySelector("#weather-description");
    let time = response.data.time;
    let updatedTime = document.querySelector("#current-date")
    let date = new Date(time * 1000);
    let options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
    let formattedTime = date.toLocaleString("en-US", options);
    console.log(description);
    updatedCity.innerHTML = response.data.city;
    updatedTemp.innerHTML = temperature;
    updatedHumidity.innerHTML = humidity;
    updatedSpeed.innerHTML = windSpeed;
    updatedIcon.src = icon;
    updatedDescription.innerHTML = description;
    updatedTime.innerHTML = formattedTime;

    getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "fe20f2b6eod4df7ae9c314ce54tfd350";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-search");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", handleSearchSubmit);


function getForecast(city) {
  let apiKey = "fe20f2b6eod4df7ae9c314ce54tfd350";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()]
} 

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml =
      forecastHtml +
      ` 
                <div class="weather-forecast-day">
                    <div class="forecast-date">${formatDay(day.time)}</div>
                    <div><img src="${
                      day.condition.icon_url
                    }" class="forecast-date-icon"/></div>
                    <div class="forecast-temperatures">
                        <div class="forecast-temperature-one">
                            <strong>${Math.round(
                              day.temperature.maximum
                            )}º</strong>
                        </div>
                        <div class="forecast-temperature-two">${Math.round(
                          day.temperature.minimum
                        )}º</div>
                    </div>
                </div>`;
                      }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

searchCity("Paris");