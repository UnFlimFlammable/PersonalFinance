if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /* THE USER CLASS */

      /** @constructor */

      function User() {
              this.userName = "";
              this.password = "";
              this.email = "";
              this.enabled = true;
  		        this.address = "";
  						this.accounts = [];

  		    object.defineProperty(this, "userName", {

  		        get: function() { return this.userName; },
  		        set: function(userName) {this.userName = userName}
  		    });

  				object.defineProperty(this, "accounts", {
  						get: function() { return this.accounts; },
  						set: function(accounts) {this.accounts = accounts;},
  						removeAccount: function(account){this.accounts.splice(this.indexOf(account), 1);},
  						addAccount: function(account){this.accounts.push(account);}
  				});


  		    object.defineProperty(this, "password", {

  		        get: function() { return this.password; },
  		        set: function(password) {this.password = password}
  		    });

  		    object.defineProperty(this, "email", {

  		        get: function() { return this.email; },
  		        set: function(email) {this.email = email}
  		    });

  		    object.defineProperty(this, "enabled", {

  		        get: function() { return this.enabled; },
  		        set: function(enabled) {this.enabled = enabled}
  		    });

  		    object.defineProperty(this, "address", {

  		        get: function() { return this.address; },
  		        set: function(address) {this.address = address}
  		    });

  		}
  }
