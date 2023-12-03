const form = document.querySelector("form");
const input = document.querySelector("input");
const wind_speed = document.querySelector(".wind_speed");
const humidity = document.querySelector(".humidity");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const weather = document.querySelector(".weather_img");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "db39858a17msh01e5f95254e7825p1051cajsnb2d8261f8cd2",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

async function weatherData(country) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${country}&days=3`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    temp.innerHTML = `${result.current.temp_c} ° C `;
    country.innerText = input.value;
    humidity.innerText = `${result.current.humidity}%`;
    wind_speed.innerText = `${result.current.wind_kph} Km/h`;
    if (parseInt(result.current.temp_c) >= 32) {
      weather.src = "./images/clear.png";
    } else if (parseInt(result.current.temp_c) <= 10) {
      weather.src = "./images/snow.png";
    } else {
      weather.src = "./images/clouds.png";
    }
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let countryName = input.value;
  let country = countryName.trim();
  city.innerHTML = country;

  if (country) {
    await weatherData(country);
  } else {
    console.log("Please enter a country.");
  }
});
