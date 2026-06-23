/*
THIS的几种基本情况说明
  我们研究的THIS，都是研究函数私有上下文中的THIS
    + 因为全局上下文中的this->window
    + 块级上下文中没有自己的this，在此上下文中遇到的this，都是其所处环境(上级上下文)中的this
    + ES6中的箭头函数和块级上下文类似，也是没有自己的this，遇到的this也是其上级上下文中的
  THIS是执行主体：通俗来讲，是谁把它执行的，而不是在哪执行的，也不是在哪定义的，所以THIS是谁和在哪执行以及在哪定义都没有直接的关系；想搞定THIS，我们可以按照以下总结的规律去分析！！
    @1 给DOM元素进行事件绑定(不论是DOM0还是DOM2)，当事件行为触发，绑定的方法执行，方法中的THIS是当前DOM元素本身!!
    @2 当方法执行，我们看函数前面是否有“点”
       + 有：“点”之前是谁THIS就是谁
       + 没有：THIS就是window(非严格模式)或者undefined(严格模式 "use strict")
       + 匿名函数(自执行函数或者回调函数等)中的THIS一般都是window/undefined，除非做过特殊的处理！！
*/
// "use strict";
/* // 回调函数：把一个函数作为实参值，传递给另外一个函数「在另外一个函数中，把其执行」
const fn = function fn(callback) {
    callback();
};
fn(function () { }); */
/* setTimeout(function () {
    console.log(this); //window
}, 1000); */
/* let arr = [10, 20];
let obj = { name: 'zhufeng' };
// arr.forEach(function (item, index) {
//     // console.log(item, index);
//     console.log(this); //window/undefined
// });
arr.forEach(function (item, index) {
    console.log(this); //obj
}, obj); //forEach([回调函数],[修改回调函数中的THIS]) */

/* // 自执行函数:创建完立即执行
// (function(){})();
// ~function(){}();
// !function(){}();
// +function(){}();
(function (x) {
    console.log(this); //window/undefined
})(10); */

/* const fn = function () {
    console.log(this);
};
let obj = {
    name: 'zhufeng',
    // fn:fn
    fn
};
fn(); //this->window/undefined
obj.fn(); //this->obj */

// 事件绑定
/* document.onclick = function () {
    console.log(this); //document
};
document.addEventListener('click', function () {
    console.log(this); //document
}); */

/* // let 和 var 是不一样的
var x = 3,
    obj = { x: 5 };
obj.fn = (function () {
    this.x *= ++x;
    return function (y) {
        this.x *= (++x) + y;
        console.log(x);
    }
})();
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x); */