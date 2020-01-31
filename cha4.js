// const range =(a,b)=>{
// 	let res =[];
//     for(i=a;i<=b; i++ ){
//         res.push(i);
//     }
//   return res
// }

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