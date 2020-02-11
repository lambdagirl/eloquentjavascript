//Build a table 
// <table>
//   <tr>
//     <th>name</th>
//     <th>height</th>
//     <th>place</th>
//   </tr>
//   <tr>
//     <td>Kilimanjaro</td>
//     <td>5895</td>
//     <td>Tanzania</td>
//   </tr>
// </table>
// <h1>Mountains</h1>

// <div id="mountains"></div>

  const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];

  // Your code here
  function buildTable(data){
    let table = document.createElement("table");
    let keys = Object.keys(data[0])
    let headRow = document.createElement("tr")
    keys.forEach((key) =>{
        let headCell = document.createElement("th");
        headCell.appendChild(document.createTextNode(key));
        headRow.appendChild(headCell);
    })
    table.appendChild(headRow);

    data.forEach((object)=>{
    let bodyRow = document.createElement("tr");
    keys.forEach((key)=>{
        let cell = document.createElement("td");
        cell.appendChild(document.createTextNode(object[key]));
        if(typeof object[key] =="number"){
            cell.style.textAlign ="right";
        }
        bodyRow.appendChild(cell);
        })
    table.appendChild(row);
    });
    return table; 
}
document.querySelector("#mountains")
    .appendChild(buildTable(MOUNTAINS))


