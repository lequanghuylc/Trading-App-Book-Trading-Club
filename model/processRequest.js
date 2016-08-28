var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;
var checkOwner = require('./checkOwner');
var swapBook = require('./swapBook');

module.exports = function(val, callback){
    connect(function(db){
        var book = db.collection("book");
        var req = db.collection("request");
       checkOwner({
           username: val.from,
           _id: ObjectId(val.fromBook)
       }, function(boo){
           if(!boo){processFail();}
           else {
               checkOwner({
                   username: val.to,
                   _id: ObjectId(val.toBook)
               }, function(foo2){
                   if(!boo){processFail();}
                   else{
                       nextStep();
                   }
               });
           }
       });
       function processFail(){
               var result = {message: "Process Request Failure, maybe one of you trade same book for other books of other members...",
                   status: false
               };
               req.update({"_id": ObjectId(val._id)}, {$set:{status: "canceled"}}, function(err, record){
                   if(err){throw err}
                   removeRequest(result);
               });
        }
        function nextStep(){
            if(val.action == "refused"){
                var result = {message: "You refused the request",
                   status: false
               };
                req.update({"_id": ObjectId(val._id)}, {$set:{status: "refused"}}, function(err, record){
                   if(err){throw err}
                   removeRequest(result);
               });
            } else if(val.action == "accepted"){
                swapBook(val, function(){
                    var result = {message: "You accepted the request, the books are swaping now, you guys should contact to trade in real life",
                   status: false};
                req.update({"_id": ObjectId(val._id)}, {$set:{status: "accepted"}}, function(err, record){
                   if(err){throw err}
                   removeRequest(result);
               });
                });
            }
        }
        function removeRequest(result){
            book.find({"_id": ObjectId(val.toBook)}).toArray(function(err, docs){
                       if(err){throw err}
                       var request = JSON.parse(docs[0].request);
                       request = request.slice(0,request.indexOf(val.from)).concat(request.slice(request.indexOf(val.from)+1, request.length));
                       book.update({"_id": ObjectId(val.toBook)}, {
                           $set: {request: JSON.stringify(request)}
                       }, function(err, record2){
                           callback(result);
                       });
                   });
        }
    });
}