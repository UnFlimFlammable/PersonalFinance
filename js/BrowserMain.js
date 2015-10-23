require(["Account.js", "Address.js", "Transaction.js", "Transactions.js", "User.js", ], function (Account, Address, Transaction, Transactions, User) {

    var transactions = new Transactions();
    var transaction1 = new Transaction(new Date(), "first transaction", 12, "james@gmail.com", "Withdraw");

    transactions.subscribe("added", function () {
      console.log("called back");
    });
    
    transactions.add(transaction1);

    console.log("Transaction amount: " + transaction1.amount);
    console.log("Transactions transactionList[0]: " + transactions.transactionList);



    // transactions.subscribe("added", function (transaction) {
    //     var transTable = document.getElementById("transTable");
    //     var row = transTable.insertRow();
    //     row.insertCell(0).innerHTML = transaction.id;
    //     row.insertCell(1).innerHTML = transaction.date;
    //     row.insertCell(2).innerHTML = transaction.description;
    //     row.insertCell(3).innerHTML = transaction.amount;
    // });
    //
    // function initialize(){
    //     var jsonBlob = localStorage.getItem("transactions");
    //     if (jsonBlob)
    //         transactions.fromJSON(JSON.parse(jsonBlob));
    //
    //     document.getElementById("addTrans").addEventListener("click", function () {
    //         transactions.add(new Transaction(new Date(document.getElementById("transDate").value), document.getElementById("transDesc").value, document.getElementById("transAmt").value));
    //     });
    // };
    //
    // if (document.readyState == "complete")
    //     initialize();
    // else
    //     document.addEventListener("readystatechange", function () {
    //         if (document.readyState == "complete")
    //             initialize();
    //     });
    //
    // window.addEventListener("unload", function () {
    //     localStorage.setItem("transactions", JSON.stringify(transactions));
    // });
});
