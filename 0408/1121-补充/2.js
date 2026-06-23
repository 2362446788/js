// 浏览器的垃圾回收机制：浏览器在空闲的时候，会把所有未被占用的内容释放掉，以此来优化内存空间
// 对于前端开发来讲，我们应该尽可能减少内存的开辟，并在把一些无用的内存取消对其的占用
// 堆内存:
/* let obj = { //0x000
    name: 'zhufeng',
    age: 13
};
let obj2 = obj;
obj = null;
obj2 = null; */

/* function fn() { }
fn = null; */

// 栈内存：执行上下文
// 全局执行上下文，在浏览器打开页面的时候创建，在浏览器关掉页面的时候释放「F5刷新：把上一次的释放，再形成一个新的」
// 私有上下文，默认情况下，代码执行完，都会出栈释放；但是如果，上下文中的某些内容(一般指在内部创建的函数)，被上下文以外的事物占用了，不仅被占用内容不能释放，连带着当前这个私有上下文也不能被释放！！ ===> 闭包：函数执行，产生一个不被释放的上下文，这样不仅函数中的私有变量不受外界的干扰(保护)、而且存储的信息也不会被释放掉(保存,可以供其下级上下文调取使用)，我们把这种“保存+保护”的机制称之为闭包！！
/* let x = 5;
const fn = function fn(x) {
    return function (y) {
        console.log(y + (++x));
    };
};
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x); */

/* let a = 0,
    b = 0;
let A = function (a) {
    A = function (b) {
        alert(a + b++);
    };
    alert(a++);
};
A(1);
A(2); */

/* =====(let / const) &&  var 的区别 =====*/
// 1. let不存在变量提升,不允许在定义之前使用
/* console.log(a); //undefined
var a = 12;
console.log(b); //Uncaught ReferenceError: Cannot access 'b' before initialization
let b = 13; */

// 2. let不允许重复声明「不论当前上下文中，基于何种方式声明过这个变量，都不允许基于let再次声明」
/* // Uncaught SyntaxError: Identifier 'a' has already been declared 在词法解析阶段，发现有基于let重复声明，词法解析就报错了，所以JS代码都不会执行
console.log('OK');
var a = 12;
let a = 13; */

// 3. 在全局上下文中，基于var/function声明的变量，是给window(GO)设置的全局属性；基于let/const声明的变量是放在VO(G)中的，和GO没有任何的关系；
/* var a = 12;
let b = 13;
console.log(a); //先看VO(G)中有没有，没有则继续看GO中是否存在...  12
console.log(window.a); //直接到GO中查找  12
console.log(b); //13
console.log(window.b); //undefined
// console.log(c); //Uncaught ReferenceError: c is not defined
d = 100; //先看VO(G)中是否存在d，如果存在则修改全局变量值，如果不存在，则直接给GO设置d的属性(或者修改GO中d的属性值)
console.log(window.d); //100 */

// 4. let会产生块级上下文
/* {
    var a = 12;
    let b = 13;
    console.log(a, b); //12 13
}
console.log(a); //12
console.log(b); //Uncaught ReferenceError: b is not defined  b是块级上下文中私有的 */

// 5. let的暂时性死区问题
// console.log(typeof a); //"undefined" 基于typeof检测一个未被声明的变量，结果不会抱错，而是"undefined"
/* console.log(typeof a); //Uncaught ReferenceError: Cannot access 'a' before initialization
let a = 100; */

/* =====let && const 的区别 =====*/
// const声明的是常量，这句话是不准确的，他声明的函数变量；基于const声明的变量，首先必须赋值初始值，而且一但和某个值关联，后期不允许更改其指针指向（也就是不能重新赋值为其他的值）;
// const a; //Uncaught SyntaxError: Missing initializer in const declaration
/* const a = 12;
a = 13; //Uncaught TypeError: Assignment to constant variable. */
/* const obj = { name: 'zhufeng' };
obj.name = '珠峰';
console.log(obj); */