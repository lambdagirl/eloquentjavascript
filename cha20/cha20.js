//The file system module
let {readFile} = require("fs");

readFile("file.txt","utf8",(error,text) => {
    if (error) throw error;
    console.log("The file contains:",text);
})

readFile("file.txt",(error,buffer) => {
    if (error) throw error;
    console.log("The file contained", buffer.length, "bytes.", 
                "The first byte is:", buffer[0]);
})

const {writeFile} = require("fs");
writeFile("graffiti.txt", "Node was here", err => {
    if (err) console.log(`Fail to write file: ${err}`);
    else console.log(`File written.`)
})

//The HTTP Module
// const {createServer} = require("http");

// let server = createServer((request, response) => {
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(`
//     <h1>Hello!</h1>
//     <p>You asked for <code>${request.url}</code></p>
//     `);
//    response.end()
// });
// server.listen(8000);
// console.log("Listening! (port 8000)");

//act as an HTTP cllient, use request function;
// const {request} = require("http");
// let requestStream = request({
//     hostname: "eloquentjavascript.net",
//     path: "/20_node.html",
//     method: "GET",
//     headers: {Accept: "text/html"}
// }, response => {
//     console.log("Server responsed with status code", response.statusCode);
// })
// requestStream.end();


//Streams;
//Reading from a stream is done using event handlers, rather than methods.
//Readable streams have "data" and "end" events.

const {createServer} = require("http");
createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  request.on("data", chunk =>
    response.write(chunk.toString().toUpperCase()));
  request.on("end", () => response.end());
}).listen(8000);

const {request} = require("http");
request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, response => {
  response.on("data", chunk =>
    process.stdout.write(chunk.toString()));
}).end("Hello serveffffr");