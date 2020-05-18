var mongoose = require('mongoose');

/* mongoose shema of a country */
var textShema = new mongoose.Schema(
    {
        name: String,
    });


/* a virtual isn't stored in a db, it is a calculated field */
textShema.virtual('places',
    {
        ref: 'place',
        localField: '_id',
        foreignField: 'texts'
    });

/* A text can be accessed by...    */
var text = mongoose.model('text', textShema);
module.exports = text;