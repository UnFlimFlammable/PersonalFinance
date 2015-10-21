if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");
    var Address = require("./Address.js");

    /* THE USER CLASS */

      /** @constructor */

      var User = function(userName, password, email, ) {
              var id = User.idCounter++;
              var userName = userName;
              var password = password;
              var email = email;
              var enabled = true;
  		        var address = new Address();
  						var accounts = [];

          Object.defineProperty(this, "password", {
              get: function() { return id; }
          });

  		    Object.defineProperty(this, "userName", {
  		        get: function() { return userName; },
  		        set: function(value) {
                if(typeof value === 'string') {
                  userName = value;
                } else {console.log('User.userName argument was not typeof string');}
              }
              this.notify("changed", this);
  		    });

  		    Object.defineProperty(this, "password", {
  		        get: function() { return password; },
  		        set: function(value) {
                if(typeof value === 'string') {
                  password = value;
                } else {console.log('User.password argument was not typeof string');}
              }
              this.notify("changed", this);
  		    });

          Object.defineProperty(this, "email", {
              get: function() { return email; },
              set: function(value) {
                if(typeof value === 'string') {
                  email = value;
                } else {console.log('User.email argument was not typeof string');}
              }
              this.notify("changed", this);
          });

  		    Object.defineProperty(this, "enabled", {

  		        get: function() { return enabled; },
  		        set: function(value) {
                if(value) {
                  email = value;
                } else {console.log('User.email argument was not typeof string');}
              }
              this.notify("changed", this);
  		    });

  		    // Object.defineProperty(this, "address", {
          //
  		    //     get: function() { return this.address; },
  		    //     set: function(address) {this.address = address}
  		    // });
          //
          // Object.defineProperty(this, "accounts", {
          //     get: function() { return this.accounts; },
          //     set: function(accounts) {this.accounts = accounts;},
          //     removeAccount: function(account){this.accounts.splice(this.indexOf(account), 1);},
          //     addAccount: function(account){this.accounts.push(account);}
          // });

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
