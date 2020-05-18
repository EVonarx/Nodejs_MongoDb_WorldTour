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

    var countries = [
        {
            "name": "Germany",
            "number": 1,
            "description": "Germany is a country in Central and Western Europe. Covering an area of 357,022 square kilometres, it lies between the Baltic and North seas to the north, and the Alps to the south. It borders Denmark to the north, Poland and the Czech Republic to the east, Austria and Switzerland to the south, and France, Luxembourg, Belgium, and the Netherlands to the west.",
            "picture": "",
            "cities": [
                {
                    "city": "Munich"
                }
            ]
        },
        {
            "name": "USA",
            "number": 2,
            "description": "USA is a country consisting of 50 states, a federal district, five major self-governing territories, and various possessions. At 9.8 million square kilometres, it is the world's third- or fourth-largest country by total area.[c] Most of the country is located in central North America between Canada and Mexico. With an estimated population of over 328 million, the U.S. is the third most populous country in the world (after China and India). The capital is Washington, D.C., and the most populous city is New York City. ",
            "picture": "",
            "cities": [
                {
                    "city": "Monument-Valley"
                },
                {
                    "city": "New-York"
                }
            ]
        }];
    
    res.render('countries/index.ejs', {displayCountries : countries})

});


console.log('application worldtour started on port 3000');
app.listen(3000);
