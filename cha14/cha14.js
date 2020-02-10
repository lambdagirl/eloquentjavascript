//Document structure-Document Object Model-documentElement
//Trees -In the case of the DOM, document.documentElement serves as the root.
//The Standard
//Moving through the tree
function talksAbout(node,string){
    if(node.nodeType == Node.ELEMENT_NODE){
        for (let i = 0; i < node.childNodes.length;i++){
            if (talksAbout(node.childNodes[i],string)){
                return true;
            }
        }
        return false;
    }else if (node.nodeType == Node.TEXT_NODE){
        return node.nodeValue.indexOf(string) > -1
    }
}
console.log(talksAbout(document.body,"book"))


//Finding elements

//getElementsByTagName
let link = document.body.getElementsByTagName("a")[0];
console.log(link.href);
//getElementById
//getElementsByClassName

//Changing the document
//insertBefore && replaceChild
//appendChild
let paragraphs = document.body.getElementsByTagName("p");
document.body.insertBefore(paragraphs[2],paragraphs[0])

//Creating nodes
//replace all images<img> with the text held in their alt attrbutes.

function replaceImages(){
    let images = document.body.getElementsByTagName("img");
    for (let i =image.length-1;i >=0;i--){
        let image = images[i];
        if (image.alt){
            let text = document.createTextNode(img.alt);
            image.parentNode.replaceChild(text,image);
        }
    }
}

//array .from => solid collection of nodes,
let arrayish = {0:"one",1:"two",length:2};
let array = Array.from(arrayish);
console.log(array.map(s => s.toUpperCase()));

//a function used to add an attribution to a quote:
//creates an element node and treates the rest of it's 
//arguments as children to that node.

// <blockquote id="quote">
//   No book can ever be finished. While working on it we learn
//   just enough to find it immature the moment we turn away
//   from it.
// </blockquote>
// <blockquote id="quote">
//   haha
// </blockquote>

function elt(type, ...children){
    let node = document.createElement(type);
    for (let child of children){
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}
document.getElementsById("quote").appendChild(
    elt("footer","-",
        elt("strong","Karl Popprt"),
        ", preface to the second edition of ",
        elt("em", "The Open Society and Its Enemies"),
        ", 1950"))


//Attributes
//<p data-classified="secret">The launch code is 00000000.</p>
//<p data-classified="unclassified">I have two feet.</p>

let paras = document.body.getElementsByTagName("p");
for (let para of Array.from(paras)){
    if (para.getAttribute("data-classified") == "secret"){
        para.remove();
    }
}

//Layout
// <p style="border: 3px solid red">
//   I'm boxed in
// </p>
let para = document.body.getElementsByTagName("o")[0];
console.log("clientHeight:", para.clientHeight);
console.log("offsetHeight:", para.offsetHeight);

// <p><span id="one"></span></p>
// <p><span id="two"></span></p>

  function time(name, action) {
    let start = Date.now(); // Current time in milliseconds
    action();
    console.log(name, "took", Date.now() - start, "ms");
  }

  time("naive", () => {
    let target = document.getElementById("one");
    while (target.offsetWidth < 2000) {
      target.appendChild(document.createTextNode("X"));
    }
  });
  // → naive took 32 ms

  time("clever", function() {
    let target = document.getElementById("two");
    target.appendChild(document.createTextNode("XXXXX"));
    let total = Math.ceil(2000 / (target.offsetWidth / 5));
    target.firstChild.nodeValue = "X".repeat(total);
  }); 
    // → clever took 1 ms

//Styling 
// <p><a href=".">Normal link</a></p>
// <p><a href="." style="color: green">Normal link</a></p>

// //This text is displayed <strong>inline</strong>,
// <strong style="display: block">as a block</strong>, and
// <strong style="display: none">not at all</strong>.

// <p id="para" style="color: purple">
//   Nice text
// </p>
let para = document.getElementsById("para");
console.log(para.style.color);
para.style.color ="red";
//"font-family" => style.fontFamily

/* p elements with id main and with classes a and b */
// p#main.a.b {
//     margin-bottom: 20px;
//   }

//Query selectors

//<p>And if you go chasing
// <span class="animal">rabbits</span></p>
// <p>And you know you're going to fall</p>
// <p>Tell 'em a <span class="character">hookah smoking
//   <span class="animal">caterpillar</span></span></p>
// <p>Has given you the call</p>

function count(selector){
    return document.querySelectorAll(selector).length;
}
console.log(count("p")); 
console.log(count(".animal")); //Class animal 
console.log(count("p .animal")); //animal inside of <p>
console.log(count("p > .animal")); // Direct child of <p>

//Positioning and animating

//<p style="text-align: center">
// <img src="img/cat.png" style="position: relative">
// </p>
let cat = document.querySelector("img");
let angle = Math.PI/2;
function animate(time, lastTime){
    if(lastTime != null){
        angle +=(time - lastTime)* 0.001;
    }
    
    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    requestAnimationFrame(newTime => animate(newTime, time));
}
requestAnimationFrame(animate);