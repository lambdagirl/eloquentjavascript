console.log(encodeURIComponent("Yes?"));
console.log(decodeURIComponent("Yes%3F"));

// POST /example/message.html HTTP/1.1
// Content-length: 24
// Content-type: application/x-www-form-urlencoded

// name=Jean&message=Yes%3F 

fetch("example/data.txt").then(response => {
    console.log(response.status);
    console.log(response.headers.get("Content-Type"));
})

fetch("example/data.txt")
    .then(response => response.text())
    .then(text => console.log(text));
    // → This is the content of data.txt


fetch("example/data.txt", {method: "DELETE"}).then(resp => {
    console.log(resp.status);
    // →405 
    //(means "method not allowed") 
})

fetch("example/data.txt", {headers: {Range: "bytes=8-19"}})
    .then(resp => resp.text())
    .then(console.log)

//HTTP Sandboxing
// Access-Control-Allow-Origin: *


//Appreciationg HTTP: 
//1,remote procedure calls; 
//2.build your communication around the concept of resources and HTTP methods
//Instead of a remote procedure called addUser, you use a PUT request to /users/larry. 
//Instead of encoding that user’s properties in function arguments, you define a JSON document format (or use an existing format) that represents a user.

//Security and HTTPS

//Form Field
//Focus
//<input type="text">
document.querySelector("input").focus();
console.log(document.activeElement.tagName);
document.querySelector("input").blur();
console.log(document.activeElement.tagName);

//Disabled Fields

//The Form As A Whole:
//form’s elements property, which acts both as an array-like object (accessible by number) and a map (accessible by name).

// <form action="example/submit.html">
//   Name: <input type="text" name="name"><br>
//   Password: <input type="password" name="password"><br>
//   <button type="submit">Log in</button>
// </form>
let form = document.querySelector("form");
console.log(form.elements[1].type);
// -> password
console.log(form.elements.password.type);
// -> password
console.log(form.elements.namedItem.form == form);
// -> true


//    event.preventDefault()

// <form action="example/submit.html">
//   Value: <input type="text" name="value">
//   <button type="submit">Save</button>
// </form>
  let form = document.querySelector(	"form");
  form.addEventListener("submit", event => {
    console.log("Saving value", form.elements.value.value);
    event.preventDefault();
  });


//   <input type="text"> length: <span id="length">0</span>
let text = document.querySelector("input");
let output = document.querySelector("#length")
text.addEventListener("input", ()=> {
    output.textContent = text.value.length;
})

// <label>
//   <input type="checkbox" id="purple"> Make this page purple
// </label>
let checkbox = document.querySelector("#purple")
checkbox.addEventListener("change", ()=>{
    document.body.style.background = checkbox.checked? "mediumpurple" : "";
})

// Color:
// <label>
//   <input type="radio" name="color" value="orange"> Orange
// </label>
// <label>
//   <input type="radio" name="color" value="lightgreen"> Green
// </label>
// <label>
//   <input type="radio" name="color" value="lightblue"> Blue
// </label>
let buttons = document.querySelectorAll("[name=color]");
for (let button of buttons){
    button.addEventListener("change", ()=>{
        document.body.style.background = button.value
    })
}

//File Fields
// <input type="file">
let input = document.querySelector("input");
input.addEventListener("change",()=>{
    if(input.files.length > 0){
        let file = input.files[0];
        console.log("You chose", file.name)
        if(files.type) console.log("it has type", file.type);
    }
})

// files object have properties such as name (the filename), size (the file’s size in bytes, which are chunks of 8 bits), and type (the media type of the file, such as text/plain or image/jpeg).
// Since reading a file from disk can take time, the interface must be asynchronous to avoid freezing the document.
let input = document.querySelector("input");
input.addEventListener("change",()=>{
    for (let file of Array.from(input.files)){
        let reader = new FileReader();
        reader.addEventListener("load", ()=>{
            console.log("File", file.name, "starts with", reader.result.slice(0,20));
        })
        reader.readAsText(file);
        
    }
})

function readFileText(file){
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.addEventListener("load", ()=> resolve(reader.result));
        reader.addEventListener("error", ()=>{reject(reader.error)});
        reader.readAsText(file)
    })
}

//Storing data client-side: localStorage
localStorage.setItem("username","paigel");
console.log(localStorage.getItem("username"));
// -> paigel
localStorage.removeItem("username");