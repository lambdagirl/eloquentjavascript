//interfaces, limited sets of functions or bindings that provide 
//functionality at a more abstract level, hiding their precise implementation.

//Encapsulation(Separating interface from implementation is a great idea. )

//divide programs into smaller pieces and make each piece responsible 
//for managing its own state.

//methods and propertirs
//Properties that are part of the interface are called public. 
//The others, which outside code should not be touching, are private. (_)

//Method :properties that hold function values
let rabbit = {};
rabbit.speak = function(line){
    console.log(`The rabbit says '${line}'`);
}
rabbit.speak("I'm alive");

function speak(line) {
    console.log(`The ${this.type} rabbit says ${line}`);
}
let whiteRabbit = {type:"white", speak}
let hungryRabbit = {type:"hungry", speak}
whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'

speak.call(hungryRabbit, "Burp!");
// → The hungry rabbit says 'Burp!'

function normalize(){
    console.log(this,coords.map(n => n / this.length));
}
normalize.call({coords:[0,2,3], length:5});
// → [0, 0.4, 0.6]

//Prototypes
let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString())
// → [object Object]

console.log(Object.getPrototypeOf({}) == Object.prototype);
// -> True
console.log(Object.getPrototypeOf(Object.prototype));
// -> null

console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true

let protoRabbit = {
    speak(line){
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type =  "killer";
killerRabbit.speak("SKREEE!");
console.log(killerRabbit);
// → The killer rabbit says 'SKREEEE!'

//Classes
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
  }

function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};
  
let weirdRabbit = new Rabbit("weird");
weirdRabbit.speak("heee!");



//Class notation
class Rabbit {
    constructor(type){
        this.type = type;
    }
    speak(line){
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}
let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// → hello

//Overriding derived properties
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small

//Maps
let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
  };
  
  console.log(`Júlia is ${ages["Júlia"]}`);
  // → Júlia is 62
  console.log("Is Jack's age known?", "Jack" in ages);
  // → Is Jack's age known? false
  console.log("Is toString's age known?", "toString" in ages);
  // → Is toString's age known? true


  // create objects with no prototype:
  console.log("toString" in Object.create(null))

  // or Map(); set,get,has 
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false

//Object.keys returns only an object’s own keys, not those in the prototype.
console.log({x:1}.hasOwnProperty("x"));
// -> true
console.log({x: 1}.hasOwnProperty("toString"));
// -> false

//polymorphism
Rabbit.prototype.toString = function(){
    return `a ${this.type} rabbit`;
}
console.log(String(blackRabbit));

//Symbols
