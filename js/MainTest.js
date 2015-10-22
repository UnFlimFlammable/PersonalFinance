var Transaction = require("./Transaction.js");
var Transactions = require("./Transactions.js");
var User = require("./User.js");
var Address = require("./Address.js");
var Account = require("./Account.js");
var Accounts = require("./Accounts.js");

console.log("\n****************************************************")
console.log("TESTING TRASACTIONS");
var dTransactions = new Transactions();
var t1 = new Transaction(new Date(), "First Transaction", 50);
var t2 = new Transaction(new Date(), "Second Transaction", 25);

dTransactions.subscribe("added", function (value) {
    console.log("\nTransaction Added: " + JSON.stringify(value));
});

t1.subscribe("changed", function (value) {
    console.log("\nTransaction Changed: " + JSON.stringify(value));
});

dTransactions.add(t1);
dTransactions.add(t2);

t1.amount = 60;

console.log("\nTHE TRANSACTIONS: " + JSON.stringify(dTransactions));


console.log("\n****************************************************")
console.log("TESTING ACCOUNTS");

var davidAccounts = new Accounts();
var acct1 = new Account();
var acct2 = new Account();

davidAccounts.subscribe("added", function(value) {
  console.log("\nAccount Added: " + JSON.stringify(value));
});

acct1.subscribe("changed", function (value) {
    console.log("\nAccount Changed: " + JSON.stringify(value));
});

davidAccounts.add(acct1);
davidAccounts.add(acct2);

acct1.accountName = "David's Checking";

acct1.transactions = dTransactions;

console.log("\n****************************************************")
console.log("TESTING USERS");

var davidUser = new User('David', 'pw', 'email@google.com');

davidUser.subscribe("changed", function (value) {
  console.log("\nUser Changed: " + JSON.stringify(value));
});

var davidAddress = new Address(4547, 'E Yale Ave', 'Denver', 'CO', 66208, 'United States');

davidUser.address = davidAddress;
davidUser.accounts = davidAccounts;
