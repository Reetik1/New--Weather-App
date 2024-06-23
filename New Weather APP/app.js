const APIKEY = '6e6720e3704948218c4210539242204';
const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const useLocationBtn = document.getElementById('useLocationBtn');

const cityName = document.getElementById('city-name');
const countryName = document.getElementById('countryName');
const localTime = document.getElementById('loc-time');
const temp = document.getElementById('temp');
const sup = document.getElementById('sup');

async function getData(key, query) {
    const response = await fetch(`${API_BASE_URL}?key=${key}&q=${query}&aqi=yes`);
    if (!response.ok) {
        throw new Error('Weather data not found');
    }
    return await response.json();
}

function updateWeatherData(result) {
    document.getElementById('outputCard').style.visibility = 'visible';
    cityName.innerText = `${result.location.name}, ${result.location.region}`;
    countryName.innerText = result.location.country;
    temp.innerText = result.current.temp_c;
    sup.innerText = '°C';
    localTime.innerText = `Local time: ${result.location.localtime}`;
}

async function fetchWeatherData(query) {
    try {
        const result = await getData(APIKEY, query);
        updateWeatherData(result);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

searchBtn.addEventListener('click', () => {
    const input = cityInput.value.trim();
    if (input) {
        fetchWeatherData(input);
    } else {
        alert('Please enter a city name');
    }
});


useLocationBtn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(`${latitude},${longitude}`);
            },
            error => {
                console.error('Error getting location:', error);
                alert('Failed to get your location. Please enter a city manually.');
            }
        );
    } else {
        alert("Geolocation is not supported by your browser. Please enter a city manually.");
    }
});

window.addEventListener('load', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(`${latitude},${longitude}`);
            },
            error => {
                console.error('Error getting location:', error);
                // Don't show an alert on page load, just log the error
            }
        );
    }
});




// ... (keep the existing code, and add the following at the end)

function updateWeatherData(result) {
    const outputCard = document.getElementById('outputCard');
    outputCard.style.display = 'block';
    cityName.innerText = `${result.location.name}, ${result.location.region}`;
    countryName.innerText = result.location.country;
    temp.innerText = result.current.temp_c;
    sup.innerText = '°C';
    localTime.innerText = `Local time: ${result.location.localtime}`;

    // Add weather icon
    const weatherIcon = document.getElementById('weather-icon');
    const condition = result.current.condition.text.toLowerCase();
    if (condition.includes('sun') || condition.includes('clear')) {
        weatherIcon.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (condition.includes('cloud')) {
        weatherIcon.innerHTML = '<i class="fas fa-cloud"></i>';
    } else if (condition.includes('rain')) {
        weatherIcon.innerHTML = '<i class="fas fa-cloud-rain"></i>';
    } else if (condition.includes('snow')) {
        weatherIcon.innerHTML = '<i class="fas fa-snowflake"></i>';
    } else {
        weatherIcon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    }

    // Add animation
    outputCard.style.animation = 'none';
    outputCard.offsetHeight; // Trigger reflow
    outputCard.style.animation = null;
}

// Add this function to create animated background bubbles
function createBubbles() {
    const container = document.querySelector('.background-animation');
    const bubbleCount = 20;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(bubble);
    }
}

// Call createBubbles on window load
window.addEventListener('load', createBubbles);