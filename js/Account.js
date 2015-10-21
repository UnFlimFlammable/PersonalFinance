if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /** @constructor */
  	function Account(
      /** !string */ accountName,
      /** !Transactions */ transactions) {

  		var id = Account.idCounter++;
  		var accountType = "basic";
  		var accountName = accountName;
  		var transactions = transactions;
  		var balance = 0;

      Object.defineProperty(this, "id", {
        get: function () { return this.id; }
      });

  		Object.defineProperty(this, "accountName", {
  			get: function () { return accountName; },
  			set: function(value) {
          if(typeof value === 'string'){
            accountName = value;
          } else {console.log('Account.accountName argument was not typeof string');}
          this.notify("changed", this);
        }
  		});

  		Object.defineProperty(this, "accountType", {
  			get: function () { return accountType; },
  			set: function(value) {
          if(typeof value === 'string'){
            accountType = value;
          } else {console.log('Account.accounType argument was not typeof string');}
          this.notify("changed", this);
        }
  		});

  		Object.defineProperty(this, "balance", {
  			get: function () { return balance; }
  		});

      this.toJSON = function () {
          return {
              id: this.id,
              accountType: this.accountType,
              accountName: this.accountName,
              transactions: this.transactions,
              balance: this.balance
          };
      };

      subscribable(this);

  	} //end Account() {} class

  	Account.idCounter = 0;
  	Account.prototype.minBalance = 0;
  	Account.prototype.maxBalance = 50000;

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

    module.exports = Account;

    return Account;

});
