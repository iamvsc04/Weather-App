const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorPart = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
search.addEventListener("click", () => {
  const APIKey = "bd5e378503939ddaee76f12ad7a97608";
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        errorPart.classList.add("active");
        return;
      }
      const image = document.querySelector(".weather-box img");
      const temp = document.querySelector(".weather-box .temperature");
      const desc = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        errorPart.classList.remove("active");
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;

          case "Cloud":
            image.src = "images/cloud.png";
            break;
          case "Mist":
            image.src = "images/mist.png";
            break;
          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Haze":
            image.src = "images/mist.png";
            break;
          default:
            image.src = "images/cloud.png";
        }
        temp.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} kmph`;
      }
    });
});
