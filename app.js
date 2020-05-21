var express = require('express'); // module for web application
var mongoose = require('mongoose'); // ORM module for MongoDb
var ejs = require('ejs'); // module for template engine
var bodyParser = require('body-parser'); // module to parse the html response and transform the HTML inputs into a javascript object
var multer = require('multer'); // module to manage the upload of the images

/*
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://evonarx:azerty123456@cluster0-0rax1.mongodb.net/worldtour?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(uri);
*/

var upload = multer({
    dest : __dirname + '/img'
})

// connection to local db
/*
mongoose.connect('mongodb://localhost/worldtour', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
*/
// connection to remote db
mongoose.connect('mongodb+srv://evonarx:azerty123456@cluster0-0rax1.mongodb.net/worldtour?retryWrites=true&w=majority');

/* once the models have been defined, add... */
require('./models/place');
require('./models/country');

var app = express();

app.use(bodyParser.urlencoded());
app.use(upload.single('file')); // the name of field in the HTML is 'file'

/* middleware permettant d'accéder à des fichiers statiques */
/* ici le css pourra être inclus dans des fichiers html => voir layout_header.ejs */
/* http://localhost:3000/css/bootstrap.min.css */
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css') );
app.use('/css', express.static('css'))
app.use('/img', express.static(__dirname + '/img'))

/* once the routes have been defined, add... */
app.use('/help', require('./routes/help'));
app.use('/places', require('./routes/places'));
app.use('/countries', require('./routes/countries'));

/*
async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


main().catch(console.error);
*/

/* first test to see if 'Hello' appears in the browser after entering address localhost:3000 */
/*
app.get('/', (req, res) => {
 res.send('Hello');
}); 
*/

console.log('application worldtour started on port 3000');
app.listen(3000);
