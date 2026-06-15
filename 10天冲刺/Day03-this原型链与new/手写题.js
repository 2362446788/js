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
  // TODO
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
  // TODO
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
Function.prototype.myBind = function (context, ...presetArgs) {
  // TODO
};

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
  // TODO
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
  // TODO
}

export { mockNew, myInstanceof };
