if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /* THE RECIPIENT CLASS */

    /** @constructor */
    function Recipient(
      /** !string */ name) {

      var id = Recipient.idCounter++;
      var name = "";

      Object.defineProperty(this, "id", {
        get: function () { return id; }
      });

      Object.defineProperty(this, "name", {
        get: function () { return name; },
        set: function(value) {
          if(typeof value === 'string') {
            name = value
          } else {console.log('Recipient.name argument was not typeof string');}
        }
        this.notify("changed", this);
      });

      this.toJSON = function () {
          return {
              id: this.id,
              name: this.name,
          };
      };

      subscribable(this);

    } // end Recipient () {} class

    Recipient.idCounter = 0;

    Recipient.prototype.toString = function () {
      var string;
      for (var i in this) {
        if(this.hasOwnProperty(i))
          string = i + ":" + this[i] + "; ";
      }
      return string;
    }

    module.exports = Recipient;

    return Recipient;
});
