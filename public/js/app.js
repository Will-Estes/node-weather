
const weatherForm = document.querySelector('form');
const searchInput = weatherForm.querySelector('input');
const providedLocation = document.querySelector('#location');
const forecastResponse = document.querySelector('#forecast-response');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    forecastResponse.textContent = "Loading...";
    providedLocation.textContent = "Loading...";
    const address = searchInput.value;
    
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                forecastResponse.textContent = data.error;
            } else {
                providedLocation.textContent = data.location;
                forecastResponse.textContent = data.summary;
            }
        });
    });
});