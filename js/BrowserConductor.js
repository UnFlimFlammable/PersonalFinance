require(["Transaction.js", "Transactions.js"], function (Transaction, Transactions) {

    var transactions = new Transactions();
    transactions.subscribe("added", function (transaction) {
        var transTable = document.getElementById("transTable");
        var row = transTable.insertRow();
        row.insertCell(0).innerHTML = transaction.id;
        row.insertCell(1).innerHTML = transaction.date;
        row.insertCell(2).innerHTML = transaction.description;
        row.insertCell(3).innerHTML = transaction.amount;
        row.insertCell(4).innerHTML = transaction.recipient;
        row.insertCell(5).innerHTML = transaction.kind;
    });

    function initialize(){
        var jsonBlob = localStorage.getItem("transactions");
        if (jsonBlob)
            transactions.fromJSON(JSON.parse(jsonBlob));

        document.getElementById("addTrans").addEventListener("click", function () {
            transactions.add(new Transaction(new Date(document.getElementById("transDate").value),
            document.getElementById("transDesc").value, document.getElementById("transAmt").value));
        });
    };

    if (document.readyState == "complete")
        initialize();
    else
        document.addEventListener("readystatechange", function () {
            if (document.readyState == "complete")
                initialize();
        });

    window.addEventListener("unload", function () {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    });
});
