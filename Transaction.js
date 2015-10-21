if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /* THE TRANSACTION CLASS */

    /** @constructor */
    function Transaction() {
      this.id = Transaction.idCounter++;
      this.amount = 0;
      this.date = 0;
      this.kind = "Withdraw";
      this.recipient = new Recipient();

      Object.defineProperty(this, "amount", {
        //space for validation, or event handling - structured access to your class' data
        get: function () { return this.amount; },
        set: function(difAmount) { this.amount = difAmount }
      })

      Object.defineProperty(this, "id", {
        get: function () { return this.id; },
        set: function(difId) { if(difId>0 && difId>Transaction.idCounter) {this.id = difId;
          } else {Console.log("Id must be greater than zero and greater than other ids.")}}
      })

      Object.defineProperty(this, "kind", {
        //space for validation, or event handling - structured access to your class' data
        get: function () { return this.kind; },
        set: function() {
          if(this.amount < 0) {
            this.kind = "Withdraw";
          } else {
            "Deposit";
          }}
      })

      this.prototype.transferToRecipient = function(AccountFrom, AccountTo){
          //Pass this transaction object to a web service that will post and return a success / fail
          //Make sure to update accounts to reflect the change, force a page reload if necessary
      }

    }

    Transaction.idCounter = 0;

    Transaction.prototype.getIndexOfRecipient = function (
      /** !string */ recipient) {
      return this.recipients.indexOf(recipient);
    }

    Transaction.prototype.addRecipient = function (
      /** !Recipient */ recipient) {
      this.recipients.push(recipient);
    }

    Transaction.prototype.removeRecipient = function (
      /** !Recipient */ recipient) {
      this.recipients.splice(getIndexOfRecipient(recipient), 1);
    }

    Transaction.prototype.toString = function () {
      var string;
      for (var i in this) {
        if(this.hasOwnProperty(i))
          string = i + ":" + this[i] + "; ";
      }
      return string;
    }
}
