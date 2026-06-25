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
  // 前置参数判断
  if (typeof fn !== "function") {
    throw new TypeError("fn is not a function!");
  }
  let timer = null;
  return function operate(...args) {
    // 是否需要在第一次触发
    const callNow = immediate && !timer;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      // 先把 timer 清理，防止后续有不知名的逻辑混乱
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);
    if (callNow) {
      fn.apply(this, args);
    }
  };
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
  // 前置参数判断
  if (typeof fn !== "function") {
    throw new TypeError("fn is not a function!");
  }
  // 记录上一次触发的时间
  let previous = 0;
  // 定时器
  let timer = null;
  return function operate(...params) {
    // 记录当前时间节点
    let now = Date.now();
    // 如果是第一次 wait - (now - previous) 必定小于 0
    const remaining = wait - (now - previous);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // 两次触发的间隔时间超过设定的频率，则立即执行函数
      fn.call(this, ...params);
      previous = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        // 间隔时间不足设定的频率，而且还未设置等待的定时器，则设置定时器等待执行函数即可
        fn.call(this, ...params);
        previous = Date.now();
      }, remaining);
    }
  };
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
  let called = false;
  let result;
  return function operate(...params) {
    if (called) return result;
    called = true;
    result = fn.apply(this, params);
    return result;
  };
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
  const length = fn.length;
  function curried(...args) {
    if (args.length >= length) {
      return fn.apply(this, args);
    }
    return function operate(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  }
  return curried;
}

export { debounce, throttle, once, curry };
