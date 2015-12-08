const throttle = require('lodash.throttle');
const emit = Symbol();

/**
 * Class: EventEmitter es6 compliant port of the node EventEmitter
 */
class EventEmitter {

    constructor (options) {
        this.options = options || {};
        this.listeners = {};

        if (this.options.throttle) {
            this.emit = throttle(this[emit], this.options.throttle);
        } else {
            this.emit = this[emit];
        }
    }

    [ emit ] (event) {
        event = event || this.options.defaultEvent;

        if (!event) {
            return;
        }

        let args = [];

        if (arguments.length > 1) {
            for (let i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
        }

        if (this.listeners[event]) {
            this.listeners[event].forEach((fn) => {
                if (args) {
                    fn.apply(null, args);
                } else {
                    fn();
                }
            });
        }
    }

    allOff (event) {
        if (event) {
            this.listeners[event] = [];
        } else {
            this.listeners = {};
        }
    }

    off (event, listener) {
        if (event === undefined) {
            this.listeners = {};
            return;
        }

        if (!this.listeners[event]) {
            return;
        }

        let index = this.listeners[event].indexOf(listener);

        while (index >= 0) {
            this.listeners[event].splice(index, 1);
            index = this.listeners[event].indexOf(listener);
        }
    }

    on (event, listener) {
        if (this.listeners[event]) {
            this.listeners[event].push(listener);
        } else {
            this.listeners[event] = [listener];
        }

        return listener;
    }

}

module.exports = EventEmitter;
