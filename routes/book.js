var express = require('express');
var request = require('request');
var router = express.Router();

var BOOK_SERVICE_URL = 'https://book-catalog-proxy-3.herokuapp.com/book?isbn=';

/* GET users listing. */
router.get('/:isbn', function(req, res, next) {
    request(`${BOOK_SERVICE_URL}${req.params.isbn}`, (err, response, body) => {
        if (err) {
            next(err);
            return;
        }

        var data = JSON.parse(body);
        const volume = data.items[0].volumeInfo
        var pageData = {
            bookTitle: volume.title,
            subtitle: volume.subtitle,
            bookCover: volume.imageLinks.thumbnail
        };

        res.render('book', pageData);
    });
});

module.exports = router;
