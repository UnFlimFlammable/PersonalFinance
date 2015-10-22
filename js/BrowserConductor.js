require(["Transaction.js", "Transactions.js"], function (Transaction, Transactions) {

    // var transactions = new Transactions();
    // transactions.subscribe("added", function (transaction) {
    //     var transTable = document.getElementById("transTable");
    //     var row = transTable.insertRow();
    //     row.insertCell(0).innerHTML = transaction.id;
    //     row.insertCell(1).innerHTML = transaction.date;
    //     row.insertCell(2).innerHTML = transaction.description;
    //     row.insertCell(3).innerHTML = transaction.amount;
    //     row.insertCell(4).innerHTML = transaction.recipient;
    //     row.insertCell(5).innerHTML = transaction.kind;
    // });

    // function initialize(){
    //     var jsonBlob = localStorage.getItem("transactions");
    //     if (jsonBlob)
    //         transactions.fromJSON(JSON.parse(jsonBlob));

    //     document.getElementById("addTrans").addEventListener("click", function () {
    //         transactions.add(new Transaction(new Date(document.getElementById("transDate").value),
    //         document.getElementById("transDesc").value, document.getElementById("transAmt").value));
    //     });
    // };

    // if (document.readyState == "complete")
    //     initialize();
    // else
    //     document.addEventListener("readystatechange", function () {
    //         if (document.readyState == "complete")
    //             initialize();
    //     });

    // window.addEventListener("unload", function () {
    //     localStorage.setItem("transactions", JSON.stringify(transactions));
    // });

    //handle the Login
    $("#form").submit(
        $.ajax("/login?email="+$("#userLoginEmail").val()+"&password="+$("#userLoginPassword").val(),{
            success: function(data, textStatus, jqXHR){
                $('#divLogin').hide();

                if(JSON.parse(data) instanceof User) {
                    var currentUser = JSON.parse(data);
                }
              
                //USE THE USER TO POPULATE THE ACCOUNTS SUMMARY PAGE WITH BITS OF THE USER

                $('#divAccountsSummary').show();
            },  
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        }); // end AJAX
    );//end submit login

    $('#transactionForm').submit(

        //new Transaction (amount, recipient, description, Date)
        var newTransaction = new Transaction(new Date($('transactionDate')), $('transactionDescription').val(), 
                $('transferAmount').val(), $('transferRecipient').val(), "transfer");

        $.ajax("/postTransaction?email="+$("#userFromEmail").val()+"&password="+$("userFromPassword").val()
            +"&transaction="+newTransaction.stringify, {
                success:function(data, textStatus, jqXHR) {
                    $("#div")
                }, 
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        }); // end AJAX
    ); //end submit transaction
    
});





