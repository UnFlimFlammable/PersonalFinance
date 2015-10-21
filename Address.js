if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var subscribable = require("./subscribers.js");

    /* THE ADDRESS CLASS */

  	/** @constructor */
  	function Address(){
  		this.streetNumber = 0;
  		this.street = "";
  		this.city = "";
  		this.state = "";
  		this.zipCode = 0;
  		this.county = "";

  		Object.defineProperty(this, "streetNumber", {
  			get: function () { return this.streetNumber; },
  			set: function(
  				/** !number */ streetNumber) {
  					if(streetNumber>0) this.streetNumber = streetNumber
  				}
  		})

  		Object.defineProperty(this, "street", {
  			get: function () { return this.street; },
  			set: function(
  				/** !string */ street) { this.street = street }
  		})

  		Object.defineProperty(this, "city", {
  			get: function () { return this.city; },
  			set: function(
  				/** !string */ city) { this.city = city }
  		})

  		Object.defineProperty(this, "state", {
  			get: function () { return this.state; },
  			set: function(
  				/** !string */ state) { this.state = state }
  		})

  		Object.defineProperty(this, "zipCode", {
  			get: function () { return this.zipCode; },
  			set: function(
  				/** !number */ zipCode) { this.zipCode = zipCode }
  		})

  		Object.defineProperty(this, "country", {
  			get: function () { return this.country; },
  			set: function(
  				/** !string */ country) { this.country = country }
  		})
  	};

  	Address.prototype.toString = function () {
  		var string;
  		for (var i in this) {
  			if(this.hasOwnProperty(i))
  				string = i + ":" + this[i] + "; ";
  		}
  		return string;
  	}

}
