var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = require('url');
var epiphany = require('./js/User.js');
var app = express();
app.set('view engine', 'jade');  //Using Jade as our templating engine


app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/login', function(req, res){
  var url_parts = url.parse(req.url, true);
  MongoClient.connect("mongodb://personalFinance:mugsymugsy@ds039484.mongolab.com:39484/personalfinance", function(err, db) {
    db.createCollection('users', {strict:true}, function(err, collection) {});
    if(err) {
      res.send("ERROR");
      return console.dir(err);
    }

    var collection = db.collection('users');
    var cursor = collection.find(req.query.user);

    cursor.each(function(err, doc){
      if(doc != null){
        console.log(doc);
        res.send(doc);
      }else{
        console.log("Error, user not found!");
        res.send("User not found");
      }
    });
  });
});

app.get('/registerUser', function(req, res){
  MongoClient.connect("mongodb://personalFinance:mugsymugsy@ds039484.mongolab.com:39484/personalfinance", function(err, db) {
    db.createCollection('Users', {strict:true}, function(err, collection) {}); //ignores the statement if collection already exists

    if(err) {
      res.send("ERROR");
      return console.dir(err);
    }

    var collection = db.collection('Users');
    var user = req.query.user;

    collection.insert(user);
    var cursor = db.Users.find(user);

    if(cursor.hasNext()){
      res.send(db.Users.find(user).next());
    }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
