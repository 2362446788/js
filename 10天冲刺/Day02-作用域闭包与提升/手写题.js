/**
 * Day 2 手写题
 * 主题：闭包、防抖、节流、高阶函数
 */

/**
 * 题 1：实现 debounce(fn, wait, immediate)
 * 题目描述：
 * - 返回一个新函数
 * - 高频触发时，只在“最后一次触发后的 wait 时间”执行
 * - 如果 immediate = true，则第一次立刻执行，之后进入冷却
 * 示例场景：搜索框联想、resize、按钮防重复点击
 * 来源：
 * - 2026 Front End Interview Handbook JavaScript utility functions
 * - 高频前端手写题
 */
function debounce(fn, wait = 300, immediate = false) {
  // TODO
}

/**
 * 题 2：实现 throttle(fn, wait)
 * 题目描述：
 * - 返回一个新函数
 * - 高频触发时，保证 fn 每隔 wait 毫秒最多执行一次
 * 示例场景：scroll、mousemove、拖拽
 * 来源：
 * - 2026 Front End Interview Handbook JavaScript utility functions
 * - 高频前端手写题
 */
function throttle(fn, wait = 300) {
  // TODO
}

/**
 * 题 3：实现 once(fn)
 * 要求：函数只执行一次
 * 题目描述：
 * - 第一次调用执行 fn 并缓存结果
 * - 后续调用直接返回第一次的结果
 * 来源：
 * - 高频前端闭包手写题
 */
function once(fn) {
  // TODO
}

/**
 * 题 4：实现 curry(fn)
 * 题目描述：
 * - 支持分批传参
 * - 当累计参数个数达到原函数形参个数时执行
 * 示例：
 *   const add = (a,b,c) => a+b+c
 *   curry(add)(1)(2)(3) === 6
 * 来源：
 * - 2026 Front End Interview Handbook higher-order / curry questions
 */
function curry(fn) {
  // TODO
}

export { debounce, throttle, once, curry };
