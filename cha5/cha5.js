//Abstracting repetition
const repeat=(n,action) => {
    for (let i =0;i<n;i++){
        action(i);
    }
}
repeat(3,console.log); 
// → 0
// → 1
// → 2

let labels=[];
repeat(5, i=> {
    labels.push(`Unit ${i+1}`)
})
console.log(labels)
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]


//Higher-Order Function
//Higher-order functions allow us to abstract over actions, not just values. 
//1.function create new functions
function greaterThan(n){
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

//2.function change other funcations
function noisy(f){
    return (...args) =>{
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args,", returned",result);
        return result;
    }
}
noisy(Math.max)(3,2,1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1

//function provide new types of control flow.
function unless(test,then){
    if (!test)then()
}
repeat(3, n=>{
    unless(n % 2 ==1, ()=>{
        console.log(n, "is even");
    })
});

//forEach
["A", "B"].forEach(l => console.log(l));


//dataset
const SCRIPTS = require('./script.js')
console.log(SCRIPTS.filter( script => script.living))
function filter(arr,test){
    let passed = [];
    for (let element of arr){
        if (test(element)){
            passed.push(element)
        }
    }
    return passed;
}
console.log(filter(SCRIPTS, script=>script.living));
console.log(SCRIPTS.filter(s=> s.direction == "ttb"));


//Transforming with Map;
function map(array, transform) {
    let mapped = [];
    for (let element of array){
        mapped.push(transform(element));
    }
    return mapped;
}
let rtlSripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlSripts, s => s.name))

//Summarizing with reduce(fold)
function reduce(array, combine, start){
    let current = start;
    for (let element of array){
        current = combine(current,element);
    }
    return current;
}
console.log(reduce[1,2,3,4], (a,b) => a+b ,0);
console.log(reduce[1,2,3,4], (a,b) => a+b);

function characterCount(script){
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from );
    },0);
}

console.log(SCRIPTS.reduce((a,b) => {
    return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}

//Composability
let biggest = null;
for (let script of SCRIPTS) {
    if (biggest == null || characterCount(biggest) < characterCount(script)){
        biggest = script;
    }
}
console.log(biggest);

function average(array){
    return reduce((a,b) => a+b) / array.length;
}
console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))));
// -> 1165
console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))));
// -> 204

let total = 0, count = 0;
for (let script of SCRIPTS){
    if (script.living){
        total += script.year;
        count +=1;
    }
}
console.log(Math.round(total / count));