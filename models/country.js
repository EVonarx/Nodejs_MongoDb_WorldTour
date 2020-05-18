var mongoose = require('mongoose');

/* mongoose shema of a country */
var countryShema = new mongoose.Schema(
    {
        name: String,
        number: Number,
        description: String,
        picture: String,
        places :
            [

                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'place' // reference to the schema 'place'
                }
            ]
    });

/* A country can be accessed by...    */
var country = mongoose.model('country', countryShema);
module.exports = country;