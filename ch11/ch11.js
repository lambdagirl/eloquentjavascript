
//CALLBACKS
//One approach to asynchronous programming is to make 
//functions that perform a slow action take an extra argument, 
//a callback function. 
setTimeout(()=> console.log("Trick"),500);
//useful update an animation; check somthing is taking longer than given amount of time 

import {bogOak} from "./crow-tech";
bigOak.readStorage("food chches", caches => {
    let firstCache = catches[0];
    bigOak.readStorage(firstCache, info => {
        console.log(info);
    })
})
//one nest sends a message to another nest, 
//which then immediately sends a message back, 
//confirming receipt and possibly including a reply to a question asked in the message.

//Each message is tagged with a type, which determines how it is handled.
//The interface exported by the "./crow-tech" module provides callback-based functions for communication.
bigOak.send("Cow Pasture","note","Let's caw loudly at 7pm", ()=> console.log("Note delivered."))

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
    defineRequestType(name,(nest,con))
}