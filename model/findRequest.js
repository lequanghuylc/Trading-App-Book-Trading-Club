var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("request");
        foo.find({from: val}).toArray(function(err, docs){
            if(err){throw err;}
            foo.find({to: val}).toArray(function(err, docs2){
                if(err){throw err;}
                callback(docs.concat(docs2));
            });
            db.close();
        });
    });
}