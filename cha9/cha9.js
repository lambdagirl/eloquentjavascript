let re1 = new RegExp("abc");
let re2 = /abc/;

let eighteenPlus = /eighteen\+/;

//testing for matches; 
console.log(/abc/.test("abcde"));
console.log(/abc/.test('aabCc'));

//sets of characters; => []
console.log(/[0123456789]/.test(" in 1992"));
console.log(/[0-9]/.test("in 1992"));
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:30"));
console.log(dateTime.test("jan-30-2003 15:30"));

let notBinary = /[^01]/;
console.log(notBinary.test("1100101010111"));
console.log(notBinary.test("1211201010010"))

//repeating parts of a pattern
console.log(/'\d+'/.test("'123'"));
console.log(/'\d+'/.test("''"));
console.log(/'\d*'/.test("''"));
console.log(/'\d*'/.test("'123'"));

let neighbor = /neighbou?r/;
console.log(neighbor.test('neighbor'));


//matches and groups;
let match = /\d+/.exec("one two 100");
console.log(match);
console.log(match.index)
console.log("one two 100".match(/\d+/));

let quoteText = /'([^']*)'/;
console.log(quoteText.exec("she said 'hello,'"));

console.log(/bad(ly)?/.exec("bad"));
console.log(/(\d)+/.exec("123"));

console.log(new Date());
console.log(new Date(2019,11,9));
console.log(new Date(1992, 11, 06, 12, 59, 59, 999));
console.log(new Date(2019,11,9).getTime());
console.log(new Date(1575878400000));

function getDate(string){
    let [_,month,day,year]= /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);//The _ (underscore) binding is ignored and used only to skip the full match element in the array returned by exec.
    return new Date(year,month-1,day)
}
console.log(getDate("1-30-2002"));

console.log(/(\d{1,2})-(\d{1,2})-(\d{4})/.exec("1-30-20023"))

//Choice Patterns
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pig"));
console.log(animalCount.test("15 pigchickens"));

//The Replace Method
console.log("papa".replace("p","m"));
console.log("papa".replace(/p/g,"m"));

console.log(
    "Liskov, Barara\nMcCarthy, John\nWadler,Philip"
    .replace(/(\w+), (\w+)/g, "$2 $1"));

let s = "the cia and fbi";
console.log(s.replace(/\b(fbi)|(cia)\b/g, 
    str => str.toUpperCase()
    ))

let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b","gi");
console.log(text.replace(regexp, "_$1_"))

//search method
console.log("  word".search(/\S/));
console.log("     ".search(/\S/));

let pattern = /y/g;
pattern.lastIndex = 3;
let match1 = pattern.exec("xyzzy");
console.log(match1.index);
// → 4

console.log(pattern.lastIndex);
// → 5
console.log(match1)

let global = /abc/g;
console.log(global.exec("xyz abc"));
let sticky =/abc/y;
console.log(sticky.exec("xyz abc"))

let digit=/\d/g
console.log(digit.exec("here it is: 1"));

console.log(digit.exec("and now: 1"));

//Looping over matches
let input="A String with 3 numbers in it... 42 and 88.";
let numbers=/\b\d+\b/g;
let match2;
while (match2 = numbers.exec(input)){
    console.log("Found",match2[0],"at",match2.index)
}

//Parsing an INI file
