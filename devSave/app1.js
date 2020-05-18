var express = require('express'); // module for web application
var ejs = require('ejs'); // template engine

var app = express();

/* middleware permettant d'accéder à des fichiers statiques */
/* ici le css pourra être inclus dans des fichiers html => voir layout.html */
/* http://localhost:3000/css/bootstrap.min.css */
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css') );

/* first test to see if 'Hello' appears in the browser after entering adress localhost:3000 */
app.get('/', (req, res) => {
 res.send('Hello');
}); 

app.get('/countries', (req, res) => {

    var countries = {
        "name": "Bolivia",
        "number": 3,
        "description": "Bolivia is a landlocked country located in western-central South America. The constitutional capital is Sucre, while the seat of government and executive capital is La Paz. The largest city and principal industrial center is Santa Cruz de la Sierra, located on the Llanos Orientales (tropical lowlands), a mostly flat region in the east of the country.",
        "picture" : "",
        "cities": []
    };
    
    res.render('countries/index.ejs', {displayCountries : countries})

});


console.log('application worldtour started on port 3000');
app.listen(3000);
