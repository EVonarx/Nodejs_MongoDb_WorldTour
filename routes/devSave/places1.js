var express = require('express');
var router = express.Router();

//var place = require('C://WorldTour//models//place'); // absolute path
var place = require('./../models/place'); // relative path

router.get('/', (req, res) => {
    //res.send('Hello /places');
    place.find({}).then(places => {
        res.render('places/places.ejs', { displayPlaces: places });
    });
});

//Be careful : the order of the routes are important !!!!
router.get('/new/:id', (req, res) => {
    var newPlace = new place();
    res.render('places/edit.ejs', { displayPlace: newPlace, endpoint: '/' });
});


router.get('/:id', (req, res) => {
    place.findById(req.params.id).then(place => {
        res.render('places/show.ejs', { displayPlace: place })
    }, err => res.send(err))
});


//Be careful : the order of the routes are important !!!!
//POST
router.post('/new/:id?', (req, res) => {
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
        res.redirect('/place/' + place._id);  
    });
});


module.exports = router;