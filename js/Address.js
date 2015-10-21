if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /* THE ADDRESS CLASS */

  	/** @constructor */
  	function Address(
      /** !number */ streetNumber,
      /** !string */ street,
      /** !string */ city,
      /** !string */ state,
      /** !number */ zipCode,
      /** !string */ street ) {

  		var streetNumber = streetNumber;
  		var street = street;
  		var city = city;
  		var state = state;
  		var zipCode = zipCode;
  		var county = country;

  		Object.defineProperty(this, "streetNumber", {
  			get: function () { return streetNumber; },
  			set: function(/** !number */ value) {
  					if(value>0 && typeof value === 'number') {
              streetNumber = value;
            } else {console.log('Address.streetNumber argument was not typeof number or not >0');}
            this.notify("changed", this);
				}
  		});

  		Object.defineProperty(this, "street", {
  			get: function () { return street; },
  			set: function(/** !string */ value) {
          if(typeof value === 'string') {
            street = value;
          } else {console.log('Address.street argument was not typeof string');}
          this.notify("changed", this);
        }
  		});

  		Object.defineProperty(this, "city", {
  			get: function () { return city; },
  			set: function(/** !string */ value) {
          if(typeof value === 'string') {
              city = value
            } else {console.log('Address.city argument was not typeof string');}
         }
         this.notify("changed", this);
  		});

  		Object.defineProperty(this, "state", {
  			get: function () { return state; },
        set: function(/** !string */ value) {
          if(typeof value === 'string') {
              state = value;
            } else {console.log('Address.state argument was not typeof string');}
         }
         this.notify("changed", this);
  		});

  		Object.defineProperty(this, "zipCode", {
  			get: function () { return zipCode; },
        set: function(/** !number */ value) {
            if(value>100000 && typeof value === 'number') {
              zipCode = value;
            } else {console.log('Address.zipCode argument was not typeof number or not >100000');}
            this.notify("changed", this);
        }
  		});

  		Object.defineProperty(this, "country", {
  			get: function () { return country; },
        set: function(/** !string */ value) {
          if(typeof value === 'string') {
              country = value;
            } else {console.log('Address.country argument was not typeof string');}
         }
         this.notify("changed", this);
  		});

      this.toJSON = function () {
          return {
              streetNumber: this.streetNumber,
              street: this.street,
              city: this.city,
              state: this.state,
              zipCode: this.zipCode,
              country: this.country
          };
      };

      subscribable(this);

  	}; // end Address() {} class

  	Address.prototype.toString = function () {
  		var string;
  		for (var i in this) {
  			if(this.hasOwnProperty(i))
  				string = i + ":" + this[i] + "; ";
  		}
  		return string;
  	};

    module.exports = Address;

    return Address;

});
