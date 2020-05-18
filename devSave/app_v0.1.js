var express = require('express'); // module for web application

var app = express();

/* first test to see if 'Hello' appears in the browser after entering adress localhost:3000 */
app.get('/', (req, res) => {
 res.send('Hello');
}); 

app.get('/countries', (req, res) => {
    res.render('countries/index.html')
});

console.log('application worldtour started on port 3000');
app.listen(3000);
