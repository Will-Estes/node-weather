const request = require('request');
const key = 'a1ed8fe98bdf44842ac81d7c57faeaca';

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/' + key + '/' + lat + ',' + long;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback({ error: 'Error connecting to darksky service' }, undefined);
        } else if(body.error) {
            callback({ error: 'Error in coordinates. Please try a new location' }, undefined);
        } else {
            callback(undefined, body.daily.summary);
        }
    });
}

module.exports = forecast;