if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /* THE TRANSACTION CLASS */

    /** @constructor */
    function Transaction(
      /** !date */ date,
      /** !string */ description,
      /** !number */ amount,
      /** !Recipient */ recipient) {

      var id = Transaction.idCounter++;
      var date = date;
      var description = description;
      var amount = amount;
      var recipient = recipient;
      var kind = "Withdraw";

      Object.defineProperty(this, "id", {
        get: function () { return this.id; }
      });

      Object.defineProperty(this, "date", {
          get: function () { return date; },
          set: function (value) {
            if(typeof value === 'date') {
              date = value;
            }

              this.notify("changed", this);
          }
      });

      Object.defineProperty(this, "amount", {
          get: function () { return this.amount; },
          set: function(value) {
            if(typeof value === 'number') {
              this.amount = value;
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
            if(typeof value === 'Recipient') {
              recipient = value;
            } else {console.log('Transaction.recipient argument was not typeof Recipient');}
            this.notify("changed", this);
          }
      });

      Object.defineProperty(this, "kind", {
        get: function () { return this.kind; },
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

      this.prototype.transferToRecipient = function(AccountFrom, AccountTo){
          //Pass this transaction object to a web service that will post and return a success / fail
          //Make sure to update accounts to reflect the change, force a page reload if necessary
      }

      subscribable(this);

    } //end Transaction() {} class

    Transaction.idCounter = 0;

    Transaction.prototype.getIndexOfRecipient = function (
      /** !string */ recipient) { //should the recipient argument be of type string?
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

    return Transaction;
});
