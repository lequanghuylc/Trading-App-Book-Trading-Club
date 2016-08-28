var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("book");
        foo.update({"_id": ObjectId(val.toBook)},{
            $set: {"username": val.from}
        }, function(err, rec){
            if(err){throw err;}
            foo.update({"_id": ObjectId(val.fromBook)}, {
                $set: {"username": val.to}
            }, function(err, rec2){
                if(err){throw err}
                callback();
            })
        });
    });
}