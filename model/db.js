var mongo = require("mongodb").MongoClient;
var url = 'mongodb://'+process.env.IP+':27017/bookclub';

module.exports = function(main){
    mongo.connect(url, function(err,db){
        if(err){throw err}
        main(db);
    });
}