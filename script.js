const inputBox = document.querySelector(".input-box");



const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

const api_key = "ffe0c9ae4ddfa068bea5bf7d63c10e85";

const loadingSpinner = document.querySelector(".loading-spinner");

async function checkWeather(city) {
    loadingSpinner.style.display = "flex";

    try {
        const api_key = "ffe0c9ae4ddfa068bea5bf7d63c10e85";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const response = await fetch(url);
        const weather_data = await response.json();

        loadingSpinner.style.display = "none";

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Set UI content...
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        // Image switch logic...
    } catch (error) {
        loadingSpinner.style.display = "none";
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.error(error);
    }
}



searchBtn.addEventListener("click", () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});



window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const api_key = "ffe0c9ae4ddfa068bea5bf7d63c10e85";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    inputBox.value = data.name;
                    checkWeather(data.name);
                })
                .catch(error => {
                    console.error("Geo API error:", error);
                });
        });
    }
});
