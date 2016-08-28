var mongo = require("mongodb").MongoClient;
var url = process.env.MONGODB_URI;

module.exports = function(main){
    mongo.connect(url, function(err,db){
        if(err){throw err}
        main(db);
    });
}