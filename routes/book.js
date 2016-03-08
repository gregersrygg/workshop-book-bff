var express = require('express');
var goodGuy = require('good-guy-http')({
    maxRetries: 3
});
var jp = require('jsonpath');
var router = new express.Router();

var BOOK_SERVICE_URL = 'https://book-catalog-proxy-5.herokuapp.com/book?isbn=';

router.get('/:isbn', function (req, res, next) {
    goodGuy(`${BOOK_SERVICE_URL}${req.params.isbn}`).then(response => {
        const data = JSON.parse(response.body);
        const volume = jp.value(data, '$..volumeInfo');

        var pageData = {
            bookTitle: volume.title,
            subtitle: volume.subtitle,
            bookCover: jp.value(volume, '$..thumbnail')
        };

        res.render('book', pageData);
    }).catch(next);
});

module.exports = router;
