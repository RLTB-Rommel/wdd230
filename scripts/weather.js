const apiKey = '19497cd2694d187b0074db7461c41bf8';
const city = 'Malabon';
const countryCode = 'PH';

// Use imperial units for Fahrenheit
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;

async function getWeather() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error('Weather data fetch failed.');

    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].main;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

    // Update the DOM
    document.getElementById('temp').textContent = temp;
    document.getElementById('desc').textContent = description;
    document.getElementById('unit').textContent = 'F'; // Optional, if you show °F dynamically

    const iconImg = document.getElementById('weather-icon');
    iconImg.src = iconURL;
    iconImg.alt = description;
    iconImg.style.display = 'inline';
    iconImg.classList.add('show'); // Optional: fade-in animation
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('desc').textContent = 'Weather unavailable';
  }
}

// Call it on page load
getWeather();