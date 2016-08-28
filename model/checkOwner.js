var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("book");
        foo.find(val).toArray(function(err, docs){
            if(err){throw err;}
            if(docs.length === 0){callback(false);}
            else {callback(true);}
            db.close();
        });
    });
}