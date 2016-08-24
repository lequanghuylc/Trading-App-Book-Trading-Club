var connect = require('./db');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(callback){
    connect(function(db){
        var foo = db.collection("book");
        foo.find({}).toArray(function(err, docs){
            if(err){throw err;}
            callback(docs);
            db.close();
        });
    });
}