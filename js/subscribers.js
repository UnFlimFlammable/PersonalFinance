if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

    var publisher = {
        subscribe: function (eventType, fn) {
            if (!this.subscribers.hasOwnProperty(eventType)) {
                this.subscribers[eventType] = [];
            }
            this.subscribers[eventType].push(fn);
        },
        unsubscribe: function (eventType, fn) {
            this.subscribers[eventType].splice(this.subscribers[eventType].indexOf(fn), 1);
        },
        notify: function (eventType, arg) {

            if (this.subscribers.hasOwnProperty(eventType)) {
                var s = this.subscribers[eventType];
                var i, max = s.length;

                for (i = 0; i < max; i += 1) {
                    s[i](arg);
                }

            }
        }
    };

    function makePublisher(o) {
        var i;
        for (i in publisher) {
            if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
                o[i] = publisher[i];
            }
        }

        o.subscribers = {};
    };

    return makePublisher;

});
