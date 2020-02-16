let list = document.querySelector("select");
let note = document.querySelector("textarea");

let state;
//2.The setState method makes sure the DOM is showing 
//a given state and stores the new state to localStorage. 
function setState(newState){
    list.textContent = "";
    for (let name of Object.keys(newState.notes)){
        let option = document.createElement("option");
        option.textContent = name;
        if (newState.selected == name) {
            option.selected = true;
        }
        list.appendChild(option);
    }
    note.value = newState.notes[newState.selected];
    localStorage.setItem("Notes", JSON.stringify(newState));
    state = newState;
}

//1.The script gets its starting state from the "Notes" value stored in 
//localStorage or, if that is missing, creates an example state 
//that has only a shopping list in it.
//Reading a field that does not exist from localStorage will 
//yield null. Passing null to JSON.parse will make it parse the 
//string "null" and return null. Thus, the || operator can be 
//used to provide a default value in a situation like this.

setState(JSON.parse(localStorage.getItem("Notes")) || {
    notes: {"shopping list": "Carrots\nRaisins"},
    selected: "shopping list"
  });

//Event handlers call this function to move to a new state.
list.addEventListener("change", ()=>{
    setState({notes: state.notes, selected: list.value});
})

note.addEventListener("change", ()=>{
    setState({
//Object.assign here create a new object that is a clone of 
//the old state.notes, but with one property added or overwritten.
        notes: Object.assign({},state.notes,
            {[state.selected]:note.value}),
        selected:state.selected});
});

document.querySelector("button")
    .addEventListener("click", ()=>{
        let name = prompt("Note name");
        if (name) setState({
            notes: Object.assign({}, state.notes, {[name]: ""}),
            selected:name
        })
    })