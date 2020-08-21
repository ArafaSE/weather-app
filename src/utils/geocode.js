const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent( address ) +".json?access_token=pk.eyJ1IjoibTNhcmFmYSIsImEiOiJja2UwMjBubTkxZ3M3MnNxaXJ4endkNmp5In0.q5gC1j8gOlDemBBAEZGp7g&limit=1"

    request({url: geocodeURL, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connet to location service!', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search')
        }else{
            callback(undefined, {
                location: response.body.features[0].place_name,
                lon: response.body.features[0].center[0],
                lat: response.body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode