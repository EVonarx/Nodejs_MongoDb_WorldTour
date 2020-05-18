var mongoose = require('mongoose');

/* mongoose shema of a city */
var placeShema = new mongoose.Schema(
    {   name : String,
        number: Number,
        texts: String,
        pictures : String
    });

    /* to get the country for a place => CHECK */
    /*a virtual isn't stored in a db, it is a calculated field */
    placeShema.virtual('countryId', 
    {
        localField : '_id', //link the local "_id" 
        ref : 'country', //to the foreigh "places" from the country model
        foreignField : 'places' 
    });


 /* A city can be accessed by...    */
 var place = mongoose.model ('place', placeShema);
 module.exports = place;