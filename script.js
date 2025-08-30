const apiKey = '51aa5f1f28fbc963708d597cba354ffc'; // **API Key**
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const cityNameElement = document.getElementById('city-name');
const tempElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

// ตั้งค่าเริ่มต้น
cityNameElement.textContent = 'Please enter a city name';
tempElement.textContent = '';
descriptionElement.textContent = '';

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        cityNameElement.textContent = 'Please enter a city name';
        tempElement.textContent = '';
        descriptionElement.textContent = '';
    }
});

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        cityNameElement.textContent = 'City not found';
        tempElement.textContent = '';
        descriptionElement.textContent = '';
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temp = main.temp;
    const description = weather[0].description;

    cityNameElement.textContent = name;
    tempElement.textContent = `${Math.round(temp)}°C`;
    descriptionElement.textContent = description;
}