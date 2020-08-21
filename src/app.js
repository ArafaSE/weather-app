const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view locations 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed Arafa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpTxt: 'This is help text',
        name: 'Mohamed Arafa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mohamed Arafa'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address term!'
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lat, lon, (error, {temp, description, forecast}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                description,
                location,
                temp,
                forecast 
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        message: "Help Article not found!",
        name: 'Mohamed Arafa'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: "Page not found!",
        name: 'Mohamed Arafa'
    })
})

// Listener 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})