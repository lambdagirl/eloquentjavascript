//Strict Mode;
function canYouSpotTheProblem(){
     "use strict";
    for (counter = 0; counter < 10; counter++){
        for (counter = 0; counter < 10; counter++){
            console.log("happy happy");
        }
    }
}
canYouSpotTheProblem()
// → ReferenceError: counter is not defined

function Person(name){
     "use strict";
    //this refers to the global scope object, 
    //which is an object whose properties are the global bindings.
    this.name = name;
}
let ferdinand =  Person("Ferdinand")
console.log(name);
// → TypeError: Cannot set property 'name' of undefined

//Types
// (VillageState, Array) → {direction: string, memory: Array}
function goalOrientedRobot(state, memory) {
    // ...
  }

  //Testing
function test(label,body){
    if(!body()) console.log(`Failed: ${label}`);
}
test("convert Latain text to uppercase", ()=> {
    return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text top uppercase", ()=> {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
    return "مرحبا".toUpperCase() == "مرحبا";
});

//Debugging

//Error propagation
//One option is to make it return a special value. 
function pormptNumber(question){
    let result = Number(pormpt(question));
    if (Number.isNaN(result)) return null;
    else return result;
}
console.log(pormptNumber("How many trees do you see?"))
//downside;
function lastElement(array) {
    if (array.length == 0) {
      return {failed: true};
    } else {
      return {element: array[array.length - 1]};
    }
  }
  console.log(lastElement())

//Exceptions
function promptDirection(question){
    let result = prompt(question);
    if (result.toLowerCase() == "left" ) return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new Error("Invalid direction: " + result);
}
function look(){
    if (promptDirection("Which way?") == "L"){
        return "a house";
    } else {
        return "two angry bears";
    }
}

try{
    console.log("You see", look());
}catch(error){
    console.log("Somethon went wrong: " + error);
}


//Cleaning up after exceptions
const accounts = {
    a:100,
    b:0,
    c:20
}
function getAccount(){
    let accountName = prompt("Enteran account name");
    if (!accounts.hasOwnProperty(accountName)){
        throw new Error(`No such account: ${accountName}`)
    }
    return accountName;
}
// function transfer(from, amount) {
//     if (accounts[from]< amount) return;
//     accounts[from] -= amount;
//     accounts[getAccount()] += amount;
// }

function transfer(from, amount) {
    if (accounts[from]< amount) return;
    let progress = 0;
    try {
        accounts[from] -= amount;
        progress = 1
        accounts[getAccount()] += amount;
        progress = 2
    } finally{
        //it repairs the damage it did
        if( progress == 1){
            accounts[from] += amount;
        }
    }
}

//Selective catching
for (;;){
    try{
        let dir = promtDirection("where?"); //typo!
        console.log("You chose ", dir);
        break;
    }catch(e){
        console.log("Noa a valid direction. Try again.")
    }
}
class InputError extends Error {}
for (;;){
    try{
        let dir = promtDirection("where?"); //typo!
        console.log("You chose ", dir);
        break;
    }catch(e){
        if (e instanceof InputError){
            console.log("Noa a valid direction. Try again.")
        }
        else {
            throw e;
        }
    }
}

//Assertions
function firstElement(array) {
    if (array.length == 0) {
      throw new Error("firstElement called with []");
    }
    return array[0];
  }
    console.log(firstElement([]))