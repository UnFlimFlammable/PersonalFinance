var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = require('url');
var User = require('./js/User.js');
var app = express();
app.set('view engine', 'jade');  //Using Jade as our templating engine


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/registerUser', function (req, res) {
  res.render('registration');
});

app.get('/login', function(req, res){
  var url_parts = url.parse(req.url, true);
  MongoClient.connect("mongodb://personalFinance:mugsymugsy@ds039484.mongolab.com:39484/personalfinance", function(err, db) {
    db.createCollection('users', {strict:true}, function(err, collection) {});

    if(err) {
      res.send("ERROR");
      return console.dir(err);
    }

    var userEmail = req.query.email;
    var userPassword = req.query.password;
    var collection = db.collection('Users');
    var cursor = collection.find({email:userEmail, password:userPassword});

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

app.get('/persistNewUser', function(req, res){
  MongoClient.connect("mongodb://personalFinance:mugsymugsy@ds039484.mongolab.com:39484/personalfinance", function(err, db) {
    db.createCollection('Users', {strict:true}, function(err, collection) {}); //ignores the statement if collection already exists

    if(err) {
      res.send("ERROR");
      return console.dir(err);
    }

    var collection = db.collection('Users');
    var userName = req.query.name;
    var userEmail = req.query.email;
    var userPassword = req.query.password;

    var user = new User();
    user.userName.set(userName);
    user.email.set(userEmail);
    user.password.set(userPassword);

    collection.insert(user);
    var cursor = db.Users.find(user);

    if(cursor.hasNext()){
      res.send(db.Users.find(user).next());
    }
  });
});


app.get('/postTransaction',function(req, res){
  MongoClient.createCollection("mongodb://personalFinance:mugsymugsy@ds039484.mongolab.com:39484/personalfinance", function(err, db){
    var userEmail = req.query.email;
    var userPassword = req.query.password;
    var transaction = req.query.transaction;

    cursor = db.Users.find({"email":userEmail, "password":userPassword});
    if(!cursor.hasNext()){
      res.send("AuthenticationError: User Not Found");
      return;
    }

    var user = cursor.next();

    cursor = db.Users.find({"email":transaction.recipient.email});
    if(!cursor.hasNext()){
      res.send("Transaction Error: Recipient not found.");
      return;
    }

    var recipient = cursor.next();


    user.accounts[0].balance -= transaction.amount;
    recipient.accounts[0].balance += transaction.amount;

    var userBalance = user.accounts[0].balance;
    var recipientBalance = recipient.accounts[0].balance;
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
