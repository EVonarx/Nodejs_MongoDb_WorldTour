var mongoose = require('mongoose');

/* mongoose shema of a city */
var placeShema = new mongoose.Schema(
    {   name : String,
        texts :  [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'text'
            }
        ],
        pictures : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'picture'
            }
        ]
    });

/* a virtual isn't stored in a db, it is a calculated field */
    placeShema.virtual('countries', 
    {
        ref : 'country',
        localField : '_id',
        foreignField : 'places'
    });


 /* A city can be accessed by...    */
 var place = mongoose.model ('place', placeShema);
 module.exports = place;