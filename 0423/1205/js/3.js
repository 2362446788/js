/*
  Function.prototype
    + call
    + apply
    + bind
  所有的函数都是Function类的实例，所以所有函数都可以调用这三个方法；而这个三个方法都是用来改变函数中的THIS指向的；

  call VS apply
    + 都是把函数立即执行，改变函数中的this指向的「第一个参数是谁，就把this改为谁」
    + 唯一区别：apply要求把传递给函数的实参，以数组的形式管理起来「最终效果和call一样，也是把数组中每一项，一个个的传给函数」
    + 真实项目中建议大家使用call，因为其性能好一些「做过测试：三个及以上参数，call的性能明显比apply好一些」

  call VS bind
    + call是把函数立即执行，而bind只是预处理函数中的this和参数，函数此时并没有执行
 */
Function.prototype.bind = function bind(context, ...params) {
  // this->fn  context->obj  params->[10,20]
  let self = this;
  return function proxy(...args) {
    // args->[ev] this->submit
    params = params.concat(args);
    return self.call(context, ...params);
  };
};

const submit = document.querySelector("#submit");
const obj = { name: "obj" };
const fn = function fn(x, y, ev) {
  console.log(this, x, y, ev);
};
// submit.onclick = fn; //点击按钮 this->submit  x->PointerEvent
// 需求：点击按钮，fn方法执行，我们想让其中的this变为obj，ev事件对象也存在，再传递10/20
// submit.onclick = fn.call(obj, 10, 20); //这样处理是错误的，因为call是把函数立即执行，还没点击呢，fn就执行了...
submit.onclick = function (ev) {
  // 先给事件行为绑定匿名函数，当点击的时候，先执行匿名函数「获取到ev事件对象了」；在匿名函数执行的时候(this->submit)，我们再让真正要处理的fn函数执行，此时就可以基于call去改变this了!!
  fn.call(obj, 10, 20, ev);
};
submit.onclick = fn.bind(obj, 10, 20); //这样处理就可以了
// submit.onclick = proxy;

//===========================
Function.prototype.call = function call(context, ...params) {
  // this->fn  context->obj  params->[10,20]
  // 思路：给context设置一个属性「例如：xxx 新增的属性不要和原始context中的属性冲突(设置symbol唯一值属性)」，让属性值等于要执行的函数(即:this「fn」)；后面就可以基于 context.xxx() 执行，这样既把函数执行了，也让函数中的“this”改为context了...
  let self = this,
    key = Symbol("KEY"),
    result;
  context[key] = self;
  result = context[key](...params);
  // delete context[key]; //新增的属性用完后记得移除
  Reflect.deleteProperty(context, key); //ES6中，可以基于Reflect.deleteProperty移除对象的属性
  return result;
};

Function.prototype.call = function call(context, ...params) {
  if (context == null) context = window;
  if (!/^(object|function)$/.test(typeof context)) context = Object(context);
  let self = this,
    key = Symbol("KEY"),
    result;
  context[key] = self;
  result = context[key](...params);
  Reflect.deleteProperty(context, key);
  return result;
};
const fn = function fn(x, y) {
  console.log(this, x, y);
  return x + y;
};
let obj = {
  name: "obj",
};
let res = fn.call("zhufeng", 10, 20);
console.log(res);
//@1 fn基于__proto__找到Function.prototype.call，把call方法执行；
//@2 在call方法执行的时候：
//  + context:obj 要改变的THIS指向  params:[10,20] 执行函数传递的实参信息  this:fn 要执行的函数
//  + 它干的事情是：立即把fn（this）执行，并且让fn（this）中的this指向obj（context），把10/20（params）传递给fn（this），接收fn（this）执行的返回结果，作为最后的结果返回

const fn = function fn(x, y) {
  console.log(this, x, y);
};
let obj = {
  name: "obj",
};
// obj.fn(10, 20); //Uncaught TypeError: obj.fn is not a function
// fn.call(obj, 10, 20); //this->obj x->10 y->20
// fn.apply(obj, [10, 20]); //this->obj x->10 y->20
// fn.call(10, 20); //this->new Number(10) x->20 y->undefined  「this存储的值：null/undefined/对象」
// fn.call(); //this->window/undefined(严格模式)
// fn.call(null); //this->window/null(严格模式)

// 获取数组最大值
let arr = [12, 23, 13, 24, 32, 15];
// console.log(Math.max(arr)); //NaN
// console.log(Math.max(12, 23, 13, 24, 32, 15)); //32  Math.max要求一项项的传递数字，不能直接传递数组
// console.log(Math.max(...arr)); //32  ES6中的展开运算符
// console.log(Math.max.apply(Math, arr)); //32

let obj = {
  // fn:fn
  fn,
  name: "obj",
};
// fn(10, 20); //this->window x->10 y->20
// obj.fn(10, 20); //this->obj x->10 y->20
