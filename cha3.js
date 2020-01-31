const minimum =(a,b) =>{
    if(a<=b){
        return a
    }
    return b
}

minimum(9,20)

const recursion = n =>{
    if (n<0){
        n = recursion(-n)
    }
    if(n===0){
        return "even"
    }
    if(n===1){
        return "odd"
    }
    else {
        return recursion(n-2)
    }
}

console.log(recursion(75));
console.log(recursion(50));
console.log(recursion(-10));