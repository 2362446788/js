/**
 * Day 3 手写题
 * 主题：this / call / apply / bind / new / instanceof
 */

/**
 * 题 1：实现 myCall
 * 题目描述：
 * - 模拟 `Function.prototype.call`
 * - 支持指定 this 指向
 * - 支持多个参数
 * 来源：
 * - 2026 Front End Interview Handbook `call` / `apply` / `bind`
 * - 高频前端手写题
 */
Function.prototype.myCall = function (context, ...args) {
  // 处理 context
  context = context === null ? window : Object(context);
  // this 执行调用 call 的那个函数
  let fn = this;
  // context 也是一个对象，所以构造一个属性将其执行 this 这个函数
  let key = Symbol("fn");
  context[key] = fn;
  // 直接调用
  let result = context[key](...args);
  // 执行完之后删除这个 key
  delete context[key];
  return result;
};

/**
 * 题 2：实现 myApply
 * 题目描述：
 * - 模拟 `Function.prototype.apply`
 * - 参数以数组形式传入
 * 来源：
 * - 2026 Front End Interview Handbook `call` / `apply` / `bind`
 * - 高频前端手写题
 */
Function.prototype.myApply = function (context, args) {
  // 处理 context
  context = context === null ? window : Object(context);
  // this 执行调用 call 的那个函数
  let fn = this;
  // context 也是一个对象，所以构造一个属性将其执行 this 这个函数
  let key = Symbol("fn");
  context[key] = fn;
  // 直接调用
  let result = Array.isArray(args) ? context[key](...args) : context[key]();
  // 执行完之后删除这个 key
  delete context[key];
  return result;
};

/**
 * 题 3：实现 myBind
 * 题目描述：
 * - 模拟 `Function.prototype.bind`
 * - 支持预置参数
 * - 必须处理 `new` 调用绑定函数的场景
 * 来源：
 * - 2026 Front End Interview Handbook `call` / `apply` / `bind`
 * - 高频前端手写题
 */
Function.prototype.myBind = function (context, ...args) {
  // 1. 边界处理：确保调用者是一个函数
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  // 保存原函数的引用（this 指向调用 myBind 的那个函数）
  const self = this;

  // 2. 创建一个中间函数（作为返回的新函数）
  const boundFunc = function (...innerArgs) {
    // 3. 判断是否通过 new 调用
    // 如果 this 是 boundFunc 的实例，说明是通过 new 调用的构造函数
    const isNewCall = this instanceof boundFunc;

    // 如果是 new 调用，this 指向新实例；否则指向 bind 传入的 context
    const finalThis = isNewCall ? this : context || globalThis;

    // 4. 合并参数：bind 时预设的参数 + 调用时传入的参数
    const finalArgs = [...args, ...innerArgs];

    // 5. 执行原函数并返回结果
    return self.apply(finalThis, finalArgs);
  };

  // 6. 维护原型链：让新函数的 prototype 指向原函数的 prototype
  // 这样通过 new boundFunc() 创建的实例，能正确继承原函数原型上的属性和方法
  if (self.prototype) {
    boundFunc.prototype = Object.create(self.prototype);
  }

  // 7. 返回绑定了上下文的新函数
  return boundFunc;
};

function bind(context, ...args) {
  // 1. 获取原始的函数
  let _this = this;
  if (typeof _this !== "function") {
    throw new TypeError("bind must call on a function");
  }
  // 2. 创建函数
  const boundFunc = function boundFunc(...params) {
    // 首先判断是不是new执行的
    let newCall = this instanceof boundFunc;
    // 如果是new执行的话this就使用this，否则使用 context
    let newThis = newCall ? this : context;
    // 最后将函数执行
    return _this.apply(newThis, [...args, ...params]);
  };
  // 3. 绑定原型链
  // 绑定原型链，这样在new执行之后还能够通过原型链访问到原本的函数的原型
  if (_this.prototype) {
    boundFunc.prototype = Object.create(_this.prototype);
  }
  // 4. 返回值
  return boundFunc;
}

/**
 * 题 4：实现 mockNew
 * 来源：
 * - 高频前端手写题
 * - Day03 `new` 核心原理
 * 题目描述：
 * - 模拟 `new Constructor(...args)` 的行为
 * - 正确处理构造函数返回对象和返回原始值两种情况
 */
function mockNew(Constructor, ...args) {
  // new 做了什么
  // 1. 创建一个新对象，将对象绑定到构造函数的原型上
  let obj = {};
  Object.setPrototypeOf(obj, Constructor.prototype);
  // 2. 执行函数，并且将this指向这个新对象
  let result = Constructor.apply(obj, args);
  // 3. 判断返回值，如果是对象类型返回对象，不是返回新对象
  if (
    result !== null &&
    (typeof result === "object" || typeof result === "function")
  ) {
    return result;
  }
  return obj;
}

/**
 * 题 5：实现 myInstanceof
 * 题目描述：
 * - 不使用原生 `instanceof`
 * - 基于原型链实现判断
 * 来源：
 * - 高频前端手写题
 * - Day03 原型链专题
 */
function myInstanceof(obj, Constructor) {
  // 判断是否是某个构造函数的实例
  // es6中可以使用 Symbol.hasInstance
  if (
    typeof Symbol !== "undefined" &&
    typeof Constructor[Symbol.hasInstance] === "function"
  ) {
    return Constructor[Symbol.hasInstance](obj);
  }
  // 没有的话直接使用原型链去查找
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

export { mockNew, myInstanceof };
