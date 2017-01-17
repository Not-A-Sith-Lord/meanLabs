const Elevator = require('./elevator.js');
const Person = require('./person.js');
const testElevator = new Elevator();


const bob = new Person("bob", 0, 7);
const alice = new Person("alice", 3, 4);
const evilJonny = new Person("evilJonny", 6, 3);
const chris = new Person("chris", 5, 7);
const jonny = new Person("jonny", 7, 8);

testElevator.call(bob);
testElevator.call(alice);
testElevator.call(chris);
testElevator.call(jonny);
testElevator.call(evilJonny);
testElevator.start();
