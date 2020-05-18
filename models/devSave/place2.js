var mongoose = require('mongoose');

/* mongoose shema of a city */
var placeShema = new mongoose.Schema(
    {   name : String,
        texts :  [
        ],
        pictures : [ 
        ]
    });

/* a virtual isn't stored in a db, it is a calculated field */
/*  relation many to many */
    placeShema.virtual('countries', 
    {
        ref : 'country',
        localField : '_id',
        foreignField : 'places'
    });


 /* A city can be accessed by...    */
 var place = mongoose.model ('place', placeShema);
 module.exports = place;