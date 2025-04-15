const apiKey = '19497cd2694d187b0074db7461c41bf8';
const city = 'Malolos';
const countryCode = 'PH';

const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&units=metric`;

let celsiusTemp = null;
let isCelsius = true;

// Fetch and display current weather
async function getWeather() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error('Weather data fetch failed.');

    const data = await response.json();

    celsiusTemp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

    // Update DOM
    document.getElementById('temp').textContent = celsiusTemp;
    document.getElementById('desc').textContent = description;
    document.getElementById('unit').textContent = 'C';

    const iconImg = document.getElementById('weather-icon');
    iconImg.src = iconURL;
    iconImg.alt = description;
    iconImg.style.display = 'inline';

    // Optional animation class (add animation in CSS)
    iconImg.classList.add('weather-icon');
  } catch (error) {
    console.error('Error fetching current weather:', error);
    document.getElementById('desc').textContent = 'Weather unavailable';
  }
}

// Fetch and display 3-day forecast
async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) throw new Error('Forecast fetch failed.');

    const data = await response.json();
    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    const today = new Date().getDate();
    const shownDays = new Set();
    let count = 0;

    for (let entry of data.list) {
      const date = new Date(entry.dt_txt);
      const day = date.getDate();
      const hour = date.getHours();

      if (hour === 12 && day !== today && !shownDays.has(day)) {
        shownDays.add(day);
        count++;

        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        let temp = Math.round(entry.main.temp);
        if (!isCelsius) {
          temp = ((temp * 9) / 5 + 32).toFixed(1);
        }
        const icon = entry.weather[0].icon;
        const description = entry.weather[0].main;

        const li = document.createElement('li');
        li.innerHTML = `
        <strong>${weekday}</strong>: ${temp}°${isCelsius ? 'C' : 'F'} - ${description}
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
      `;
        forecastList.appendChild(li);
      }

      if (count === 3) break;
    }
  } catch (error) {
    console.error('Error fetching forecast:', error);
    document.getElementById('forecast-list').innerHTML = '<li>Forecast unavailable</li>';
  }
}

// Toggle between Celsius and Fahrenheit
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-temp');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (celsiusTemp !== null) {
        isCelsius = !isCelsius;
        const displayTemp = isCelsius
          ? celsiusTemp
          : ((celsiusTemp * 9) / 5 + 32).toFixed(1);
        document.getElementById('temp').textContent = displayTemp;
        document.getElementById('unit').textContent = isCelsius ? 'C' : 'F';
    
        getForecast();
      }
    });
  }

  // Initial load
  getWeather();
  getForecast();

  // Auto-refresh every 10 minutes
  setInterval(() => {
    getWeather();
    getForecast();
  }, 10 * 60 * 1000);
});