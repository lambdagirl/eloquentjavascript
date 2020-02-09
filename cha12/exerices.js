//Array
// Modify these definitions...
topScope.array = (...values) => values;

topScope.length = array => array.length

topScope.element = (array,i) => array[i]

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
// → 6
//Closure
run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`);
// → 9

//Comments
// This is the old skipSpace. Modify it...
function skipSpace(string) {
    let first = string.search(/#/);
    if (first == -1) return "";
    return string.slice(first);
  }
function skipSpace(string) {
    let skippable = string.match(/^(\s|#.*)*/);
    return string.slice(skippable[0].length);
}
  
  
  console.log(parse("# hello\nx"));
  // → {type: "word", name: "x"}
  
  console.log(parse("a # one\n   # two\n()"));
  // → {type: "apply",
  //    operator: {type: "word", name: "a"},
  //    args: []}