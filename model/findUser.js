var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("user");
        foo.find(val, {"password": false}).toArray(function(err, docs){
            if(err){throw err;}
            callback(docs);
            db.close();
        });
    });
}