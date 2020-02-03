//A Vector Type
class Vec{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    plus(vector){
        return new Vec(
            this.x + vector.x,
            this.y + vector.y
        )
    }
    minus(vector){
        return new Vec(
            this.x - vector.x,
            this.y -vector.y
        )
    }
    get length() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);


//Groups
class Group {
    // Your code here.
    constructor(){
        this.members =[]
    }
    add(value){
        if(!this.has(value)){
            this.members.push(value);
        }
    }
    delete(value){
        this.members = this.members.filter( v=> v!==value);
    }
    has(value){
        return this.members.includes(value);
    }

    static from(a){
        let group = new Group;
        for (let value of a){
            group.add(value);
        }
        return group
    }

  }
  
  
  let group = Group.from([10, 20]);
  console.log(group.has(10));
  // → true
  console.log(group.has(30));
  // → false
  group.add(10);
  group.delete(10);
  console.log(group.has(10));
  // → false

  //Iterable Groups
Group.prototype[Symbol.iterator] = function(){
    return new GroupIterator(this);
}

class GroupIterator{
    constructor(group){
        this.group=group;
        this.position=0;
    }

    next(){
        if(this.position>=this.group.members.length){
            return {done: true}
        }else{
            let result = {value:this.group.members[this.position], done: false};
            this.position++;
            return result;
        }
       
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c