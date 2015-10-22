var express = require('express');
var User = require('./js/User.js');
var Account = require('./js/Account.js');
var fs = require('fs')

var app = express();
app.set('view engine', 'jade');  //Using Jade as our templating engine


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/registerUser', function (req, res) {
  res.render('registration');
});

app.get('/login', function(req, res){
  var email = req.query.email;
  var password = req.query.password;

  var fileName = "data/users/" + email.replace(/@/g, "_");
  fs.readFile(fileName, function(err, data){
    if(err){
      console.log(err);
      res.send("Error: User Not Found");
      return;
    }

    var UserJson = data.toString();
    var User = JSON.parse(UserJson);

    console.log(User.password);
    console.log(password);

    if(User.password.toString() != password.toString()){
      res.send("Error: Incorrect Credentials");
      return;
    }

    res.send(UserJson);
  });
});

app.get('/persistNewUser', function(req, res){
  var user = req.query.user;
  var email = req.query.email;
  var password = req.query.password;
  var newUser = new User(user, password, email);

  var fileName = "data/users/" + email.replace(/@/g, "_");
  fs.open(fileName, "wx", function(err, fd){
    if(err){
      console.log(err);
      res.send("Error: User Already Exists");
      return;
    }
    fs.write(fd, JSON.stringify(newUser), function(err, written, string){
        if(err){
          console.log(err);
          res.send(err);
          return;
        }
    });
  });
  console.log(JSON.stringify(newUser));
  res.send("Success");
});


app.get('/postTransaction',function(req, res){

});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
