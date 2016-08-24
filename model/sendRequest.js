var connect = require('./db');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("request");
        foo.insert(val, function(err, record){
            if(err){throw err}
            var bar = db.collection("book");
            bar.find({"username": val.to, "_id": ObjectId(val.toBook)}).toArray(function(err, docs){
            if(err){throw err;}
               if(typeof docs[0].request == "undefined"){
                  var request = [];
               } else {var request =JSON.parse(docs[0].request);}
               request.push(val.from);
               bar.update({"username": val.to, "_id": ObjectId(val.toBook)},{
                   $set: {request: JSON.stringify(request)}
               },function(err, record2){
                   if(err){throw err}
                   callback();
                   db.close();
               });
            });
        });
        
    });
}