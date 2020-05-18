var express = require('express');
var router = express.Router(); // middleware to manage routes

//var country = require('C://WorldTour//models//country'); // absolute path
var country = require('./../models/country'); // relative path
var place = require('./../models/place'); // relative path

/* Notice: when you send the  request "country.find({})", mongoose will only get all the countries in the Db 
and not the cities in clear text but the ObjectID of the cities (because cities is an array). 
To get also cities in clear text, add ".populate('cities')"
    country.find({}).populate('cities').then(countries => {
        res.render('countries/index.ejs', {displayCountries : countries})
    })
    */


/* Test to see if "/countries" works
router.get('/', (req, res) => {
   res.send('i am in countries.js');
});
*/

router.get('/', (req, res) => {
    country.find({}).sort({ 'number': 1 }).then(countries => {
        res.render('countries/countries.ejs', { displayCountries: countries })
    })

});

//Be careful : the order of the routes are important !!!!
router.get('/new', (req, res) => {
    //place.find({}).then(places => {
    var country1 = new country();
    res.render('countries/edit.ejs', { displayCountry: country1, endpoint: '/countries' });
    //});
});

//Be careful : the order of the routes are important !!!! Here it takes everything behind /edit 
router.get('/edit/:id', (req, res) => {
    country.findById(req.params.id).then(country2 => {
        res.render('countries/edit.ejs', { displayCountry: country2, endpoint: '/countries/' + country2._id })
    }, err => res.send("Couldn't find this country"))

});

//Be careful : the order of the routes are important !!!! Here it takes everything behind /countries
router.get('/:id', (req, res) => {
    country.findById(req.params.id).populate({ path: 'places', options: { sort: { 'number': 1 } } }).then(country => {
        //console.log("country :"+country); // !!!!! So useful ;-)
        res.render('countries/show.ejs', { displayCountry: country })
    }, err => res.send(err))
});

/* 
Step1 : get the country id
Step2 : for each place linked to the country => delete place
Step3 : delete the country
*/
router.get('/delete/:id', (req, res) => {
    var saveCountryId;

    new Promise((resolve, reject) => {
        resolve(country.findById(req.params.id).populate('places')); // new place
    }
    ).then((country1) => {
        saveCountryId = country1._id;
        //console.log("saveCountryId=" + saveCountryId);

        // for (var i=0; i < country1.places.length; i++) { // Step2 : for each place linked to the country => delete place
        //console.log("number of places of this country=" + country1.places.length);
        //console.log("places for this country=" + country1.places);
        //return place.findById(country1.places[0]._id);
        
        findAndDeletePlaces(country1);
       
        /*
    }, err => res.send("the place to delete couldn't be found..."))
        .then((place1) => {
            console.log("place found = " + place1);
            place1.delete(); */
    }, err => res.send("the place couldn't be deleted..."))
        .then(() => {
            return country.findById(saveCountryId);
        }, err => res.send("The country to delete couldn't be found..."))
        .then((country1) => {
            //console.log("country to delete = "+country1.name);
            country1.delete(); // Step 3 : delete the country
        }, err => res.send("The country couldn't be deleted..."))
        .then(() => {
            res.redirect('/countries'); // once the country and its linked places are deleted we make a redirect to "/countries"
        });
});


function findplace(id) {
    
    return new Promise((resolve) => {
        place.findById(id).then((place1) => {
            //console.log("this is a place for this country=" + place1)
            resolve (place1);
        });

    });
}

function deleteplace(place1) {
    return new Promise((resolve) => {
        //console.log("this is a place to delete = " + place1);
        resolve (place1.delete());
    });
}

async function findAndDeletePlaces(country1) {
   
    for (var i = 0; i < country1.places.length; i++) {
        //console.log("number of places of this country=" + country1.places.length);
        await findplace(country1.places[i]._id).then((place1) => {
            deleteThisPlace(place1);

        })
    }
}

async function deleteThisPlace(place1) {
    
    await deleteplace(place1).then(() => {
    });
}


// The parameter here is optional. If there is a parameter => update of a country. If not parameter => new country
router.post('/:id?', (req, res) => {
    new Promise((resolve, reject) => {
        if (req.params.id) { // update a country
            country.findById(req.params.id).then(resolve, reject);
        } else {
            resolve(new country); // new country
        }

    }).then(country => {   // once the country is available, it is used to do more operations
        country.name = req.body.name;
        country.description = req.body.description;
        country.number = req.body.number;
        if (req.file) country.picture = req.file.filename;

        return country.save(); // the country is saved in the DB

    }).then(() => { // once the country is saved we make a redirect to "/countries"
        res.redirect('/countries');
    });
});

module.exports = router;