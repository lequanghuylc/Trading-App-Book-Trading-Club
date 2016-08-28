var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(val1, val2, callback){
    connect(function(db){
        var foo = db.collection("user");
        foo.update(val1, val2, function(err, record){
            if(err){throw err}
            callback(record);
            db.close();
        });
    });
}