var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    //res.send('Hello test');
    res.render('help.ejs');
   });

module.exports = router;