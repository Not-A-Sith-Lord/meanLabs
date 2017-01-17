const _lodash = require("lodash");

class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.waitingList = [];
    this.passengers = [];
    this.direction = "up";
  }

  start() {
    const intervalId = setInterval(() => this.update(), 1000);
    this.intervalId = intervalId;

    // var myElevetor = this;
    // setInterval(function () {
    //   myElevetor.update()
    // }, 1000);
   }
  stop() {
    clearInterval(this.intervalId);
  }

  update() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`)
    if (this.requests.length > 0) {
      this.requests = _lodash.uniq(this.requests);

      if (this.requests.includes(this.floor)) {
        // passengers enter
        this._passengersEnter();
        // passangers leave
        this._passengersLeave();
        // remove the floor
         this.requests.splice(this.requests.indexOf(this.floor),1);
      }

      // should i switch directins ?
      if (this.direction === "up" && this.floor > _lodash.max(this.requests)){
        this.direction = "down";
      }
      else if (this.direction === "down" && this.floor < _lodash.min(this.requests)){
        this.direction = "up";

      }

      if (this.direction === "up") {
        this.floorUp();
      } else {
        this.floorDown();
      }
    }
  }

  _passengersEnter() {
    this.waitingList.forEach((person, index) => {
      if (person.originFloor === this.floor) {
        this.passengers.push(person);
        this.waitingList.splice(index, 1);
        this.requests.push(person.destinationFloor);
        console.log(`${person.name} just entered at ${this.floor}`);
      }
    })
  }

  _passengersLeave() {
    this.passengers.forEach((person, index) => {
      if (person.destinationFloor === this.floor) {
        this.passengers.splice(index, 1);
        console.log(`${person.name} just left at ${this.floor}`);
      }
    })
  }

  floorUp() {
    if (this.floor < this.MAXFLOOR){
      this.floor += 1;
    }
  }

  floorDown() {
    if (this.floor > 0) {
      this.floor -= 1;
    }
  }

  call(person) {
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }
  log() { }
}

module.exports = Elevator;
