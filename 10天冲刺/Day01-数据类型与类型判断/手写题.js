/**
 * Day 1 手写题
 * 主题：数据类型、类型判断、转换基础
 */

/**
 * 题 1：实现 getType(value)
 * 题目描述：
 * - 请返回一个小写字符串，准确描述 value 的数据类型
 * - 至少需要正确区分：null、undefined、number、string、boolean、
 *   symbol、bigint、function、array、object、date、regexp
 * - 不允许只返回 typeof 的结果
 * 示例：
 * - getType([]) => 'array'
 * - getType(null) => 'null'
 * - getType(new Date()) => 'date'
 * 来源：
 * - 2026 Front End Interview Handbook JavaScript quiz/type questions
 * - 飞书《大前端面试宝典》Q76/Q79/Q104
 */
function getType(value) {
  if (value === null) {
    return null;
  }
  let type = typeof value;
  if (type !== "object") {
    return type;
  }
  return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();
}

/**
 * 题 2：实现 isEmptyObject(obj)
 * 要求：仅判断“自有属性是否为空”
 * 题目描述：
 * - 如果传入的不是普通对象，返回 false
 * - 如果对象没有任何自有属性，则返回 true
 * - 要考虑 Symbol key 的情况
 * 示例：
 * - isEmptyObject({}) => true
 * - isEmptyObject({ a: 1 }) => false
 * 来源：
 * - 飞书《大前端面试宝典》Q73
 */
function isEmptyObject(obj) {
  // TODO
}

/**
 * 题 3：实现 arrayLikeToArray(value)
 * 要求：支持 arguments / NodeList / 拥有 length 的类数组
 * 题目描述：
 * - 把类数组对象安全地转换成真正的数组
 * - 传入 null / undefined 时返回空数组
 * - 不要求支持任意可迭代对象，只关注类数组
 * 示例：
 * - arrayLikeToArray({0:'a',1:'b',length:2}) => ['a','b']
 * 来源：
 * - 飞书《大前端面试宝典》Q105
 */
function arrayLikeToArray(value) {
  // TODO
}

/**
 * 题 4：实现 preciseAdd(a, b) / preciseSub(a, b)
 * 要求：解决 0.1 + 0.2 精度问题
 * 题目描述：
 * - 不依赖第三方库
 * - 尽量通过“放大成整数再运算”的思路实现
 * - 返回 number 结果
 * 示例：
 * - preciseAdd(0.1, 0.2) => 0.3
 * - preciseSub(0.3, 0.1) => 0.2
 * 来源：
 * - 高频前端手写题
 * - 结合 Day01 数据类型与数字精度专题
 */
function preciseAdd(a, b) {
  // TODO
}

function preciseSub(a, b) {
  // TODO
}

export { getType, isEmptyObject, arrayLikeToArray, preciseAdd, preciseSub };
