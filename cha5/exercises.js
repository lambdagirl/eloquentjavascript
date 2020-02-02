//flatening an array of array
let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
console.log(arrays.reduce((a, b) => a.concat(b)));

// Your own loop
function loop(value,test,update,body){
	if(test(value)){
      body(value)
      value=update(value)
      }else return;
  	return loop(value,test,update,body)
}
  
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

//everything
function every(array, test) {
    for (let arr of array){
      if(!test(arr)){
          return false
      }
  }
    return true
}

function every1(array, test) {
    if(array.some(arr => !test(arr))) return false
    return true;

}

console.log(every1([1, 3, 5], n => n < 10));
// → true
console.log(every1([2, 4, 16], n => n < 10));
// → false
console.log(every1([], n => n < 10));
// → true
