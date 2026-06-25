/* function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName(); */

//======================
function Dog(name) {
    this.name = name;
}
Dog.prototype.bark = function () {
    console.log('wangwang');
}
Dog.prototype.sayName = function () {
    console.log('my name is ' + this.name);
}
/* let sanmao = new Dog('三毛');
sanmao.sayName();
sanmao.bark(); */

// 面试题：假如没有new关键词，需要我们自己编写_new方法，实现出和new相同的效果
/* function _new(Ctor, ...params) {
    // @1 创造当前类Ctor的一个实例对象「空对象、__proto__===Ctor.prototype」
    let obj = {};
    obj.__proto__ = Ctor.prototype;
    // @2 把构造函数当做普通函数执行，只不过让函数中的this指向创建的实例对象
    let result = Ctor.call(obj, ...params);
    // @3 判断函数执行的返回值，如果返回的是对象，则以自己返回的为主；否则把创建的实例对象返回！
    if (result !== null && /^(object|function)$/.test(typeof result)) return result;
    return obj;
} */
/* function _new(Ctor, ...params) {
    /!* let obj = {},
        result;
    Object.setPrototypeOf(obj, Ctor.prototype); //给某个对象设置原型指向(也就是让obj.__proto__===Ctor.prototype)，只兼容IE11及以上 *!/
    // Object.create(proto)：创建一个空对象，并且把proto作为空对象的原型指向（空对象.__proto__===proto）；proto必须是对象或者null；如果是null则是创造一个没有原型指向的对象； 不兼容IE6~8
    let obj = Object.create(Ctor.prototype),
        result;
    result = Ctor.call(obj, ...params);
    if (result !== null && /^(object|function)$/.test(typeof result)) return result;
    return obj;
} */
/* function _new(Ctor, ...params) {
    let obj,
        result,
        proto = Ctor.prototype;
    if (!proto || Ctor === Symbol || Ctor === BigInt) throw new TypeError('Ctor is not a constructor');
    obj = Object.create(proto);
    result = Ctor.call(obj, ...params);
    if (result !== null && /^(object|function)$/.test(typeof result)) return result;
    return obj;
} */

function _new(Ctor) {
    if (typeof Ctor !== "function") throw new TypeError('Ctor is not a constructor');
    if (!Ctor.prototype || Ctor === Symbol || Ctor === BigInt) throw new TypeError('Ctor is not a constructor');
    var obj, result, params;
    params = [].slice.call(arguments, 1);
    obj = Object.create(Ctor.prototype);
    result = Ctor.apply(obj, params);
    if (result !== null && /^(object|function)$/.test(typeof result)) return result;
    return obj;
}
var sanmao = _new(Dog, '三毛', 25);
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三毛"
console.log(sanmao instanceof Dog); //=>true  instanceof是用来检测某个对象是否是当前构造函数的实例对象

//=========================
/* // 模拟slice实现克隆
Array.prototype.slice = function slice() {
    // this->arr
    var arg = [];
    for (var i = 0; i < this.length; i++) {
        arg.push(this[i]);
    }
    return arg;
};
// let arr = [10, 20, 30, 40];
// let arr2 = arr.slice();
// console.log(arr2);

function fn() {
    // console.log(arguments); //类数组集合，不能直接使用Array.prototype上的方法
    // console.log(arguments.slice(1)); //Uncaught TypeError: arguments.slice is not a function

    // 我们如果可以把arguments变为数组集合即可?
    /!* var arg = Array.from(arguments); //ES6新增的，IE都不兼容
    console.log(arg); *!/
    /!* var arg = [];
    for (var i = 0; i < arguments.length; i++) {
        arg.push(arguments[i]);
    }
    console.log(arg); *!/
    // 通过对比，我们发现：只要我们把Array.prototype.slice方法执行，让方法中的this指向arguments，就相当于循环arguments中的每一项，并且赋值给新数组，实现把类数组转换为数组「前提：arguments类数组集合和数组结构基本一致，操作的代码也基本一致，只不过是不能直接用Array.prototype上的这些方法而已」
    //  + 把slice执行  Array.prototype.slice() 或者 [].slice()
    //  + 改变this  call方法
    var arg = [].slice.call(arguments);
    console.log(arg);
    // 类数组借用数据原型上的方法进行操作：大部分方法都可以基于这种方式借用  [].xxx.call([类数组],[实参]...)
}
fn(10, 20, 30, 40, 50); */