if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /* THE TRANSACTION CLASS */

    /** @constructor */
    function Transaction(
      /** !Date */ date,
      /** !string */ description,
      /** !number */ amount,
      /** !User */ recipient,
      /** !string */ kind
      ) {

      var id = Transaction.idCounter++;
      var date = date;
      var description = description;
      var amount = amount;
      var recipient = recipient;
      var kind = kind;

      if(recipient === undefined){
        recipient = "Me";
      }
      Object.defineProperty(this, "id", {
        get: function () { return id; }
      });

      Object.defineProperty(this, "date", {
          get: function () { return date; },
          set: function (
            /** !string */ value) {
            var intDate = Date.parse(value);
            date = new Date(intDate);
            this.notify("changed", this);
          }
      });

      Object.defineProperty(this, "amount", {
          get: function () { return amount; },
          set: function (
            /** !string */ value) {
            var value = parseInt(value);
            if(isNaN(value)) {
              Console.log("Transaction.amount failed. Argument could not be converted to a number.")
            } else {
              amount = value;
            }
            this.notify("changed", this);
          }
      });

      Object.defineProperty(this, "description", {
          get: function () { return description; },
          set: function (value) {
            if (typeof value === 'string') {
              description = value;
            } else {console.log('Transaction.description argument was not typeof string');}
            this.notify("changed", this);
          }
      });

      Object.defineProperty(this, "recipient", {
          get: function () { return recipient; },
          set: function (value) {

            //!!!TODO need to get a user from a string...

            if(value instanceof User) {
              recipient = value;
            } else {console.log('Transaction.recipient argument was not instanceof User');}
            this.notify("changed", this);
          }
      });

      Object.defineProperty(this, "kind", {
        get: function () { return kind; },
        set: function() {
          if(this.amount < 0) {
            this.kind = "Withdraw";
          } else { "Deposit"; }
          this.notify('changed', this);
        }
      });

      this.toJSON = function () {
          return {
              id: this.id,
              date: this.date,
              description: this.description,
              amount: this.amount,
              kind: this.kind,
              recipient: this.recipient
          };
      };

      // this.prototype.transferToRecipient = function(AccountFrom, AccountTo){
      //     //Pass this transaction object to a web service that will post and return a success / fail
      //     //Make sure to update accounts to reflect the change, force a page reload if necessary
      // }

      subscribable(this);

    } //end Transaction() {} class

    Transaction.idCounter = 0;

    Transaction.prototype.toString = function () {
      var string;
      for (var i in this) {
        if(this.hasOwnProperty(i))
          string = i + ":" + this[i] + "; ";
      }
      return string;
    }

    module.exports = Transaction;

    return Transaction;
});
