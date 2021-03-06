const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Paths
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//initialize project as express
const app = express();
const port = process.env.PORT || 3000; //Heroku port || local

//handlers for setting paths 
app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Will Estes'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Will Estes'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Will Estes',
        helpText: 'Helpful text'
    });
});

app.get('/weather', (request, response) => {
    if(!request.query.address) {
        return response.send({
            error: 'No address provided'
        });
    }
    const address = request.query.address;
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return response.send(error);
        } else {
            forecast(latitude, longitude, (error, foreData) => {
                if(error) {
                    return response.send(error);
                } else if(!foreData) {
                    return response.send({
                        error: 'No information available'
                    });
                } else {
                    return response.send({
                        summary: foreData.summary,
                        highTemp: foreData.data[0].temperatureHigh,
                        lowTemp: foreData.data[0].temperatureLow,
                        latitude: latitude,
                        longitude: longitude,
                        location: location,
                        address: address
                    });
                }
            });
        }
    });
});

app.get('*', (request, response) => {
    response.render('404', {
        title: 'Error: The page you are looking for could not be found',
        name: 'Will Estes'
    })
});

app.listen(port, () => {
    console.log('server started: ' + port);
});