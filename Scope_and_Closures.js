'use strict';

// Chapter 1 code

//1.1
function foo(a) {
  console.log(a); // 2
}

foo(2);

// 1.2 
function foo(a) {
  console.log(a); // 2
}

foo(2);

// 1.3
function foo(a) {
  var b = a;
  return a + b;
}

var c = foo(2);

// 1.4
function foo(a) {
  console.log(a + b);
  b = a;
}

foo(2);


// Chapter 2

// 2.1
function foo(a) {

  var b = a * 2;

  function bar(c) {
    console.log(a, b, c);
  }

  bar(b * 3);
}

foo(2); // 2 4 12

// 2.2
function foo(str, a) {
  eval(str); // cheating!
  console.log(a, b);
}

var b = 2;

foo("var b = 3;", 1); // 1 3

// 2.3
function foo(str) {
  "use strict";
  eval(str);
  console.log(a); // ReferenceError: a is not defined
}

foo("var a = 2");

// 2.4
var obj = {
  a: 1,
  b: 2,
  c: 3
};

// more "tedious" to repeat "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;

// "easier" short-hand
with (obj) {
  a = 3;
  b = 4;
  c = 5;
}

// 2.5
function foo(obj) {
  with (obj) {
    a = 2;
  }
}

var o1 = {
  a: 3
};

var o2 = {
  b: 3
};

foo(o1);
console.log(o1.a); // 2

foo(o2);
console.log(o2.a); // undefined
console.log(a); // 2 -- Oops, leaked global!

// Chapter 3

// 3.1
function foo(a) {
  var b = 2;

  // some code

  function bar() {
    // ...
  }

  // more code

  var c = 3;
}

// 3.2
bar(); // fails

console.log(a, b, c); // all 3 fail

// 3.3
function doSomething(a) {
  b = a + doSomethingElse(a * 2);

  console.log(b * 3);
}

function doSomethingElse(a) {
  return a - 1;
}

var b;

doSomething(2); // 15

// 3.4
function doSomething(a) {
  function doSomethingElse(a) {
    return a - 1;
  }

  var b;

  b = a + doSomethingElse(a * 2);

  console.log(b * 3);
}

doSomething(2); // 15

// 3.5
function foo() {
  function bar(a) {
    i = 3; // changing the `i` in the enclosing scope's for-loop
    console.log(a + i);
  }

  for (var i = 0; i < 10; i++) {
    bar(i * 2); // oops, infinite loop ahead!
  }
}

foo();

// 3.6
var MyReallyCoolLibrary = {
  awesome: "stuff",
  doSomething: function () {
    // ...
  },
  doAnotherThing: function () {
    // ...
  }
};

// 3.7
var a = 2;

function foo() { // <-- insert this

  var a = 3;
  console.log(a); // 3

} // <-- and this
foo(); // <-- and this

console.log(a); // 2

// 3.8
var a = 2;

(function foo() { // <-- insert this

  var a = 3;
  console.log(a); // 3

})(); // <-- and this

console.log(a); // 2

// 3.9
setTimeout(function () {
  console.log("I waited 1 second!");
}, 1000);

// 3.10
setTimeout(function timeoutHandler() { // <-- Look, I have a name!
  console.log("I waited 1 second!");
}, 1000);

// 3.11
var a = 2;

(function foo() {

  var a = 3;
  console.log(a); // 3

})();

console.log(a); // 2

// 3.12
var a = 2;

(function IIFE() {

  var a = 3;
  console.log(a); // 3

})();

console.log(a); // 2

// 3.13
var a = 2;

(function IIFE(global) {

  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2

})(window);

console.log(a); // 2

// 3.14
undefined = true; // setting a land-mine for other code! avoid!

(function IIFE(undefined) {

  var a;
  if (a === undefined) {
    console.log("Undefined is safe here!");
  }

})();

// 3.15
var a = 2;

(function IIFE(def) {
  def(window);
})(function def(global) {

  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2

});

// 3.16
for (var i = 0; i < 10; i++) {
  console.log(i);
}

// 3.17
var foo = true;

if (foo) {
  var bar = foo * 2;
  bar = something(bar);
  console.log(bar);
}

// 3.18
for (var i = 0; i < 10; i++) {
  console.log(i);
}

// 3.19
try {
  undefined(); // illegal operation to force an exception!
}
catch (err) {
  console.log(err); // works!
}

console.log(err); // ReferenceError: `err` not found

// 3.20
var foo = true;

if (foo) {
  let bar = foo * 2;
  bar = something(bar);
  console.log(bar);
}

console.log(bar); // ReferenceError

// 3.21
var foo = true;

if (foo) {
  { // <-- explicit block
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
  }
}

console.log(bar); // ReferenceError

// 3.22
{
  console.log(bar); // ReferenceError!
  let bar = 2;
}

// 3.23
function process(data) {
  // do something interesting
}

var someReallyBigData = { ..};

process(someReallyBigData);

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt) {
  console.log("button clicked");
}, /*capturingPhase=*/false);

// 3.24
function process(data) {
  // do something interesting
}

// anything declared inside this block can go away after!
{
  let someReallyBigData = { ..};

  process(someReallyBigData);
}

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt) {
  console.log("button clicked");
}, /*capturingPhase=*/false);

// 3.25
for (let i = 0; i < 10; i++) {
  console.log(i);
}

console.log(i); // ReferenceError

// 3.26
{
  let j;
  for (j = 0; j < 10; j++) {
    let i = j; // re-bound for each iteration!
    console.log(i);
  }
}

// 3.27
var foo = true, baz = 10;

if (foo) {
  var bar = 3;

  if (baz > bar) {
    console.log(baz);
  }

  // ...
}

// 3.28
var foo = true, baz = 10;

if (foo) {
  var bar = 3;

  // ...
}

if (baz > bar) {
  console.log(baz);
}

// 3.29
var foo = true;

if (foo) {
  var a = 2;
  const b = 3; // block-scoped to the containing `if`

  a = 3; // just fine!
  b = 4; // error!
}

console.log(a); // 3
console.log(b); // ReferenceError!

// Chapter 4
// 4.1
a = 2;

var a;

console.log(a);

// 4.2
console.log(a);

var a = 2;

// 4.3
foo();

function foo() {
  console.log(a); // undefined

  var a = 2;
}

// 4.4
function foo() {
  var a;

  console.log(a); // undefined

  a = 2;
}

foo();

// 4.5
foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
  // ...
};

// 4.6
foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
  // ...
};

// 4.7
var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function () {
  var bar = ...self...
  // ...
}

// 4.8
foo(); // 1

var foo;

function foo() {
  console.log(1);
}

foo = function () {
  console.log(2);
};

// 4.9
function foo() {
  console.log(1);
}

foo(); // 1

foo = function () {
  console.log(2);
};

// 4.10
foo(); // 3

function foo() {
  console.log(1);
}

var foo = function () {
  console.log(2);
};

function foo() {
  console.log(3);
}

// 4.11
foo(); // "b"

var a = true;
if (a) {
  function foo() { console.log("a"); }
}
else {
  function foo() { console.log("b"); }
}

// Chapter 5
// 5.1
function foo() {
  var a = 2;

  function bar() {
    console.log(a); // 2
  }

  bar();
}

foo();

// 5.2
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed, man.

// 5.3
function foo() {
  var a = 2;

  function baz() {
    console.log(a); // 2
  }

  bar(baz);
}

function bar(fn) {
  fn(); // look ma, I saw closure!
}

// 5.4
var fn;

function foo() {
  var a = 2;

  function baz() {
    console.log(a);
  }

  fn = baz; // assign `baz` to global variable
}

function bar() {
  fn(); // look ma, I saw closure!
}

foo();

bar(); // 2

// 5.5
function wait(message) {

  setTimeout(function timer() {
    console.log(message);
  }, 1000);

}

wait("Hello, closure!");

// 5.6
function setupBot(name, selector) {
  $(selector).click(function activator() {
    console.log("Activating: " + name);
  });
}

setupBot("Closure Bot 1", "#bot_1");
setupBot("Closure Bot 2", "#bot_2");

// 5.7
var a = 2;

(function IIFE() {
  console.log(a);
})();

// 5.8
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}

// 5.9
for (var i = 1; i <= 5; i++) {
  (function () {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })();
}

// 5.10
for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}

// 5.11
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}

// 5.12
for (var i = 1; i <= 5; i++) {
  let j = i; // yay, block-scope for closure!
  setTimeout(function timer() {
    console.log(j);
  }, j * 1000);
}

// 5.13
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}

// 5.14
function foo() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }
}

// 5.15
function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// 5.16
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// 5.17
function CoolModule(id) {
  function identify() {
    console.log(id);
  }

  return {
    identify: identify
  };
}

var foo1 = CoolModule("foo 1");
var foo2 = CoolModule("foo 2");

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"

// 5.18
var foo = (function CoolModule(id) {
  function change() {
    // modifying the public API
    publicAPI.identify = identify2;
  }

  function identify1() {
    console.log(id);
  }

  function identify2() {
    console.log(id.toUpperCase());
  }

  var publicAPI = {
    change: change,
    identify: identify1
  };

  return publicAPI;
})("foo module");

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

// 5.19
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  };
})();

// 5.20
MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello
  };
});

MyModules.define("foo", ["bar"], function (bar) {
  var hungry = "hippo";

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(
  bar.hello("hippo")
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO


// 5.21
function hello(who) {
  return "Let me introduce: " + who;
}

export hello;

// 5.22
// import only `hello()` from the "bar" module
import hello from "bar";

var hungry = "hippo";

function awesome() {
  console.log(
    hello(hungry).toUpperCase()
  );
}

export awesome;
// import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";

console.log(
  bar.hello("rhino")
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO

// Appendix A
// 1.1
function foo() {
  console.log(a); // 2
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;

bar();

// 1.2
function foo() {
  console.log(a); // 3  (not 2!)
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;

bar();

// Appendix B
// 1.1
{
  let a = 2;
  console.log(a); // 2
}

console.log(a); // ReferenceError

// 1.2
try { throw 2 } catch (a) {
  console.log(a); // 2
}

console.log(a); // ReferenceError

// 1.3
{
  try {
    throw undefined;
  } catch (a) {
    a = 2;
    console.log(a);
  }
}

console.log(a);

// 1.4
let(a = 2) {
  console.log(a); // 2
}

console.log(a); // ReferenceError

// 1.5
/*let*/ {
  let a = 2;
  console.log(a);
}

console.log(a); // ReferenceError

// 1.6
{
  let a = 2;
  console.log(a);
}

console.log(a); // ReferenceError

// Appendix C
// 1.1
var foo = a => {
  console.log(a);
};

foo(2); // 2

// 1.2
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log(this.id);
  }
};

var id = "not awesome";

obj.cool(); // awesome

setTimeout(obj.cool, 100); // not awesome

// 1.3
var obj = {
  count: 0,
  cool: function coolFn() {
    var self = this;

    if (self.count < 1) {
      setTimeout(function timer() {
        self.count++;
        console.log("awesome?");
      }, 100);
    }
  }
};

obj.cool(); // awesome?

// 1.4
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(() => { // arrow-function ftw?
        this.count++;
        console.log("awesome?");
      }, 100);
    }
  }
};

obj.cool(); // awesome?

// 1.5
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(function timer() {
        this.count++; // `this` is safe because of `bind(..)`
        console.log("more awesome");
      }.bind(this), 100); // look, `bind()`!
    }
  }
};

obj.cool(); // more awesome

// 1.6

