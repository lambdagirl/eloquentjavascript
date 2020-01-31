//sum a range by steps
const range =(a,b,c)=>{
    let res =[];
    if(typeof c == 'undefined'){
        c = 1;
    }
  	for(i=a;c>=0 ? i<=b : i>=b; i+=c ){
      res.push(i);
    }
  return res
}

const sum =(array) =>{
    let total =0;
    for(let a of array){
        total += a;
    }
    return total;
}
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

//Reversing an array
const reverseArray=(arr)=>{
    let newArray =[]
      for(let a of arr){
          newArray.unshift(a);
      }
    return newArray;
  }
  //Reversing an array inplace
  //The trick is to swap the first and last elements, then the second and second-to-last, and so on. You can do this by looping over half the length of the array (use Math.floor to round down—you don’t need to touch the middle element in an array with an odd number of elements) and swapping the element at position i with the one at position array.length - 1 - i. You can use a local binding to briefly hold on to one of the elements, overwrite that one with its mirror image, and then put the value from the local binding in the place where the mirror image used to be.
  const reverseArrayInPlace =(arr)=>{
      for(i=0;i<Math.floor(arr.length/2);i++){
          let temp = arr[i];
          arr[i]=arr[arr.length-1-i];
          arr[arr.length-1-i]=temp;
      }
  }
  console.log(reverseArray(["A", "B", "C"]));
  // → ["C", "B", "A"];
  let arrayValue = [1, 2, 3, 4, 5];
  reverseArrayInPlace(arrayValue);
  console.log(arrayValue);
