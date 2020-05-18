var express = require('express'); // module for web application
var mongoose = require('mongoose'); // ORM module for MongoDb
var ejs = require('ejs'); // template engine
var country = require('./models/country'); // relative path

mongoose.connect('mongodb://localhost/worldtour', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* once the models have been defined, add... */
require('./models/place');
require('./models/country');

var app = express();

/* middleware permettant d'accéder à des fichiers statiques */
/* ici le css pourra être inclus dans des fichiers html => voir layout_header.ejs */
/* http://localhost:3000/css/bootstrap.min.css */
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css') );

/* once the routes have been defined, add... */
app.use('/', require('./routes/test'));
app.use('/places', require('./routes/places'));
//app.use('/countries', require('./routes/countries'));

/* first test to see if 'Hello' appears in the browser after entering adress localhost:3000 */
/*
app.get('/', (req, res) => {
 res.send('Hello');
}); 
*/

app.get('/countries', (req, res) => {
    country.find({}).populate('places').then(countries => {
        res.render('countries/index.ejs', { displayCountries: countries })
    })

});

//Be careful : the order of the routes are important !!!!
app.get('/countries/new', (req, res) => {
    var country1 = new country();

    res.render('countries/edit.ejs', { displayCountry: country1 });

});

//Be careful : the order of the routes are important !!!! Here it takes everything behind /edit 
app.get('/countries/edit/:id', (req, res) => {
   
    country.findById(req.params.id).populate('places').then(country2 => {
        res.render('countries/edit.ejs', { displayCountry: country2 })
    }, err => res.send(err))

});

//Be careful : the order of the routes are important !!!! Here it takes everything behind /countries
app.get('/countries/:id', (req, res) => {


    /* first without places
country.findById(req.params.id).then(country => {
    res.render('countries/onlyOneCountry.ejs', {displayCountry : country})
}, err => res.send(err))
*/

    country.findById(req.params.id).populate('places').then(country => {
        res.render('countries/show.ejs', { displayCountry: country })
    }, err => res.send(err))



});




console.log('application worldtour started on port 3000');
app.listen(3000);
