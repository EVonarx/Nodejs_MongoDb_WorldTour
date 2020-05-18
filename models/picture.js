var mongoose = require('mongoose');

/* mongoose shema of a country */
var pictureShema = new mongoose.Schema(
    {
        name: String,
    });


pictureShema.virtual('places',
    {
        ref: 'place',
        localField: '_id',
        foreignField: 'pictures'
    });
/* A picture can be accessed by...    */
var picture = mongoose.model('picture', pictureShema);
module.exports = picture;