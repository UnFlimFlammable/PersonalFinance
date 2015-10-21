var Transaction = require("./Transaction.js");
var Transactions = require("./Transactions.js");
var User = require("./User.js");
var Account = require("./Account.js");
var Accounts = require("./Accounts.js");

console.log("\n****************************************************\n")
console.log("TESTING TRASACTIONS");
var transactions = new Transactions();
var t1 = new Transaction(new Date(), "First Transaction", 50);
var t2 = new Transaction(new Date(), "Second Transaction", 25);

transactions.subscribe("added", function (value) {
    console.log("\nTransaction Added: " + JSON.stringify(value));
});

t1.subscribe("changed", function (value) {
    console.log("\nTransaction Changed: " + JSON.stringify(value));
});

transactions.add(t1);
transactions.add(t2);

t1.amount = 60;

console.log("\nTHE TRANSACTIONS: " + JSON.stringify(transactions));


console.log("\n****************************************************\n")
console.log("TESTING ACCOUNTS");

var accounts = new Accounts();
var acct1 = new Account();
var acct2 = new Account();

accounts.subscribe("added", function(value) {
  console.log("\nAccount Added: " + JSON.stringify(value));
});

acct1.subscribe("changed", function (value) {
    console.log("\nAccount Changed: " + JSON.stringify(value));
});

accounts.add(acct1);
accounts.add(acct2);

acct1.accountName = "David";

console.log("\n****************************************************\n")
console.log("TESTING USERS");
