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
            accountList.push(account);
            this.notify("added", account);
        };

        this.toJSON = function () {
            var output = [];

            for (var i = 0; i < accountList.length; i++) {
                output.push(list[i]);
            }

            return output;
        };

        subscribable(this);
    }; // end Accounts() {} class


    Accounts.prototype.fromJSON = function (json) {
        for (var i = 0; i < json.length; i++) {
            var t = json[i];
            this.add(new Account(t.accountName, t.transactions));
        }
    };

    module.exports = Accounts;

    return Accounts;
});
