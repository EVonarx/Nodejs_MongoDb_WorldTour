var express = require('express');
var router = express.Router();

//var place = require('C://WorldTour//models//place'); // absolute path
var place = require('./../models/place'); // relative path
var country = require('./../models/country'); // relative path

/* BEGIN - HANDLING OF A PLACE LINKED TO COUNTRY */
// !!! here it is the id of the country !!!
router.get('/new/:id', (req, res) => {
    console.log("route get places/new/:id with id = idcountry = "+req.params.id)
    var newPlace = new place();
    res.render('places/edit.ejs', { displayPlace: newPlace, endpoint: '/places/placeandcountry/'+req.params.id });
});

//POST
// !!! here it is the id of the country !!!
router.post('/placeandcountry/:id?', (req, res) => {
    console.log("route post places/placeandcountry/:id with id = idcountry = "+req.params.id)
    var savePlaceId;
    new Promise((resolve, reject) => {
            resolve(new place); // new place
        }
    ).then(place1 => {   // once the place is available, it is used to put the params in
        place1.name = req.body.name;
        place1.number = req.body.number;
        place1.texts = req.body.text;
        if (req.file) place1.pictures = req.file.filename;
        //console.log("place.name=" + place.name + "    place.number=" + place.number + "    place.texts=" + place.texts);
        return place1.save(); // save the place in the DB
    }).then((place2) => { // once the place is saved, save the place id then get the country
        console.log("A new place has been created with id = "+place2._id);
        savePlaceId = place2._id; //save the place id for later
        return country.findById(req.params.id).populate('places');
    }).then(country1 => { // once the place is saved then
        //console.log("country1.places.length = " + country1.places.length);
        //console.log("country1.places = " + country1.places);
        //console.log("country1.places[0] = " + country1.places[0]);
        //console.log("country1.places[1] = " + country1.places[1]);
        //country1.places[country1.places.length] = { "_id": temp};
       
        countryToUpdate = new country();
        countryToUpdate = country1;
        countryToUpdate.places.push({ "_id": savePlaceId});

        return countryToUpdate.save(); 
    }).then(country2 => {
        //console.log("country2 = " + country2);
        res.redirect('/countries/' + country2._id);  // once the place and the country are saved, we make a redirect to "/countries"
    });
});
/* END - HANDLING OF A PLACE LINKED TO COUNTRY */

/* BEGIN -- HANDLING OF A PLACE INDEPENDENTLY => localhost:3000/places */
router.get('/', (req, res) => {
    //res.send('Hello /places');
    place.find({}).then(places => {
        res.render('places/places.ejs', { displayPlaces: places });
    });
});

//Be careful : the order of the routes are important !!!!
//Here "/new" has to be before "/:id"
//=> localhost:3000/places/new
router.get('/new', (req, res) => {
    var newPlace = new place();
    res.render('places/edit.ejs', { displayPlace: newPlace, endpoint: '/places' });
});

//=> localhost:3000/places/34344555667
router.get('/:id', (req, res) => {
    place.findById(req.params.id).then(place => {
        res.render('places/show.ejs', { displayPlace: place })
    }, err => res.send(err))
});

//=> localhost:3000/places/edit/34344555667
router.get('/edit/:id', (req, res) => {
    place.findById(req.params.id).then(place => {
        res.render('places/edit.ejs', { displayPlace: place, endpoint: '/places/'+ req.params.id})
    }, err => res.send(err));
});

//=> localhost:3000/places/delete/34344555667
router.get('/delete/:id', (req, res) => {
    place.findById(req.params.id).then(place => {
        return place.delete(); // the place is deleted in the DB
    }, err => res.send(err)).then(() => { // once the place is deleted we make a redirect to "/places"
        res.redirect('/countries');
    });
});

//Be careful : the order of the routes are important !!!!
//POST
router.post('/:id?', (req, res) => {
    console.log("route post places/:id");
    new Promise((resolve, reject) => {
        if (req.params.id) { // update a place
            place.findById(req.params.id).then(resolve, reject);
        } else {
            resolve(new place); // new place
        }
    }).then(place => {   // once the place is available, it is used to put the params in
        place.name = req.body.name;
        place.number = req.body.number;
        place.texts = req.body.text;
        if (req.file) place.pictures = req.file.filename;
        //console.log("place.name=" + place.name + "    place.number=" + place.number + "    place.texts=" + place.texts);
        return place.save(); // save the place in the DB
    }).then(place => {
        res.render('places/show.ejs', { displayPlace: place })
        //res.redirect('/places');
    });
});

/* END -- HANDLING OF A PLACE INDEPENDENTLY */




module.exports = router;