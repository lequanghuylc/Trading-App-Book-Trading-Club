var connect = require('./db');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("book");
        foo.find(val).toArray(function(err, docs){
            if(err){throw err;}
            callback(docs);
            db.close();
        });
    });
}