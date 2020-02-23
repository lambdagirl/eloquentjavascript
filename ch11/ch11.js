
//CALLBACKS
//One approach to asynchronous programming is to make 
//functions that perform a slow action take an extra argument, 
//a callback function. 
setTimeout(()=> console.log("Trick"),500);
//useful update an animation; check somthing is taking longer than given amount of time 

import {bigOak} from "./crow-tech";
bigOak.readStorage("food chches", caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info => {
        console.log(info);
    })
})
//one nest sends a message to another nest, 
//which then immediately sends a message back, 
//confirming receipt and possibly including a reply to a question asked in the message.

//Each message is tagged with a type, which determines how it is handled.
//The interface exported by the "./crow-tech" module provides callback-based functions for communication.
bigOak.send("Cow Pasture",
            "note",
            "Let's caw loudly at 7pm", 
            ()=> console.log("Note delivered."))

import {defineRequestType} from "./crow-tech";
defineRequestType("note", (nest,content,source,done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
})

//Promise
// instead of arranging for a function to be called at some point in the future, 
//return an object that represents this future event.
let fifteen = Promises.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));

function storage(nest, name){
    //use Promise as a constructor:
    return new Promise(resolve => {
        nest.readStorage(name,result => resolve(result));
    });
}
storage(bigOak,"enemies")
    .then(value => console.log("Got", value));
//Instead of having to pass around callbacks, promise-based functions look similar to regular ones: 
//they take input as arguments and return their output. 
//The only difference is that the output may not be available yet.

//Failure
new Promise((_,reject) => reject(new Error("Fail")))
    .then(value => console.log("Handler 1"))
    .catch(reason => {
        console.log("Caught failure " + reason);
        return "nothing"
    })
    .then(value => console.log("Handler 2", value));

//NetWorks are hard
class Timeout extends Error {}

function request(nest,target,type,content){
    return new Promise((resolve,reject) => {
        let done = false;
        function attempt(n){
            nest.send(target,type, content,(failed,value) =>{
                done=true;
                if(failed)reject(failed);
                else resolve(value);
            });
            sentTimeout(()=>{
                if(done) return;
                else if(n<3) attempt(n+1);
                else reject(new Timeout("Time out"));
            }, 250);
        }
        attempt(1);
    })
}

function requestType(name, handler){
    defineRequestType(name,(nest,content, source, callback)=>{
        try{
            Promise.resolve(handler(nest,content,source))
                    .then(response => callback(null, response),
                            failure => callback(failure));
        } catch(exception){
            callback(exception);
        }
    })
}

//Collections of promises
requestType("ping", ()=>"pong")
function availableNeighbors(nest){
    let requests = nest.neighbor.map(neighbor => {
        
    return request(nest, neighbor,"ping")
    .then(()=>true, ()=>false);
    });
    return Promise.all(requests).then(result => {
        return nest.neighbor.filter((_,i)=> result[i]);
    })
}

//Network flooding
import {everywhere} from "./crow-tech";

//each nest keeps an array of gossip strings that it has already seen
everywhere(nest => {
    nest.state.gossip =[]
})

function sendGossip(nest, message,exceptFor = null){
    nest.state.gossip.push(message);
    for (let neighbor of nest.neighbors){
        if(neighbor == exceptFor) continue;
        request(nest,neighbor,"gossip", message);
    }
}
requestType("gossip",(nest,message,source) => {
    if( nest.state.gossip.include(message)) return;
    console.log(`${nest.name} received gossip '${message}' from ${source}`);
    sendGossip(nest,message,source);
})

//Message routing
requestType("connections", (nest,{name,neighbors},source)=>{
    let connections = nest.state.connections;
    if (JSON.stringify(connections.get(name)) == 
        JSON.stringify(neighbors)) return;
    connections.set(name,neighbors);
    broadcastConnections(nest,name,source);
});

function broadcastConnections(nest, name, exceptFor = null){
    for (let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue;
        request(nest, neighbors,"connections", {
            name,
            neighbors: nest.state.connections.get(name)
        });
    }
}
everywhere(nest => {
    nest.state.connections = new Map;
    nest.state.connections.set(nest.name, nest.neighbors);
    broadcastConnections(nest, nest.name)
})

//searches for a way to reach a given node in the network
function findRoute(from, to, connections){
    let work = [{at:from, via:null}];
    for (let i = 0; i<work.length; i++){
        let {at, via} = work[i];
        for (let next of connections.get(at) || []){
            if (next == to) return via;
            if (!work.some(w => w.at == next)){
                work.push({at:next, via:via||next});
            }
        }
    }
    return null;
}

routeRequest(bigOak, "Church Tower", "note","Incoming jackdaws!");

function routeRequest(nest,target,type,content){
    if (nest.nest.include(target)){
        return request(nest,target,type,content)
    } else {
        let via = findRoute(nest.name, target, nest.state.connections);
        if (!via) throw new Error(`No route to ${target}`);
        return request(nest, via,"route", {target,type,content});
    }
}
requestType("route", (nest,{target,type,content})=>{
    return routeRequest(nest, target, type,content);
})


//Async functions, storage
requestType("storage", (nest, name)=> storage(nest,name));

function findInStorage(nest, name){
    return storage(nest, name).then(found => {
        if (found !=null) return found;
        else return findInRemoteStorage(nest,name);
    });
}

function network(nest){
    return Array.from(nest.state.connections.keys());
}
function findInRemoteStorage(nest,name){
    let sources = network(nest).filter(n=> n!=nest.name);
    function next(){
        if (sources.length == 0){
            return Promise.reject(new Error("Math.random() * sources.length"))
        } else {
            let source = sources[Math.floor(Math.random()*sources.length)];
            sources = sources.filter(n=> n!=source);
            return routeRequest(nest, source,"storage", name)
                .then(value => value != null ? value : next())
        }
        
    }
    return next()
}

//async await

async function findInStorage(nest, name){
    let local = await storage(nest, name);
    if (local != null) return local;
    let sources = network(nest).filter(n => n!= nest.name);
    
    while (sources.length > 0){
        let source = sources[Math.floor(Math.random()* sources.length)];
        sources = sources.filter(n => n != source);
        try {
            let found = await routeRequest(nest,source,"storage", name);
            if (found != null) return found;
        } catch(_){}
    }
    throw new Error("Not found");
}

findInStorage(bigOak, "events on 2017-12-21").then(console.log);

//Generators
function* powers(n){
    for (let current = n;;current*=n){
        yield current;
    }
}
for (let power of powers(3)){
    if (power >50) break;
    console.log(power);
}

//The Event Loop
let start = Date.now();
setTimeout(()=>{
    console.log("Timeout ran at", Date.now() -start);
}, 20);
while (Date.now()< start +50){};
console.log("Wasted time until", Date.now()- start);
// → Wasted time until 50
// → Timeout ran at 55

Promise.resolve("Done").then(console.log);
console.log("Me first!");
// → Me first!
// → Done

//Asynchronous bugs/gaps
function anyStorage(nest,source,name){
    if(source == nest.name) return storage(nest, name);
    else return routeRequest(nest,source,"storage",name);
}
async function chicks(nest,years){
    let lines = network(nest).map(async name => {
        return name +": "+
            await anyStorage(nest,name, `chicks in ${years}`);
    });
    return (await Promise.all(lines)).join("\n")

}
chicks(bigOak, 2017).then(console.log);
