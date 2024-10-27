function displayTemperature(response){
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
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-search");
  let city = searchInput.value;
  let apiKey = "fe20f2b6eod4df7ae9c314ce54tfd350";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", search);

