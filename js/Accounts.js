if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");
    var Account = require("./Account.js");

    /** @constructor */
    function Accounts() {
        var accountList = [];

        this.add = function (
        /** !Account */ account) {
            if (value instanceof Account) {
                accountList.push(account);
            } else {
                console.log("Accounts.push failed. Argument must be instanceof Account");
            }

            this.notify("added", account);
        };

        this.toJSON = function () {
            var output = [];
            for (var i = 0; i < accountList.length; i++) {
                output.push(accountList[i]);
            }
            return output;
        };

        this.getById = function (id) {
            var id = parseInt(id, 10);

            if(isNAN(id)) {
                console.log("Accounts.getById(id) failed: id isNaN.");
            } else {
                var i;
                for (i=accountList.length; i--;) {
                    if(accountList[i].id === id) {
                      return accountList[i];
                    }
                }
            }
        };

        subscribable(this);
    }; // end Accounts() {} class


    Accounts.prototype.fromJSON = function (json) {
        for (var i = 0; i < json.length; i++) {
            var t = json[i];
            this.add(new Account(t.accountName, t.transactions));
        }
    };


    //module.exports = Accounts;

    return Accounts;
});
