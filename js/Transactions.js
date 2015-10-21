if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");
    var Transaction = require("./Transaction.js");

    /** @constructor */
    function Transactions() {
        var list = [];

        this.add = function (
        /** !Transaction */ transaction) {
            list.push(transaction);
            this.notify("added", transaction);
        };

        this.toJSON = function () {
            var output = [];

            for (var i = 0; i < list.length; i++) {
                output.push(list[i]);
            }

            return output;
        };

        subscribable(this);
    }; // end Transactions() {} class


    Transactions.prototype.fromJSON = function (json) {
        for (var i = 0; i < json.length; i++) {
            var t = json[i];
            this.add(new Transaction(t.date, t.description, t.amount, t.recipient));
        }
    };

    return Transactions;
});
