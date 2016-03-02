## Welcome to cannery-event-emitter

An ES6 compliant port of the Node EventEmitter.

## Installation

```
npm install cannery-event-emitter
```

## Usage

While the EventEmitter can be used by itself like this:

```
const EventEmitter = require('cannery-event-emitter');

const emitter = new EventEmitter();

emitter.on('my-event', () => {
    console.log('triggered an event');
});

emitter.emit('my-event');
```

You will probably often find yourself extending it into a class like this:

```
const EventEmitter = require('cannery-event-emitter');

class Dog extends EventEmitter {

}

const lassie = new Dog();

lassie.on('bark', () => {
    console.log('BARK!');
});

emitter.emit('bark');
```

## API

### allOff(<string> eventName)

Stops listening for all instances of a certain event name.

```
const EventEmitter = require('cannery-event-emitter');

dancer = new EventEmitter();

dancer.on('dance', () => {
    // ...    
});

dancer.on('dance', () => {
    // ...    
});

dancer.allOff('dance');
```

Returns: `undefined`

### emit(<string> eventName)

Publishes a topic to be announced to any current subscribers.

```
const EventEmitter = require('cannery-event-emitter');

dancer = new EventEmitter();

dancer.on('dance', () => {
    // ...    
});

dancer.emit('dance');
```

returns `undefined`

### off(<string> eventName, <function> listener)

Removes an instance of an event listener

```
const EventEmitter = require('cannery-event-emitter');

dancer = new EventEmitter();

const onDance = dancer.on('dance', () => {
    // ...    
});

dancer.off('dance', onDance);
```

Returns: `undefined`

### on(<string> eventName, <function> listener)

Adds an event listener. When an event is emitted with the same `eventName`, the listener function will be called.

```
const EventEmitter = require('cannery-event-emitter');

dancer = new EventEmitter();

dancer.on('dance', () => {
    // ...    
});
```

Additionally, you can listen to the '\*' event to listen to all events. In this case, the first parameter passed to the listener will be the event name.

Returns: the event listener function.

## Credits

- [Pete Eigel](https://github.com/peteigel) Original Author

- [Tyson Cadenhead](https://github.com/tysoncadenhead) Documentation

## Contributing

We encourage you to contribute to cannery-event-emitter by submitting bug reports and pull requests through [Github](http://github.com).

## License

cannery-event-emitter is released under The [MIT License](http://www.opensource.org/licenses/MIT) (MIT)

Copyright (c) [2015] [Aloompa LLC]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
