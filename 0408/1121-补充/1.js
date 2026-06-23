/* let x = [12, 23];
function fn(y) {
    y[0] = 100;
    y = [100];
    y[1] = 200;
    console.log(y);
}
fn(x);
console.log(x); */

/*
 EC(G)全局执行上下文
   VO(G)/GO
     a -> 12
   变量提升：var a;
   代码执行
 */
/* // 其实最开始浏览器从服务器端获取的JS都是文本(字符串)，只不过声明了其格式是「Content-Type: application/javascript;」，浏览器首先按照这个格式去解析代码 -> “词法解析”阶段「目标是生成“AST词法解析树”」
// 基于let/const等声明的变量：在词法解析阶段，其实就已经明确了，未来在此上下文中，必然会存在这些变量；代码执行中，如果出现在具体声明的代码之前使用这些变量，浏览器会抛出错误！！
debugger;
console.log(a); //undefined
var a = 12;
console.log(b); //Uncaught ReferenceError: Cannot access 'b' before initialization
let b = 12; */

/*
 EC(G)
   VO(G)/GO
     fn -> 0x001 [[scope]]:EC(G)
        -> 0x002 [[scope]]:EC(G)
        -> 12
   变量提升:
     function fn(){ console.log(1); }
     var fn;  //上下文中已经存在fn变量了，不会重复声明
     function fn(){ console.log(2); }
   代码执行:
 */
// console.log(fn); //function->2
// function fn(){ console.log(1); } //跳过「变量提升阶段已经处理过了」
// console.log(fn); //function->2
// var fn = 12; //跳过var fn操作，但是赋值的操作在变量提升阶段没搞过，需要执行
// console.log(fn); //12
// function fn(){ console.log(2); } //跳过
// console.log(fn); //12


/*
 EC(G)
   VO(G)/GO
     a
   变量提升：不论条件是否成立，都要进行变量提升（对于var来讲新老版本浏览器没有任何影响，但是对于判断体中出现的function来讲，新老版本表现不一致：老版本 函数还是声明+定义  新版本 函数只会声明，不在定义）
     var a;
 */
// console.log(a); //undefined
// if (!('a' in window)) { //'a' in window  TRUE
//     var a = 13;
// }
// console.log(a); //undefined

/* // 真实项目中，目前推荐使用 函数表达式的方式（把函数作为值赋值给变量） 创建函数：这样抛开了变量提升的机制，导致函数的执行只能在创建函数代码之后，保证逻辑的严谨性！！
const fn = function () { };
fn(); */

// 上下文：全局上下文EC(G)、函数执行产生的私有上下文EC(?)、ES6规范中新提供了“块级私有上下文”EC(BLOCK)
/*
 EC(G) 
   VO(G)/GO
     a -> （12）100
     b -> 13
   变量提升：var a;
 */
/* debugger;
console.log(a); //undefined
// console.log(b); //Uncaught ReferenceError: Cannot access 'b' before initialization
var a = 12;
let b = 13;
if (1 == 1) {
    /!*
     EC(BLOCK) 块级私有上下文
       VO(BLOCK)
         b -> 200
       作用域链：<EC(BLOCK),EC(G)>
       没有THIS和ARG、也没有形参赋值
       变量提升：-- “带var关键字的不受块的任何影响”
     *!/
    console.log(a); //12
    // console.log(b); //Uncaught ReferenceError: Cannot access 'b' before initialization 在块级上下文中，未来一定存在基于let声明的b，所以不允许在定义之前使用
    var a = 100;
    let b = 200;
    console.log(a); //100
    console.log(b); //200
}
console.log(a); //100
console.log(b); //13 */

debugger;
console.log(foo);
if (1 === 1) {
    console.log(foo);
    function foo() { }
    foo = 1;
    console.log(foo);
}
console.log(foo);