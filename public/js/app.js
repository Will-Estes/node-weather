
const weatherForm = document.querySelector('form');
const searchInput = weatherForm.querySelector('input');
const providedLocation = document.querySelector('#location');
const forecastResponse = document.querySelector('#forecast-response');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    forecastResponse.textContent = "Loading...";
    providedLocation.textContent = '';
    highTemp.textContent = '';
    lowTemp.textContent = '';
    const address = searchInput.value;
    
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                forecastResponse.textContent = data.error;
            } else {
                providedLocation.textContent = data.location;
                forecastResponse.textContent = data.summary;
                highTemp.textContent = 'High: ' + Math.round(data.highTemp);
                lowTemp.textContent = 'Low: ' + Math.round(data.lowTemp);
            }
        });
    });
});