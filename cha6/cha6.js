//interfaces接口, limited sets of functions or bindings that provide 
//functionality at a more abstract level, hiding their precise implementation.

//Encapsulation封装(Separating interface from implementation is a great idea. )

//divide programs into smaller pieces and make each piece responsible 
//for managing its own state.

//methods and properties
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

 
//Symbols:Unlike strings, newly created symbols are unique—you cannot create the same symbol twice.
let sym = Symbol("name");
console.log(sym = Symbol("name"));
//-> false;
Rabbit.prototype.sym =55;
console.log(blackRabbit.sym); //-> 55;

//unique and usable as property names
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function(){
    return `${this.length} cm of blue yarn`;
}
console.log([1,2].toString()); //-> 1,2
console.log([1,2][toStringSymbol]()); // → 2 cm of blue yarn

let stringObject = {
    [toStringSymbol](){return "a jute rope";}
}
console.log(stringObject[toStringSymbol()]); // -> a jute rope;


//The interator interface; ("Symbol.iterator");
//next, value, and done 
let okInterator = "OK"[Symbol.iterator]();
console.log(okInterator.next()); // → {value: "O", done: false}
console.log(okInterator.next()); // → {value: "K", done: false}
console.log(okInterator.next()) //// → {value: undefined, done: true}


//interable structure, build a matrix calss, 2-dimensional array;
//elements are stored row by row, so, for example, the third element in the fifth row is (using zero-based indexing) stored at position 4 × width + 2.
//optional element function that will be used to fill in the initial values.
class Matrix {
    constructor(width, height, element = (x,y) => undefined) {
        this.width = width; 
        this.height = height;
        this.content = [];
        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++){
                this.content[y*width + x] = element(x,y);
            }
        }
    }
    get(x,y){
        return this.content[y*this.width + x];
    }
    set(x,y,value){
        this.content[y * this.width + x] = value;
    }
}
//
class MatrixIterator {
    constructor(matrix){
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }
    
}

//Getters, setters, and statics
//Interfaces often consist mostly of methods, 
//but it is also okay to include properties that hold non-function values. 
//For example, Map objects have a size property that tells you how many keys are stored in them.

let verfyingSize = {
    get size(){
        return Math.floor(Math.random()*100)
    }
}
console.log(varyfingSize.size); //->73
console.log(verfyingSize.size); //->49


class Temperature{
    constructor(celsius){
        this.celsius = celsius;
    }
    get fahrenheit(){
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value){
        this.celsius = (value - 32) / 1.8;
    }
    static fromFahrenheit(value){
        return new Temperature((value -32)/1.8);
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit); // -> 71.6;
temp.fahrenheit = 86;
console.log(temp.celsius); //-> 30;

//Inheritance

//The use of the word extends indicates that 
//this class shouldn’t be directly based on the default Object prototype 
//but on some other class. This is called the superclass. The derived class is the subclass.
class SymmericMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        // the constructor calls its superclass’s constructor through the super keyword. 
        super(size, size, (x,y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }
    set(x, y, value){
        super.set(x,y,value);
        if (x != y){
            super.set(y,x,value);
        }
    }
}

let matrix = new SymmericMatrix(5, (x,y)=> `${x},${y}`);
console.log(matrix.get(2,3))


//The instanceof operator
  console.log(
    new SymmetricMatrix(2) instanceof SymmetricMatrix);
  // → true
  console.log(new SymmetricMatrix(2) instanceof Matrix);
  // → true
  console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
  // → false
  console.log([1] instanceof Array);
  // → true