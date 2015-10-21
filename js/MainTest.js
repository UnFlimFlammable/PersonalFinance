var Transaction = require("./Transaction.js");
var Transaction = require("./User.js");
var Transaction = require("./Account.js");
var Transactions = require("./Transactions.js");

var transactions = new Transactions();
var t1 = new Transaction(new Date(), "First Transaction", 50);
var t2 = new Transaction(new Date(), "Second Transaction", 25);

transactions.subscribe("added", function (value) {
    console.log("Transaction Added: " + JSON.stringify(value));
});

t1.subscribe("changed", function (value) {
    console.log("Transaction Changed: " + JSON.stringify(value));
});

transactions.add(t1);
transactions.add(t2);

t1.amount = 60;

console.log("THE TRANSACTIONS: " + JSON.stringify(transactions));


console.log("****************************************************\n")
