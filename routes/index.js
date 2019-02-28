var express = require('express');
var router = express.Router();
var loginURL = process.env.DBLOGIN || require('../logindata.js');

const validateBookSubInput = require('../validation/submit');

function connect(callback) {
    var MongoClient = require('mongodb').MongoClient;

    // MongoDB.Atlas
    var url = loginURL;
    var client = new MongoClient(url, { useNewUrlParser: true });

    // MongoDB.Local
    // var url = 'mongodb://localhost:27017';
    // var client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function(err) {
        if (err !== null) throw err;

        var db = client.db('dbBooks');
        var books = db.collection('books');

        callback(books, client);
    });
}

function getBooks(callback) {
    connect(function(books, client) {
        books
            .find({})
            .limit(100)
            .toArray(function(err, docs) {
                if (err !== null) throw err;
                callback(docs);
                client.close();
            });
    });
}

function createBook(c, callback) {
    connect(function(books) {
        books.insertOne(c, function(err, result) {
            if (err !== null) throw err;
            callback(result);
        });
    });
}

router.post('/createBook', function(req, res) {
    const { errors, isValid } = validateBookSubInput(req.body);

    // validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    createBook(
        {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            bookURL: req.body.bookURL,
            location: req.body.location,
            isrented: false
        },
        function(result) {
            res.send(result);
        }
    );
});

router.get('/getBooks', function(req, res) {
    getBooks(function(docs) {
        res.send(docs);
    });
});

module.exports = router;
