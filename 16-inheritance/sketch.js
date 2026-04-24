// OOP Inheritance Demo

let myCar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let myCar = new Car('Kona');

  console.log(myCar.getName());
  console.log(myCar.getType());
}

function draw() {
  background(220);
}


class Veicle {
  constructor(type, name){
    this.type = type;
    this.name = name;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }
}

class Car extends Veicle{
  constructor(name){
    super('car',name);
  }

  getType(){
    return this.type;
  }

  getName(){
    return "This is a car called" + super.getName();
  }
}