//Abstracting repetition
const repeat=(n,action) => {
    for (let i =0;i<n;i++){
        action(i);
    }
}
repeat(3,console.log);

let labels=[];
repeat(5, i=> {
    labels.push(`Unit ${i+1}`)
})
console.log(labels)

//Higher-Order Function
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

