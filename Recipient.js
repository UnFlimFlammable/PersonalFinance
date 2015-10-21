if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");


/* THE RECIPIENT CLASS */


    /** @constructor */
    function Recipient() {
      this.id = Recipient.idCounter++;
      this.name = "";


      Object.defineProperty(this, "id", {
        get: function () { return this.id; },
        set: function(difId) { if(difId>0 && difId>Recipient.idCounter) {this.id = difId;
          } else {Console.log("Id must be greater than zero and greater than other ids.")}}
      })

      Object.defineProperty(this, "name", {
        get: function () { return this.name; },
        set: function(name) { this.name = name }
      })
    }

    Recipient.idCounter = 0;

    Recipient.prototype.toString = function () {
      var string;
      for (var i in this) {
        if(this.hasOwnProperty(i))
          string = i + ":" + this[i] + "; ";
      }
      return string;
    }
}

// Recipient.prototype.toString = function () {
// 	return "Recipiect: id=" + this.id + ", name=" + this.name;
// }
