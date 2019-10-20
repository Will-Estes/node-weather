const request = require('request');
const key = 'pk.eyJ1Ijoid2lsbGlhbS1lc3RlcyIsImEiOiJjazF2MmR1NHMwNjFwM2JwNHY2MWl0M3BxIn0.tXUnw5vWFfqbzNomYvLghw';

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=' + key + '&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback({ error: 'Unable to connect to mapbox service' }, undefined);
        } else if(body.features.length === 0) {
            callback({ error: 'Unable to find location. Please try again' }, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;