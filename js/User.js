var Account = require('./Account.js')
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");
    var Address = require("./Address.js");

    /* THE USER CLASS */

      /** @constructor */
      var User = function(
        /** !string */ userName,
        /** !string */ password,
        /** !string */ email) {

          var id = User.idCounter++;
          var userName = userName;
          var password = password;
          var email = email;
          var enabled = true;
	        var address = new Address();
					var accounts = [];
          accounts.push(new Account("Checking", new Array()));
          Object.defineProperty(this, "id", {
              get: function() { return id; }
          });

  		    Object.defineProperty(this, "userName", {
  		        get: function() { return userName; },
  		        set: function(value) {
                if(typeof value === 'string') {
                  userName = value;
                } else {console.log('User.userName argument was not typeof string');}
                this.notify("changed", this);
              }
  		    });

  		    Object.defineProperty(this, "password", {
  		        get: function() { return password; },
  		        set: function(
                /** !string */ value) {
                if(typeof value === 'string') {
                  password = value;
                } else {console.log('User.password argument was not typeof string');}
                this.notify("changed", this);
              }
  		    });

          Object.defineProperty(this, "email", {
              get: function() { return email; },
              set: function(value) {
                if(typeof value === 'string') {
                  email = value;
                } else {console.log('User.email argument was not typeof string');}
                this.notify("changed", this);
              }
          });

  		    Object.defineProperty(this, "enabled", {

  		        get: function() { return enabled; },
  		        set: function(value) {
                if(value) {
                  email = value;
                } else {console.log('User.email argument was not typeof string');}
                this.notify("changed", this);
              }
  		    });

  		    Object.defineProperty(this, "address", {
  		        get: function() { return address; },
  		        set: function(
                /** !Address */ value) {
                // if (typeof value === 'Address') {
                  address = value;
                // } else {console.log('User.address argument was not typeof Address');}
                this.notify("changed", this);
              }
  		    });

          Object.defineProperty(this, "accounts", {
              get: function() { return accounts; },
              set: function(
                /** !Accounts */ value) {
                accounts = value;
                this.notify("changed", this);
              },
              removeAccount: function(
                /** !Account */ account){
                this.accounts.splice(this.indexOf(account), 1);
                this.notify("changed", this);
              },
              addAccount: function(
                /** !Account */ account){
                this.accounts.push(account);
                this.notify("changed", this);
              }
          });

          this.toJSON = function () {
              return {
                  id: this.id,
                  userName: this.userName,
                  password: this.password,
                  email: this.email,
                  enabled: this.enabled,
                  address: this.address,
                  accounts: this.accounts
              };
          };

          this.getById = function (id) {
            var id = parseInt(id, 10);

            if(isNAN(id)) {
                console.log("User.getById(id) failed: id isNaN.");
            } else {
                //TODO lookup userID in the DB and return User with id.
            }
          };

          subscribable(this);

      } // end User() {} class


      User.idCounter = 0;

      User.prototype.toString = function () {
        var string;
        for (var i in this) {
          if(this.hasOwnProperty(i))
            string = i + ":" + this[i] + "; ";
        }
        return string;
      }

      module.exports = User;

      return User;

  });
