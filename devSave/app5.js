var express = require('express'); // module for web application
var mongoose = require('mongoose'); // ORM module for MongoDb
var ejs = require('ejs'); // module for template engine

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
app.use('/css', express.static('css'))

/* once the routes have been defined, add... */
app.use('/help', require('./routes/help'));
app.use('/places', require('./routes/places'));
app.use('/countries', require('./routes/countries'));

/* first test to see if 'Hello' appears in the browser after entering address localhost:3000 */
/*
app.get('/', (req, res) => {
 res.send('Hello');
}); 
*/

console.log('application worldtour started on port 3000');
app.listen(3000);
