if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /** @constructor */
  	function Account() {
  		this.id = Account.idCounter++;
  		this.accountType = "basic";
  		this.accountName = "default account";
  		this.transactions = [];
  		this.balance = 0;

  		Object.defineProperty(this, "accountName", {
  			get: function () { return this.accountName; },
  			set: function(accountName) { this.accountName = accountName }
  		})

  		Object.defineProperty(this, "accountType", {
  			get: function () { return this.accountType; },
  			set: function(accountType) { this.accountType = accountType }
  		})

  		Object.defineProperty(this, "balance", {
  			get: function () { return this.balance; }
  		})
  	}

  	Account.idCounter = 0;
  	Account.prototype.minBalance = 0;
  	Account.prototype.maxBalance = 50000;

  	Account.prototype.getIndexOfTransaction = function (
  		/** !string */ transaction) {
  		return this.transactions.indexOf(transaction);
  	}

  	Account.prototype.addTransaction = function (
  		/** !Transaction */ transaction) {
  		this.transactions.push(transaction);
  	}

  	Account.prototype.removeTransaction = function (
  		/** !Transaction */ transaction) {
  		this.transactions.splice(this.getIndexOfTransaction(transaction), 1);
  	}

  	Account.prototype.applyTransaction = function (
  		/** !Transaction */ transaction) {
  		this.balance += transaction.amount;
  	}

  	Account.prototype.rollbackTransaction = function (
  		/** !Transaction */ transaction) {
  		this.balance -= transaction.amount;
  	}

  	Account.prototype.toString = function () {
  		var string;
  		for (var i in this) {
  			if(this.hasOwnProperty(i)){
  				string = i + ":" + this[i] + "; ";
  			}
  		}
  		return string;
  	}

  	Account.prototype.sortTransactionByName = function(){
  		var array = this.transactions.sort(function(a, b){
  	    if(a.recipient.name < b.recipient.name) return -1;
  	    if(a.recipient.name > b.recipient.name) return 1;
  	    return 0;
  		});

  		return array;
  	}

  	Account.prototype.sortTransactionByAmount = function(){
  		this.transactions.sort(function(a, b){
  	    if(a.amount < b.amount) return -1;
  	    if(a.amount > b.amount) return 1;
  	    return 0;
  		});
  	}
  	// Account.prototype.toString = function () {
  	// 	var fullString = "Account Type: " + this.accountType + ", Account Name: "
  	//	+ this.accountName + ", Balance: " + this.balance;
  	// 	return this.fullString;
  	// }

}
