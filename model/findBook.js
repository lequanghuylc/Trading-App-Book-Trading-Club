var connect = require('./db');
var ObjectId = require('mongodb').ObjectId;
var findUser = require('./findUser');

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("book");
        foo.find(val).toArray(function(err, docs){
            if(err){throw err;}
            findUser({"username": docs[0].username}, function(data){
                docs[0].email = data[0].email;
                docs[0].address = data[0].address;
                docs[0].city = data[0].city;
                docs[0].state = data[0].state;
                callback(docs[0]);
                db.close();
            });
            
        });
    });
}