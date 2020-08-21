const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon="+ lon +"&appid=eceb6122744b1e6ad8dd8862d8f82c9d&units=metric"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod !== 200){
            callback(body.message, undefined)
        } else{
            callback(undefined,{
                temp: body.main.temp,
                description: body.weather[0].description,
                forecast: 'It is a ' + body.weather[0].description + ', and the temp is ' + body.main.temp + ' outside.'
            })
        }
    })
}

module.exports = forecast