const url = "https://eloquentjavascript.net/author";
const types = ["text/plain",
               "text/html",
               "application/json",
               "application/rainbows+unicorns"];

function showTypes(){
    for (let type of types){
        fetch(url, {headers:{accept: type}})
            .then(response => response.text())
            .then(text => console.log(type +":", text));
        }
    }
showTypes()

//A JavaScript workbench

document.querySelector("button").addEventListener("click", ()=>{
    let code = document.querySelector("textarea").value;
    let newNode = document.querySelector("#output");
    try {
        let result = Function(code)();
        newNode.innerText = String(result);
    } catch (error) {
        newNode.innerText = error;
    }
});