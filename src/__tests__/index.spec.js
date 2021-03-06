const assert = require('assert');
const EventEmitter = require('../index');

describe('EventEmitter class', () => {
    describe('when we attach a listener an event', () => {
        let cuddleCount = 0;
        let cuddle = () => {
            cuddleCount++;
        };

        let ee = new EventEmitter();
        ee.on('puppies', cuddle);

        it('should be called when the event is emitted', (done) => {
            ee.emit('puppies');

            setTimeout(() => {
                assert(cuddleCount === 1);
                done();
            }, 25);
        });

        it('should not be called when another event is emitted', (done) => {
            ee.emit('goldfish');

            setTimeout(() => {
                assert(cuddleCount === 1);
                done();
            }, 25);
        });

        it('should be called when the event is emitted again (x2)', (done) => {
            ee.emit('puppies');
            ee.emit('puppies');

            setTimeout(() => {
                assert(cuddleCount === 3);
                done();
            }, 25);
        });

        it('should not be called it is removed', (done) => {
            ee.off('puppies', cuddle);
            ee.emit('puppies');

            setTimeout(() => {
                assert(cuddleCount === 3);
                done();
            }, 25);
        });
    });

    describe('when we attach a listener to an event on a throttled EventEmitter', () => {
        let cuddleCount = 0;
        let cuddle = () => {
            cuddleCount++;
        };

        let ee = new EventEmitter({
            throttle: 150
        });
        ee.on('puppies', cuddle);

        it('should not call the event more than once sucessively', (done) => {
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');
            ee.emit('puppies');

            setTimeout(() => {
                assert.equal(cuddleCount, 2);
                done();
            }, 150);
        });

        it('should allow the event to be caled again later', (done) => {
            setTimeout(() => {
                ee.emit('puppies');
            }, 100);

            setTimeout(() => {
                assert.equal(cuddleCount, 3);
                done();
            }, 200);
        });

    });

    describe ('When we listen for multiple events', () => {

        it('should call multiple listeners on one event', (done) => {
            let ee2 = new EventEmitter({
                throttle: 150
            });

            let calledCount = 0;

            ee2.on('puppies1', () => {
                calledCount++;
            });

            ee2.on('puppies1', () => {
                calledCount++;
            });

            ee2.emit('puppies1');

            setTimeout(() => {
                assert(calledCount === 2);
                done();
            }, 25);
        });
    });

    describe ('When we emit an event with arguments', () => {
        it('should pass those arguments to the event listeners', (done) => {
            let ee = new EventEmitter();
            ee.on('fourArguments', (a1, a2, a3, a4) => {
                assert.equal(a1, 6);
                assert.equal(a2, 'puppy');
                assert(a3 === undefined);
                assert.deepEqual(a4, {
                    thisKey: 'thisValue',
                    thatKey: 'thatValue'
                });

                done();
            });

            ee.emit('fourArguments', 6, 'puppy', undefined, {
                thisKey: 'thisValue',
                thatKey: 'thatValue'
            });
        });
    });

    describe('When we bind to \'*\'', () => {
        it('should emit on another event', (done) => {
            let ee = new EventEmitter();

            ee.on('*', (event, number) => {
                assert.equal(event, 'puppies');
                assert.equal(number, 3);
                done();
            });

            ee.emit('puppies', 3);
        });

        it('should emit when called directly', (done) => {
            let ee = new EventEmitter();

            ee.on('*', done);

            ee.emit('*');
        });
    });

    describe('When we bind with .once()', () => {
        let ee = new EventEmitter();

        it('should call our listener', (done) => {
            ee.once('a', done);
            ee.emit('a');
        });

        it('should not call our listener twice', () => {
            let callCount = 0;

            ee.once('b', () => {
                callCount++;
            });

            ee.emit('b');
            ee.emit('b');
            ee.emit('b');

            assert.equal(callCount, 1);
        });
    });
});
