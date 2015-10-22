var express = require('express');
var User = require('./js/User.js');
var Account = require('./js/Account.js');
var Transaction = require('./js/Transaction.js');
var fs = require('fs');

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
  var userFromEmail = JSON.parse(req.query.userFromEmail);
  var userFromPassword = JSON.parse(req.query.userFromPassword);
  var transaction = JSON.parse(req.query.transaction);
  fs.readFile("data/users/"+userFromEmail.replace(/@/,"_"), function(err, data){
    if(err){
      res.send("Error: User Not Found");
      return;
    }

    var sender = JSON.parse(data.toString());

    //Validate Credentials
    if(sender.password !== userFromPassword){
      res.send("Error: Incorrect Credentials");
      return;
    }

    //If the transaction is a transfer and requires two parties, pull up the second party from persistence
    if(transaction.kind === "transfer"){
      fs.readFile("data/users/"+transaction.recipient.email.replace(/@/,"_"), function(err, data){
        if(err){
          res.send("Error: Recipient not found");
          return;
        }

        var recipientObject = JSON.parse(data.toString());
        recipientObject.accounts[0].amount += transaction.amount;
        sender.accounts[0].amount -= transaction.amount;

        transaction.date = new Date(); //Be careful using this function to reconstruct an account
        sender.accounts[0].push(transaction);
        recipientObject.accounts[0].transactions.push(
          new Transaction(new Date(), "Transfer From: "+ sender.email, transaction.amount, undefined, "Deposit"));

        //Persist changes to the recipient to the storage medium
        fs.writeFile('/data/users/'+recipientObject.email.replace(/@/, "_"), JSON.stringify(recipientObject), function(){
          if(err){
            res.send("Error persisting changes to recipient, transaction canceled");
            return;
          }
          console.log("Updated User: "+ recipientObject.email)
        });

        fs.writeFile('/data/users/'+sender.email.replace(/@/, "_"), JSON.stringify(sender), function(){
          if(err){
            res.send("Error persisting changes to your account, transaction canceled");
            return;
          }
          console.log("Updated User: "+ sender.email)
        });
      });
    }else if(transaction.kind === "Deposit"){
      sender.accounts[0].amount += transaction.amount;
      sender.accounts[0].transactions.push(new Transaction(new Date(), "Deposit", transaction.amount, undefined, "Deposit"));

      fs.writeFile('/data/users/'+sender.email.replace(/@/, "_"), JSON.stringify(sender), function(){
        if(err){
          res.send("Error persisting changes to your account, transaction canceled");
          return;
        }
        console.log("Updated User: "+ sender.email)
      });
    }else if(transaction.kind === "Withdrawal"){
      sender.accounts[0].amount -= transaction.amount;
      sender.accounts[0].transactions.push(new Transaction(new Date(), "Withdrawal", transaction.amount, undefined, "Withdrawal"));

      fs.writeFile('/data/users/'+sender.email.replace(/@/, "_"), JSON.stringify(sender), function(){
        if(err){
          res.send("Error persisting changes to your account, transaction canceled");
          return;
        }
        console.log("Updated User: "+ sender.email);
      });
    }

  });

});

app.get('/createAccount', function(req, res){

});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
