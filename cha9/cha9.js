//Creating a regular expression
//A regular expression is a type of object. 
//It can be either constructed with the RegExp constructor or written as a literal value by enclosing a pattern in forward slash (/) characters.
let re1 = new RegExp("abc");
let re2 = /abc/;

let eighteenPlus = /eighteen\+/;

//testing for matches; or indexOf
console.log(/abc/.test("abcde"));
console.log(/abc/.test('aabCc'));

//sets of characters; => [];match any of the characters between the brackets
console.log(/[0123456789]/.test(" in 1992")); // -> true
console.log(/[0-9]/.test("in 1992")); // -> true


// \d	Any digit character
// \w	An alphanumeric character (“word character”)
// \s	Any whitespace character (space, tab, newline, and similar)
// \D	A character that is not a digit
// \W	A nonalphanumeric character
// \S	A nonwhitespace character
// .	Any character except for newline
let dateTime1 = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
let dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/; //{5,} means five or more times
console.log(dateTime1.test("01-30-2003 15:30")); // -> true
console.log(dateTime1.test("jan-30-2003 15:30"));// -> false

let notBinary = /[^01]/;
console.log(notBinary.test("1100101010111")); // -> false
console.log(notBinary.test("1211201010010")); // -> true

//repeating parts of a pattern
console.log(/'\d+'/.test("'123'")); // -> true
console.log(/'\d+'/.test("''")); // -> false
console.log(/'\d*'/.test("''")); // -> true
console.log(/'\d*'/.test("'123'")); // -> true
 
let neighbor = /neighbou?r/;
console.log(neighbor.test('neighbor'));

//Grouping subexpressions
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooooohoohoooo")) // -> true

//matches and groups; exec (execute) method return null if no match was found and return an object with information about the match otherwise.
let match = /\d+/.exec("one two 100");
console.log(match); // -> [100]
console.log(match.index) // -> 8;
//String values have a match method that behaves similarly.
console.log("one two 100".match(/\d+/)); // -> ["100"]

let quoteText = /'([^']*)'/;
console.log(quoteText.exec("she said 'hello,'")); // -> ["'hello'", "hello"]

console.log(/bad(ly)?/.exec("bad")); // ->["bad", undefined]
console.log(/(\d)+/.exec("123")); // ->["123", 3]

//The Date Class
console.log(new Date()); 
//Tue Feb 25 2020 15:46:49 GMT-0800 (Pacific Standard Time)
console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)
// month numbers start at zero (so December is 11)
console.log(new Date(2019,11,9).getTime()); 
// ->1575878400000
console.log(new Date(1575878400000)); 
// ->Mon Dec 09 2019 00:00:00 GMT-0800 (Pacific Standard Time)

function getDate(string){
    //The _ (underscore) binding is ignored and used only to 
    //skip the full match element in the array returned by exec.
    let [_,month,day,year]= 
        /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year,month-1,day);
}

console.log(getDate("1-30-2002"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

//Word and String Boundaries; "\b"
console.log(/cat/.test("concatenate"));     // -> ture
console.log(/\bcat\b/.test("concatenate")); // -> false

//Choice Patterns "|"
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));  // -> ture
console.log(animalCount.test("15 pigchickens")); // -> false

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
function parseINI(string){
    //Start with an object to hold the top-level fields
    let result = {};
    let section = result;
    string.split(/\r?\n/).forEach(line => {
        let match;
        if (match =line.match(/^(\w+)=(.*)$/)){
            section[match[1]]=match[2];
        } else if (match = line.match(/\[(.*)\]$/)){
            section = result[match[1]] ={};
        } else if (!/^\s*(;.*)?$/.test(line)) {
            throw new Error("Line '" + line + "' is not valid.");
        }
    })
    return result;
    
}

//recurring use of ^ and $ to make sure the expression matches the whole line, not just part of it
console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki
nknk`
));

let line = "fullname=Larry Doe"

console.log(line.match(/^(\w+)=(.*)$/))