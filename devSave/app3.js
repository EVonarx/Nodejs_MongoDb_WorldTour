var express = require('express'); // module for web application
var mongoose = require('mongoose'); // ORM module for MongoDb
var ejs = require('ejs'); // template engine
//var country = require('C://WorldTour//models//country'); // absolute path
var country = require('./models/country'); // relative path

mongoose.connect('mongodb://localhost/worldtour', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

/* once the models have been defined, add... */
//require('./models/city');
require('./models/country');


var app = express();

/* middleware permettant d'accéder à des fichiers statiques */
/* ici le css pourra être inclus dans des fichiers html => voir layout.html */
/* http://localhost:3000/css/bootstrap.min.css */
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css') );

/* once the routes have been defined, add... */
//app.use('/cities', require('./routes/cities'));
//app.use('/countries', require('./routes/countries'));


/* first test to see if 'Hello' appears in the browser after entering adress localhost:3000 */
app.get('/', (req, res) => {
 res.send('Hello');
}); 

app.get('/countries', (req, res) => {
    /*country.find({}).populate('cities').then(countries => {
        res.render('countries/index.html', {countries : countries})
    })*/ 
    
    country.find({}).then(countries => {
        res.render('countries/index.ejs', {displayCountries : countries})
    })

});

console.log('application worldtour started on port 3000');
app.listen(3000);
