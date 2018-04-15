'use strict';

// Chapter 1 code

//1.1
function identify() {
	return this.name.toUpperCase();
}

function speak() {
	let greeting = "Hello, I'm " + identify.call(this);
	console.log(greeting);
}

let me = {
	name: "Kyle"
};

let you = {
	name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER

// 1.2 
function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  let greeting = "Hello, I'm " + identify(context);
  console.log(greeting);
}

identify(you); // READER
speak(me); // Hello, I'm KYLE

// 1.3
function foo(num) {
  console.log("foo: " + num);

  // keep track of how many times `foo` is called
  this.count++;
}

foo.count = 0;

let i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log(foo.count); // 0 -- WTF?

// 1.4
function foo(num) {
  console.log("foo: " + num);

  // keep track of how many times `foo` is called
  data.count++;
}

var data = {
  count: 0
};

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log(data.count); // 4

// 1.5
function foo() {
  foo.count = 4; // `foo` refers to itself
}

setTimeout(function() {
  // anonymous function (no name), cannot
  // refer to itself
}, 10);

// 1.6
function foo(num) {
  console.log("foo: " + num);

  // keep track of how many times `foo` is called
  foo.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log(foo.count); // 4

// 1.7
function foo(num) {
  console.log("foo: " + num);

  // keep track of how many times `foo` is called
  // Note: `this` IS actually `foo` now, based on
  // how `foo` is called (see below)
  this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    // using `call(..)`, we ensure the `this`
    // points at the function object (`foo`) itself
    foo.call(foo, i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log(foo.count); // 4

// 1.8
function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log(this.a);
}

foo(); //undefined

// Chapter 2

// 2.1
function baz() {
  // call-stack is: `baz`
  // so, our call-site is in the global scope

  console.log("baz");
  bar(); // <-- call-site for `bar`
}

function bar() {
  // call-stack is: `baz` -> `bar`
  // so, our call-site is in `baz`

  console.log("bar");
  foo(); // <-- call-site for `foo`
}

function foo() {
  // call-stack is: `baz` -> `bar` -> `foo`
  // so, our call-site is in `bar`

  console.log("foo");
}

baz(); // <-- call-site for `baz`

// 2.2
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 2

// 2.3
function foo() {
  "use strict";

  console.log(this.a);
}

var a = 2;

foo(); // TypeError: `this` is `undefined`

// 2.4
function foo() {
  console.log(this.a);
}

var a = 2;

(function() {
  "use strict";

  foo(); // 2
})();

// 2.5
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

obj.foo(); // 2

// 2.6
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo
};

var obj1 = {
  a: 2,
  obj2: obj2
};

obj1.obj2.foo(); // 42

// 2.7
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"

// 2.8

function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // `fn` is just another reference to `foo`

  fn(); // <-- call-site!
}

var obj = {
  a: 2,
  foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo(obj.foo); // "oops, global"

// 2.9
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

var a = "oops, global"; // `a` also property on global object

setTimeout(obj.foo, 100); // "oops, global"

// 2.10
function setTimeout(fn, delay) {
  // wait (somehow) for `delay` milliseconds
  fn(); // <-- call-site!
}

// 2.11
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
};

foo.call(obj); // 2

// 2.12
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
};

var bar = function() {
foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call(window); // 2

// 2.13
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = function() {
  return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5

// 2.14
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}

var obj = {
  a: 2
};

var bar = bind(foo, obj);

var b = bar(3); // 2 3
console.log(b); // 5

// 2.15
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5

// 2.16
function foo(el) {
  console.log(el, this.id);
}

var obj = {
  id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach(foo, obj); // 1 awesome  2 awesome  3 awesome

// 2.17
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2

// 2.18
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo
};

var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2

// 2.19
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4

// 2.20
function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3

// 2.21
function bind(fn, obj) {
  return function() {
    fn.apply(obj, arguments);
  };
}

// 2.22
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what " +
        "is trying to be bound is not callable"
      );
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() { },
      fBound = function() {
        return fToBind.apply(
          (
            this instanceof fNOP &&
              oThis ? this : oThis
          ),
          aArgs.concat(Array.prototype.slice.call(arguments))
        );
      }
      ;

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

// 2.23
this instanceof fNOP &&
  oThis ? this : oThis

// ... and:

fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();

// 2.24
function foo(p1, p2) {
  this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind(null, "p1");

var baz = new bar("p2");

baz.val; // p1p2

// 2.25
function foo() {
  console.log(this.a);
}

var a = 2;

foo.call(null); // 2

// 2.26
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// spreading out array as parameters
foo.apply(null, [2, 3]); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind(null, 2);
bar(3); // a:2, b:3

// 2.27
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// our DMZ empty object
var ø = Object.create(null);

// spreading out array as parameters
foo.apply(ø, [2, 3]); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind(ø, 2);
bar(3); // a:2, b:3

// 2.28
function foo() {
  console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2

// 2.29
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this,
      curried = [].slice.call(arguments, 1),
      bound = function bound() {
        return fn.apply(
          (!this ||
            (typeof window !== "undefined" &&
              this === window) ||
            (typeof global !== "undefined" &&
              this === global)
          ) ? obj : this,
          curried.concat.apply(curried, arguments)
        );
      };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  };
}

// 2.30
function foo() {
  console.log("name: " + this.name);
}

var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };

var fooOBJ = foo.softBind(obj);

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call(obj3); // name: obj3   <---- look!

setTimeout(obj2.foo, 10); // name: obj   <---- falls back to soft-binding

// 2.31
function foo() {
  // return an arrow function
  return (a) => {
    // `this` here is lexically adopted from `foo()`
    console.log(this.a);
  };
}

var obj1 = {
  a: 2
};

var obj2 = {
  a: 3
};

var bar = foo.call(obj1);
bar.call(obj2); // 2, not 3!

// 2.32
function foo() {
  setTimeout(() => {
    // `this` here is lexically adopted from `foo()`
    console.log(this.a);
  }, 100);
}

var obj = {
  a: 2
};

foo.call(obj); // 2

// 2.33
function foo() {
  var self = this; // lexical capture of `this`
  setTimeout(function() {
    console.log(self.a);
  }, 100);
}

var obj = {
  a: 2
};

foo.call(obj); // 2

// Chapter 3

// 3.1
var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String("I am a string");
typeof strObject; 								// "object"
strObject instanceof String;					// true

// inspect the object sub-type
Object.prototype.toString.call(strObject);	// [object String]

// 3.2
var strPrimitive = "I am a string";

console.log(strPrimitive.length);			// 13

console.log(strPrimitive.charAt(3));	// "m"

// 3.3
var myObject = {
  a: 2
};

myObject.a;		// 2

myObject["a"];	// 2

// 3.4
var wantA = true;
var myObject = {
  a: 2
};

var idx;

if (wantA) {
  idx = "a";
}

// later

console.log(myObject[idx]); // 2

// 3.5
var myObject = {};

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];				// "foo"
myObject["3"];					// "bar"
myObject["[object Object]"];	// "baz"

// 3.6
var prefix = "foo";

var myObject = {
  [prefix + "bar"]: "hello",
  [prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world

// 3.7
var myObject = {
  [Symbol.Something]: "hello world"
};

// 3.8
function foo() {
  console.log("foo");
}

var someFoo = foo;	// variable reference to `foo`

var myObject = {
  someFoo: foo
};

foo;				// function foo(){..}

someFoo;			// function foo(){..}

myObject.someFoo;	// function foo(){..}

// 3.9
var myObject = {
  foo: function foo() {
    console.log("foo");
  }
};

var someFoo = myObject.foo;

someFoo;		// function foo(){..}

myObject.foo;	// function foo(){..}

// 3.10
var myArray = ["foo", 42, "bar"];

myArray.length;		// 3

myArray[0];			// "foo"

myArray[2];			// "bar"

// 3.11
var myArray = ["foo", 42, "bar"];

myArray.baz = "baz";

myArray.length;	// 3

myArray.baz;	// "baz"

// 3.12
var myArray = ["foo", 42, "bar"];

myArray["3"] = "baz";

myArray.length;	// 4

myArray[3];		// "baz"

// 3.13
function anotherFunction() { /*..*/ }

var anotherObject = {
  c: true
};

var anotherArray = [];

var myObject = {
  a: 2,
  b: anotherObject,	// reference, not a copy!
  c: anotherArray,	// another reference!
  d: anotherFunction
};

anotherArray.push(anotherObject, myObject);

// 3.14
var newObj = Object.assign({}, myObject);

newObj.a;						// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true

// 3.15
var myObject = {
  a: 2
};

Object.getOwnPropertyDescriptor(myObject, "a");
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }

// 3.16
var myObject = {};

Object.defineProperty(myObject, "a", {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true
});

myObject.a; // 2

// 3.17
var myObject = {};

Object.defineProperty(myObject, "a", {
  value: 2,
  writable: false, // not writable!
  configurable: true,
  enumerable: true
});

myObject.a = 3;

myObject.a; // 2

// 3.18
var myObject = {};

Object.defineProperty(myObject, "a", {
  value: 2,
  writable: false, // not writable!
  configurable: true,
  enumerable: true
});

myObject.a = 3; // TypeError

// 3.19
var myObject = {
  a: 2
};

myObject.a = 3;
myObject.a;					// 3

Object.defineProperty(myObject, "a", {
  value: 4,
  writable: true,
  configurable: false,	// not configurable!
  enumerable: true
});

myObject.a;					// 4
myObject.a = 5;
myObject.a;					// 5

Object.defineProperty(myObject, "a", {
  value: 6,
  writable: true,
  configurable: true,
  enumerable: true
}); // TypeError

// 3.20
var myObject = {
  a: 2
};

myObject.a;				// 2
delete myObject.a;
myObject.a;				// undefined

Object.defineProperty(myObject, "a", {
  value: 2,
  writable: true,
  configurable: false,
  enumerable: true
});

myObject.a;				// 2
delete myObject.a;
myObject.a;				// 2

// 3.21
myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push(4);
myImmutableObject.foo; // [1,2,3,4]

// 3.22
var myObject = {};

Object.defineProperty(myObject, "FAVORITE_NUMBER", {
  value: 42,
  writable: false,
  configurable: false
});

// 3.23
var myObject = {
  a: 2
};

Object.preventExtensions(myObject);

myObject.b = 3;
myObject.b; // undefined

// 3.24
var myObject = {
  // define a getter for `a`
  get a() {
    return 2;
  }
};

Object.defineProperty(
  myObject,	// target
  "b",		// property name
  {			// descriptor
    // define a getter for `b`
    get: function() { return this.a * 2 },

    // make sure `b` shows up as an object property
    enumerable: true
  }
);

myObject.a; // 2

myObject.b; // 4

// 3.25
var myObject = {
  // define a getter for `a`
  get a() {
    return 2;
  }
};

myObject.a = 3;

myObject.a; // 2

// 3.26
var myObject = {
  // define a getter for `a`
  get a() {
    return this._a_;
  },

  // define a setter for `a`
  set a(val) {
    this._a_ = val * 2;
  }
};

myObject.a = 2;

myObject.a; // 4

// 3.27
var myObject = {
  a: 2
};

("a" in myObject);				// true
("b" in myObject);				// false

myObject.hasOwnProperty("a");	// true
myObject.hasOwnProperty("b");	// false

// 3.28
var myObject = {};

Object.defineProperty(
  myObject,
  "a",
  // make `a` enumerable, as normal
  { enumerable: true, value: 2 }
);

Object.defineProperty(
  myObject,
  "b",
  // make `b` NON-enumerable
  { enumerable: false, value: 3 }
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty("b"); // true

// .......

for (var k in myObject) {
  console.log(k, myObject[k]);
}
// "a" 2

// 3.29
var myObject = {};

Object.defineProperty(
  myObject,
  "a",
  // make `a` enumerable, as normal
  { enumerable: true, value: 2 }
);

Object.defineProperty(
  myObject,
  "b",
  // make `b` non-enumerable
  { enumerable: false, value: 3 }
);

myObject.propertyIsEnumerable("a"); // true
myObject.propertyIsEnumerable("b"); // false

Object.keys(myObject); // ["a"]
Object.getOwnPropertyNames(myObject); // ["a", "b"]

// 3.30
var myArray = [1, 2, 3];

for (var i = 0; i < myArray.length; i++) {
  console.log(myArray[i]);
}
// 1 2 3

// 3.31
var myArray = [1, 2, 3];

for (var v of myArray) {
  console.log(v);
}
// 1
// 2
// 3

// 3.32
var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]();

it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }

// 3.33
var myObject = {
  a: 2,
  b: 3
};

Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function() {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        };
      }
    };
  }
});

// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
  console.log(v);
}
// 2
// 3

// 3.34
var randoms = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return { value: Math.random() };
      }
    };
  }
};

var randoms_pool = [];
for (var n of randoms) {
  randoms_pool.push(n);

  // don't proceed unbounded!
  if (randoms_pool.length === 100) break;
}

// Chapter 4
// 4.1
class CoolGuy {
  specialTrick = nothing

  CoolGuy(trick) {
    specialTrick = trick
  }

  showOff() {
    output("Here's my trick: ", specialTrick)
  }
}

// 4.2
Joe = new CoolGuy("jumping rope")

Joe.showOff() // Here's my trick: jumping rope

// 4.3
class Vehicle {
  engines = 1

  ignition() {
    output("Turning on my engine.")
  }

  drive() {
    ignition()
    output("Steering and moving forward!")
  }
}

class Car inherits Vehicle {
  wheels = 4

  drive() {
    inherited: drive()
    output("Rolling on all ", wheels, " wheels!")
  }
}

class SpeedBoat inherits Vehicle {
  engines = 2

  ignition() {
    output("Turning on my ", engines, " engines.")
  }
  pilot() {
    inherited: drive()
    output("Speeding through the water with ease!")
  }
}

// 4.4
// vastly simplified `mixin(..)` example:
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    // only copy if not already present
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }

  return targetObj;
}

var Vehicle = {
  engines: 1,

  ignition: function() {
    console.log("Turning on my engine.");
  },

  drive: function() {
    this.ignition();
    console.log("Steering and moving forward!");
  }
};

var Car = mixin(Vehicle, {
  wheels: 4,

  drive: function() {
    Vehicle.drive.call(this);
    console.log("Rolling on all " + this.wheels + " wheels!");
  }
});

// 4.5
// vastly simplified `mixin()` example:
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    // only copy if not already present
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }

  return targetObj;
}

// 4.6
// alternate mixin, less "safe" to overwrites
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    targetObj[key] = sourceObj[key];
  }

  return targetObj;
}

var Vehicle = {
  // ...
};

// first, create an empty object with
// Vehicle's stuff copied in
var Car = mixin(Vehicle, {});

// now copy the intended contents into Car
mixin({
  wheels: 4,

  drive: function() {
    // ...
  }
}, Car);

// 4.7
// "Traditional JS Class" `Vehicle`
function Vehicle() {
  this.engines = 1;
}
Vehicle.prototype.ignition = function() {
  console.log("Turning on my engine.");
};
Vehicle.prototype.drive = function() {
  this.ignition();
  console.log("Steering and moving forward!");
};

// "Parasitic Class" `Car`
function Car() {
  // first, `car` is a `Vehicle`
  var car = new Vehicle();

  // now, let's modify our `car` to specialize it
  car.wheels = 4;

  // save a privileged reference to `Vehicle::drive()`
  var vehDrive = car.drive;

  // override `Vehicle::drive()`
  car.drive = function() {
    vehDrive.call(this);
    console.log("Rolling on all " + this.wheels + " wheels!");
  };

  return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!

// 4.8
var Something = {
  cool: function() {
    this.greeting = "Hello World";
    this.count = this.count ? this.count + 1 : 1;
  }
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
  cool: function() {
    // implicit mixin of `Something` to `Another`
    Something.cool.call(this);
  }
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with `Something`)

// Chapter 5
// 5.1
var anotherObject = {
  a: 2
};

// create an object linked to `anotherObject`
var myObject = Object.create(anotherObject);

for (var k in myObject) {
  console.log("found: " + k);
}
// found: a

("a" in myObject); // true

// 5.2
var anotherObject = {
  a: 2
};

var myObject = Object.create(anotherObject);

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("a"); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty("a"); // true

// 5.3
function Foo() {
  // ...
}

Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true

// 5.4
function NothingSpecial() {
  console.log("Don't mind me!");
}

var a = new NothingSpecial();
// "Don't mind me!"

a; // {}

// 5.5
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

var a = new Foo("a");
var b = new Foo("b");

a.myName(); // "a"
b.myName(); // "b"

// 5.6
function Foo() { /* .. */ }

Foo.prototype = { /* .. */ }; // create a new prototype object

var a1 = new Foo();
a1.constructor === Foo; // false!
a1.constructor === Object; // true!

// 5.7
function Foo() { /* .. */ }

Foo.prototype = { /* .. */ }; // create a new prototype object

// Need to properly "fix" the missing `.constructor`
// property on the new object serving as `Foo.prototype`.
// See Chapter 3 for `defineProperty(..)`.
Object.defineProperty(Foo.prototype, "constructor", {
  enumerable: false,
  writable: true,
  configurable: true,
  value: Foo    // point `.constructor` at `Foo`
});

// 5.8
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

// here, we make a new `Bar.prototype`
// linked to `Foo.prototype`
Bar.prototype = Object.create(Foo.prototype);

// Beware! Now `Bar.prototype.constructor` is gone,
// and might need to be manually "fixed" if you're
// in the habit of relying on such properties!

Bar.prototype.myLabel = function() {
  return this.label;
};

var a = new Bar("a", "obj a");

a.myName(); // "a"
a.myLabel(); // "obj a"

// 5.9
// doesn't work like you want!
Bar.prototype = Foo.prototype;

// works kinda like you want, but with
// side-effects you probably don't want :(
Bar.prototype = new Foo();

// 5.10
// pre-ES6
// throws away default existing `Bar.prototype`
Bar.prototype = Object.create(Foo.prototype);

// ES6+
// modifies existing `Bar.prototype`
Object.setPrototypeOf(Bar.prototype, Foo.prototype);

// 5.11
// helper utility to see if `o1` is
// related to (delegates to) `o2`
function isRelatedTo(o1, o2) {
  function F() { }
  F.prototype = o2;
  return o1 instanceof F;
}

var a = {};
var b = Object.create(a);

isRelatedTo(b, a); // true

// 5.12
Object.defineProperty(Object.prototype, "__proto__", {
  get: function() {
    return Object.getPrototypeOf(this);
  },
  set: function (o) {
    // setPrototypeOf(..) as of ES6
    Object.setPrototypeOf(this, o);
    return o;
  }
});

// 5.13
var foo = {
  something: function() {
    console.log("Tell me something good...");
  }
};

var bar = Object.create(foo);

bar.something(); // Tell me something good...

// 5.14
if (!Object.create) {
  Object.create = function (o) {
    function F() { }
    F.prototype = o;
    return new F();
  };
}

// 5.15
var anotherObject = {
  a: 2
};

var myObject = Object.create(anotherObject, {
  b: {
    enumerable: false,
    writable: true,
    configurable: false,
    value: 3
  },
  c: {
    enumerable: true,
    writable: false,
    configurable: false,
    value: 4
  }
});

myObject.hasOwnProperty("a"); // false
myObject.hasOwnProperty("b"); // true
myObject.hasOwnProperty("c"); // true

myObject.a; // 2
myObject.b; // 3
myObject.c; // 4

// 5.16
function createAndLinkObject(o) {
  function F() { }
  F.prototype = o;
  return new F();
}

var anotherObject = {
  a: 2
};

var myObject = createAndLinkObject(anotherObject);

myObject.a; // 2

// 5.17
var anotherObject = {
  cool: function() {
    console.log("cool!");
  }
};

var myObject = Object.create(anotherObject);

myObject.cool(); // "cool!"

// 5.18
var anotherObject = {
  cool: function() {
    console.log("cool!");
  }
};

var myObject = Object.create(anotherObject);

myObject.doCool = function() {
  this.cool(); // internal delegation!
};

myObject.doCool(); // "cool!"

// Chapter 6
// 6.1
class Task {
  id;

  // constructor `Task()`
  Task(ID) { id = ID; }
  outputTask() { output(id); }
}

class XYZ inherits Task {
  label;

  // constructor `XYZ()`
  XYZ(ID, Label) { super(ID); label = Label; }
  outputTask() { super(); output(label); }
}

class ABC inherits Task {
  // ...
}

// 6.2
var Task = {
  setID: function (ID) { this.id = ID; },
  outputID: function() { console.log(this.id); }
};

// make `XYZ` delegate to `Task`
var XYZ = Object.create(Task);

XYZ.prepareTask = function (ID, Label) {
  this.setID(ID);
  this.label = Label;
};

XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log(this.label);
};

// ABC = Object.create( Task );
// ABC ... = ...

// 6.3
function Foo() { }

var a1 = new Foo();

a1; // Foo {}

// 6.4
function Foo() { }

var a1 = new Foo();

a1.constructor; // Foo(){}
a1.constructor.name; // "Foo"

// 6.5
function Foo() { }

var a1 = new Foo();

Foo.prototype.constructor = function Gotcha() { };

a1.constructor; // Gotcha(){}
a1.constructor.name; // "Gotcha"

a1; // Foo {}

// 6.6
var Foo = {};

var a1 = Object.create(Foo);

a1; // Object {}

Object.defineProperty(Foo, "constructor", {
  enumerable: false,
  value: function Gotcha() { }
});

a1; // Gotcha {}

// 6.7
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am " + this.me;
};

function Bar(who) {
  Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function() {
  alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();

// 6.8
var Foo = {
  init: function (who) {
    this.me = who;
  },
  identify: function() {
    return "I am " + this.me;
  }
};

var Bar = Object.create(Foo);

Bar.speak = function() {
  alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");

b1.speak();
b2.speak();

// 6.9
// Parent class
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$elem = null;
}

Widget.prototype.render = function ($where) {
  if (this.$elem) {
    this.$elem.css({
      width: this.width + "px",
      height: this.height + "px"
    }).appendTo($where);
  }
};

// Child class
function Button(width, height, label) {
  // "super" constructor call
  Widget.call(this, width, height);
  this.label = label || "Default";

  this.$elem = $("<button>").text(this.label);
}

// make `Button` "inherit" from `Widget`
Button.prototype = Object.create(Widget.prototype);

// override base "inherited" `render(..)`
Button.prototype.render = function ($where) {
  // "super" call
  Widget.prototype.render.call(this, $where);
  this.$elem.click(this.onClick.bind(this));
};

Button.prototype.onClick = function (evt) {
  console.log("Button '" + this.label + "' clicked!");
};

$(document).ready(function() {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, "Hello");
  var btn2 = new Button(150, 40, "World");

  btn1.render($body);
  btn2.render($body);
});

// 6.10
class Widget {
  constructor(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  }
  render($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
}

class Button extends Widget {
  constructor(width, height, label) {
    super(width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
  }
  render($where) {
    super.render($where);
    this.$elem.click(this.onClick.bind(this));
  }
  onClick(evt) {
    console.log("Button '" + this.label + "' clicked!");
  }
}

$(document).ready(function() {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, "Hello");
  var btn2 = new Button(150, 40, "World");

  btn1.render($body);
  btn2.render($body);
});

// 6.11
var Widget = {
  init: function (width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  },
  insert: function ($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
};

var Button = Object.create(Widget);

Button.setup = function (width, height, label) {
  // delegated call
  this.init(width, height);
  this.label = label || "Default";

  this.$elem = $("<button>").text(this.label);
};
Button.build = function ($where) {
  // delegated call
  this.insert($where);
  this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function (evt) {
  console.log("Button '" + this.label + "' clicked!");
};

$(document).ready(function() {
  var $body = $(document.body);

  var btn1 = Object.create(Button);
  btn1.setup(125, 30, "Hello");

  var btn2 = Object.create(Button);
  btn2.setup(150, 40, "World");

  btn1.build($body);
  btn2.build($body);
});

// 6.12
// Parent class
function Controller() {
  this.errors = [];
}
Controller.prototype.showDialog = function (title, msg) {
  // display title & message to user in dialog
};
Controller.prototype.success = function (msg) {
  this.showDialog("Success", msg);
};
Controller.prototype.failure = function (err) {
  this.errors.push(err);
  this.showDialog("Error", err);
};

// Child class
function LoginController() {
  Controller.call(this);
}
// Link child class to parent
LoginController.prototype = Object.create(Controller.prototype);
LoginController.prototype.getUser = function() {
  return document.getElementById("login_username").value;
};
LoginController.prototype.getPassword = function() {
  return document.getElementById("login_password").value;
};
LoginController.prototype.validateEntry = function (user, pw) {
  user = user || this.getUser();
  pw = pw || this.getPassword();

  if (!(user && pw)) {
    return this.failure("Please enter a username & password!");
  }
  else if (pw.length < 5) {
    return this.failure("Password must be 5+ characters!");
  }

  // got here? validated!
  return true;
};
// Override to extend base `failure()`
LoginController.prototype.failure = function (err) {
  // "super" call
  Controller.prototype.failure.call(this, "Login invalid: " + err);
};

// Child class
function AuthController(login) {
  Controller.call(this);
  // in addition to inheritance, we also need composition
  this.login = login;
}
// Link child class to parent
AuthController.prototype = Object.create(Controller.prototype);
AuthController.prototype.server = function (url, data) {
  return $.ajax({
    url: url,
    data: data
  });
};
AuthController.prototype.checkAuth = function() {
  var user = this.login.getUser();
  var pw = this.login.getPassword();

  if (this.login.validateEntry(user, pw)) {
    this.server("/check-auth", {
      user: user,
      pw: pw
    })
      .then(this.success.bind(this))
      .fail(this.failure.bind(this));
  }
};
// Override to extend base `success()`
AuthController.prototype.success = function() {
  // "super" call
  Controller.prototype.success.call(this, "Authenticated!");
};
// Override to extend base `failure()`
AuthController.prototype.failure = function (err) {
  // "super" call
  Controller.prototype.failure.call(this, "Auth Failed: " + err);
};

var auth = new AuthController(
  // in addition to inheritance, we also need composition
  new LoginController()
);
auth.checkAuth();

// 6.13
var LoginController = {
  errors: [],
  getUser: function() {
    return document.getElementById("login_username").value;
  },
  getPassword: function() {
    return document.getElementById("login_password").value;
  },
  validateEntry: function (user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();

    if (!(user && pw)) {
      return this.failure("Please enter a username & password!");
    }
    else if (pw.length < 5) {
      return this.failure("Password must be 5+ characters!");
    }

    // got here? validated!
    return true;
  },
  showDialog: function (title, msg) {
    // display success message to user in dialog
  },
  failure: function (err) {
    this.errors.push(err);
    this.showDialog("Error", "Login invalid: " + err);
  }
};

// Link `AuthController` to delegate to `LoginController`
var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function() {
  var user = this.getUser();
  var pw = this.getPassword();

  if (this.validateEntry(user, pw)) {
    this.server("/check-auth", {
      user: user,
      pw: pw
    })
      .then(this.accepted.bind(this))
      .fail(this.rejected.bind(this));
  }
};
AuthController.server = function (url, data) {
  return $.ajax({
    url: url,
    data: data
  });
};
AuthController.accepted = function() {
  this.showDialog("Success", "Authenticated!")
};
AuthController.rejected = function (err) {
  this.failure("Auth Failed: " + err);
};

// 6.15
var LoginController = {
  errors: [],
  getUser() { // Look ma, no `function`!
    // ...
  },
  getPassword() {
    // ...
  }
  // ...
};

// 6.16
// use nicer object literal syntax w/ concise methods!
var AuthController = {
  errors: [],
  checkAuth() {
    // ...
  },
  server(url, data) {
    // ...
  }
  // ...
};

// NOW, link `AuthController` to delegate to `LoginController`
Object.setPrototypeOf(AuthController, LoginController);

// 6.17
var Foo = {
  bar() { /*..*/ },
  baz: function baz() { /*..*/ }
};

// 6.18
var Foo = {
  bar: function (x) {
    if (x < 10) {
      return Foo.bar(x * 2);
    }
    return x;
  },
  baz: function baz(x) {
    if (x < 10) {
      return baz(x * 2);
    }
    return x;
  }
};

// 6.19
function Foo() {
  // ...
}
Foo.prototype.something = function() {
  // ...
}

var a1 = new Foo();

// later

if (a1 instanceof Foo) {
  a1.something();
}

// 6.20
function Foo() { /* .. */ }
Foo.prototype...

function Bar() { /* .. */ }
Bar.prototype = Object.create(Foo.prototype);

var b1 = new Bar("b1");

// 6.21
// relating `Foo` and `Bar` to each other
Bar.prototype instanceof Foo; // true
Object.getPrototypeOf(Bar.prototype) === Foo.prototype; // true
Foo.prototype.isPrototypeOf(Bar.prototype); // true

// relating `b1` to both `Foo` and `Bar`
b1 instanceof Foo; // true
b1 instanceof Bar; // true
Object.getPrototypeOf(b1) === Bar.prototype; // true
Foo.prototype.isPrototypeOf(b1); // true
Bar.prototype.isPrototypeOf(b1); // true

// 6.22
// relating `Foo` and `Bar` to each other
Foo.isPrototypeOf(Bar); // true
Object.getPrototypeOf(Bar) === Foo; // true

// relating `b1` to both `Foo` and `Bar`
Foo.isPrototypeOf(b1); // true
Bar.isPrototypeOf(b1); // true
Object.getPrototypeOf(b1) === Bar; // true

// Appendix A: ES6
// 1.1
class Widget {
  constructor(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  }
  render($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
}

class Button extends Widget {
  constructor(width, height, label) {
    super(width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
  }
  render($where) {
    super.render($where);
    this.$elem.click(this.onClick.bind(this));
  }
  onClick(evt) {
    console.log("Button '" + this.label + "' clicked!");
  }
}

// 1.2
class C {
  constructor() {
    this.num = Math.random();
  }
  rand() {
    console.log("Random: " + this.num);
  }
}

var c1 = new C();
c1.rand(); // "Random: 0.4324299..."

C.prototype.rand = function() {
  console.log("Random: " + Math.round(this.num * 1000));
};

var c2 = new C();
c2.rand(); // "Random: 867"

c1.rand(); // "Random: 432" -- oops!!!

// 1.3
class C {
  constructor() {
    // make sure to modify the shared state,
    // not set a shadowed property on the
    // instances!
    C.prototype.count++;

    // here, `this.count` works as expected
    // via delegation
    console.log("Hello: " + this.count);
  }
}

// add a property for shared state directly to
// prototype object
C.prototype.count = 0;

var c1 = new C();
// Hello: 1

var c2 = new C();
// Hello: 2

c1.count === 2; // true
c1.count === c2.count; // true

// 1.4
class C {
  constructor(id) {
    // oops, gotcha, we're shadowing `id()` method
    // with a property value on the instance
    this.id = id;
  }
  id() {
    console.log("Id: " + this.id);
  }
}

var c1 = new C("c1");
c1.id(); // TypeError -- `c1.id` is now the string "c1"

// 1.5
class P {
  foo() { console.log("P.foo"); }
}

class C extends P {
  foo() {
    super();
  }
}

var c1 = new C();
c1.foo(); // "P.foo"

var D = {
  foo: function() { console.log("D.foo"); }
};

var E = {
  foo: C.prototype.foo
};

// Link E to D for delegation
Object.setPrototypeOf(E, D);

E.foo(); // "P.foo"

// 1.6
var D = {
  foo: function() { console.log("D.foo"); }
};

// Link E to D for delegation
var E = Object.create(D);

// manually bind `foo`s `[[HomeObject]]` as
// `E`, and `E.[[Prototype]]` is `D`, so thus
// `super()` is `D.foo()`
E.foo = C.prototype.foo.toMethod(E, "foo");

E.foo(); // "D.foo"




