/**
 * Day 5 手写题
 * 主题：Promise、异步控制、并发
 */

/**
 * 题 1：实现 Promise.all
 * 题目描述：
 * - 接收一个可迭代对象
 * - 全部成功时按原顺序返回结果数组
 * - 任意一个失败则立刻 reject
 * 来源：
 * - 2026 Front End Interview Handbook Promise-related APIs
 * - 高频前端手写题
 */
function promiseAll(promises) {
  // TODO
}

/**
 * 题 2：实现 Promise.any
 * 题目描述：
 * - 任意一个成功就 resolve
 * - 全部失败才 reject
 * 来源：
 * - 2026 Front End Interview Handbook Promise-related APIs
 */
function promiseAny(promises) {
  // TODO
}

/**
 * 题 3：实现 serialRun(tasks)
 * 要求：依次执行 Promise 任务数组
 * 题目描述：
 * - tasks 是函数数组，每个函数返回 Promise
 * - 必须一个任务完成后再执行下一个
 * - 最终返回所有结果数组
 * 来源：
 * - 高频前端异步控制手写题
 */
function serialRun(tasks) {
  // TODO
}

/**
 * 题 4：实现 promiseLimit(tasks, limit)
 * 要求：限制并发数
 * 题目描述：
 * - tasks 是返回 Promise 的函数数组
 * - 同一时间最多执行 limit 个任务
 * - 最终返回按原始顺序排列的结果
 * 来源：
 * - 2026 前端高频手写题趋势：Promise 并发控制
 */
async function promiseLimit(tasks, limit) {
  // TODO
}

export { promiseAll, promiseAny, serialRun, promiseLimit };
