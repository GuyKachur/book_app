var express = require('express');
var router = express.Router();
var loginURL = require('../logindata.js');

function connect(callback) {
    var MongoClient = require('mongodb').MongoClient;

    // var url = loginURL;

    // var client = new MongoClient(url, { useNewUrlParser: true });

    var url = 'mongodb://localhost:27017';

    var client = new MongoClient(url);

    client.connect(function(err) {
        if (err !== null) throw err;

        var db = client.db('dbBooks');
        var books = db.collection('books');

        console.log('Connected to books!');
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
                console.log('got ' + docs.length + ' books');
                callback(docs);
                client.close();
            });
    });
}

function createBook(c, callback) {
    connect(function(books, client) {
        books.insertOne(c, function(err, result) {
            if (err !== null) throw err;
            console.log('Inserted!!!');
            callback(result);
        });
    });
}

router.post('/createBook', function(req, res, next) {
    createBook(
        {
            text: req.body.text,
            author: req.body.author,
            isrented: false
        },
        function(result) {
            console.log('Inserted, sending result');
            res.send(result);
        }
    );
});

router.get('/getBooks', function(req, res, next) {
    console.log('Getting Books');
    getBooks(function(docs) {
        res.send(docs);
    });
});

module.exports = router;
