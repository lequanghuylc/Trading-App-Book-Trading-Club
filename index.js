var express = require('express');
var app = express();
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require("body-parser");

// Require model
var addUser = require('./model/addUser');
var findUser = require('./model/findUser');
var cookie = require('./model/cookie');
var updateUser = require('./model/updateUser');
var addBook = require('./model/addBook');
var getAllUserBook = require('./model/getAllUserBook');
var findBook = require('./model/findBook');
var getAllBook = require('./model/getAllBook');
var sendRequest =require('./model/sendRequest');
var findRequest = require('./model/findRequest');
var processRequest = require('./model/processRequest');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// Handle Login, User Profile
    //register
app.post("/register",function(req,res){
    findUser({"username" : req.body.username}, function(docs){
        if(docs.length >0){
            res.send({
               message: "duplicate" 
            });
        } else {
            addUser(req.body, function(id){
                res.send({
                    message: "success",
                    _id: id
                });
            });
        }
    })
    console.log(JSON.stringify(req.body));
});
    //login
app.post("/login",function(req,res){
    findUser({"username" : req.body.username}, function(docs){
        if(docs.length >0){
            if(docs[0].pass === req.body.pass){
                res.send({
                    message: "success",
                    cookie: docs[0]._id
                });
            } else {
                res.send({
                    message: "wrong password",
                    cookie: null
                });
            }
        } else {
            res.send({
                message: "User doesn't exist"
            });
        }
    })
    console.log(JSON.stringify(req.body));
});

    // check login
app.get('/checklogin', function(req,res){
    console.log(JSON.stringify(cookie(req)));
    if(!cookie(req).user){
        res.end("false");
    } else {
        var validateCookie = {
            "_id":  ObjectId(cookie(req).au),
            "username": cookie(req).user
        };
        findUser(validateCookie, function(docs){
            if(docs.length >0){res.end(cookie(req).user);}
            else {res.end("false");}
        });
    }
});
    // get user data
app.get("/getuserdata/:username", function(req,res){
   findUser({"username": req.params.username}, function(docs){
       res.send(docs[0]);
   }) ;
});
    // update user data
app.post("/updateuserdata/:username", function(req, res){
    updateUser({"username": req.params.username},{
        $set: req.body
    }, function(record){
        console.log(JSON.stringify(record));
        res.end("ok");
    });
});
// Handle Book
    //add book

app.post("/addbook", function(req,res){
    addBook(req.body, function(docs){
       res.send(docs); 
    });
});
    // get user book

app.get("/getuserbook/:username", function(req, res){
    getAllUserBook({"username": req.params.username}, function(docs){
        res.send(docs);
    })
});
    //get single book
app.get("/getsinglebook/:bookid", function(req,res){
    var id = req.params.bookid;
    findBook({"_id": ObjectId(id)}, function(docs){
        res.send(docs);
    });
});
    // get all book
app.get("/getallbook", function(req,res){
    getAllBook(function(data){
        res.send(data);
    });
});

// Handle request trade
    // trading request
app.post("/sendrequest", function(req,res){
    sendRequest(req.body, function(data){
        res.end("request sent");
    });
});

    // get request
app.get("/getrequest/:username", function(req,res){
    findRequest(req.params.username, function(data){
        res.send(data);
    });
});
    // process request
app.post("/processrequest", function(req,res){
    processRequest(req.body, function(data){
        res.send(data);
    });
});


// handle routing//Serve statics files
app.use(express.static(__dirname + '/views'));
app.use('/singlebook', express.static(__dirname + '/views'));
app.get('*', function (req, res){
   res.redirect("/");
});


app.listen(8080);