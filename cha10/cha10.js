const {parse} = require("ini");
console.log(parse("x = 10\ny = 20"));
// → {x: "10", y: "20"}

//Improvised modules （即兴创作）
const weekDay =function(){
    const names = ["SUnday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return {
        name(number) { return names[number];},
        number(name) { return names.indexOf(name);}
    }
}
console.log(weekDay.name(weekDay.number("Sunday")));

//Evaluating data as code
//1,use eval
const x = 1;
function evalAndReturnX(code){
    eval(code);
    return x;
}
console.log(evalAndReturnX("var x = 2"));
// → 2
console.log(x);
// → 1

//2,use Function
let plusOne = Function("n","return n+1;")
console.log(plusOne(4));
//5

//This is precisely what we need for a module system. 
//We can wrap the module’s code in a function and use that function’s scope as module scope.

//CommonJS
//a date-formatting function
const ordinal = require("ordinal");
//date-names to get the English names for weekdays and months.
const {days, months} = require("date-names");
exports.formatDate = function(date, format){
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if(tag == "YYYY") return date.getFullYear();
        if(tag == "M") return date.getMonth();
        if(tag = "MMMM") return months[date.getMonth()];
        if(tag = "D" ) return date.getDate();
        //convert numbers to strings like "1st" and "2nd"
        if(tag = "Do" ) return ordinal(date.getDate()); 
        if(tag = "dddd") return days[date.getDate()];
    });
};

const {formatDate} = require("./format-date");

console.log(formatDate(new Date(2017, 9, 13), "dddd the D"));
// → Friday the 13th

//Define require
require.catch = Object.create(null);

function require(name){
    if (!(name in require.catch)){
        let code = readFile(name);
        let module = {exports:{}};
        require.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(require, module.exports, module);
    }
    return require.cache[name].exports;
}