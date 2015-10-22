if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");
    var Transaction = require("./Transaction.js");

    /** @constructor */
    function Transactions() {
        var transactionList = [];

        this.add = function (
            /** !Transaction */ value) {
            if (value instanceof Transaction) {
                transactionList.push(value); 
            } else {
                console.log('Transactions.add requires instanceof Transaction');
            }

            this.notify("added", value);
        };

        this.remove = function (
            /** !Transaction */ value) {
            if (value instanceof Transaction) {
                var index = transactionList.getIndexOf(value);
                transactionList.splice(index, 1);
            } else {
                console.log('Transactions.remove requires instanceof Transaction');
            }

            this.nofity("removed", value);
        };

        this.toJSON = function () {
            var output = [];

            for (var i = 0; i < transactionList.length; i++) {
                output.push(transactionList[i]);
            }

            return output;
        };

        this.getById = function (id) {
            var id = parseInt(id, 10);

            if(isNAN(id)) {
                console.log("Transactions.getById(id) failed: id isNaN.");
            } else {
                var i;
                for (i=transactionList.length; i--;) {
                    if(transactionList[i].id === id) {
                      return transactionList[i];
                    } 
                }
            }
        };

        this.sortTransactionsByName = function(){
            var array = this.transactions.sort(function(a, b){
                if(a.recipient.name < b.recipient.name) return -1;
                if(a.recipient.name > b.recipient.name) return 1;
            return 0;
            });
            //returning the sorted array:
            return array;
        }

       this.sortTransactionsByAmount = function(){
            this.transactions.sort(function(a, b){
                if(a.amount < b.amount) return -1;
                if(a.amount > b.amount) return 1;
            return 0;
            });
        }

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
