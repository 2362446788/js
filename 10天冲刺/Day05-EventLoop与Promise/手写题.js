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
  let promises = Array.from(promises);
  // 首先返回一个新的 promise 实例
  return new Promise((resolve, reject) => {
    // 遍历 promises 执行
    // 记录成功的 promise 数量
    let num = 0;
    // 存储成功的值
    let result = [];
    for (let i = 0; i < promises.length; i++) {
      let promise = promises[i];
      if (!isPromiseLike(promise)) {
        promise = Promise.resolve(promise);
        promise.then(
          (value) => {
            result[i] = value;
            num++;
            if (num >= promise.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          },
        );
      }
    }
  });
}
// thenable
function isPromiseLike(value) {
  if (value === null) return false;
  if (typeof value === "object" || typeof value === "function") {
    try {
      if (typeof value.then === "function") {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
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
  return new Promise((resolve, reject) => {
    let num = 0;
    let length = promises.length;
    for (let i = 0; i < length; i++) {
      let promise = promises[i];
      if (!isPromiseLike(promise)) {
        promise = Promise.resolve(promise);
      }
      promise.then(
        (value) => {
          resolve(value);
        },
        (err) => {
          num++;
          if (num >= length) {
            reject("No Promise in Promise.any was resolved");
          }
        },
      );
    }
  });
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

/**
 * 题 5：实现 Promise.race
 * 题目描述：
 * - 接收一个可迭代对象
 * - 第一个 settled 的 Promise 结果决定整体结果
 * 来源：
 * - 2026 Front End Interview Handbook Promise-related APIs
 * - 高频前端手写题
 */
function promiseRace(promises) {
  promises = Array.from(promises);
  let length = promises.length;
  for (let i = 0; i < length; i++) {
    let promise = promises[i];
    if (!isPromiseLike(promise)) {
      promise = Promise.resolve(promise);
    }
    promise.then(
      (value) => {
        resolve(value);
      },
      (err) => {
        reject(err);
      },
    );
  }
}

/**
 * 题 6：实现 Promise.allSettled
 * 题目描述：
 * - 接收一个可迭代对象
 * - 等待所有 Promise 都 settled（不论成功或失败）
 * - 返回结果数组，每项为 {status, value} 或 {status, reason}
 * 来源：
 * - 2026 Front End Interview Handbook Promise-related APIs
 */
function promiseAllSettled(promises) {
  promises = Array.from(promises);
  let num = 0;
  let result = [];
  let length = promises.length;
  for (let i = 0; i < length; i++) {
    let promise = Promise.resolve(promises[i]);
    promise.then(
      (value) => {
        num++;
        result[i] = {
          status: "fulfilled",
          value: value,
        };
        if (num >= length) {
          resolve(result);
        }
      },
      (err) => {
        num++;
        result[i] = {
          status: "rejected",
          reason: err,
        };
        if (num >= length) {
          resolve(result);
        }
      },
    );
  }
}

/**
 * 题 7：实现 Promise.allLimit(promises, limit)
 * 要求：具备可控失败数量的 Promise.all（字节面试题）
 * 题目描述：
 * - promises 是可迭代对象（Promise 或普通值）
 * - limit 是允许的最大失败次数
 * - 失败数 < limit 时，失败项结果置为 null，继续等待
 * - 失败数 >= limit 时，立刻 reject
 * - 全部 settled 后 resolve 结果数组
 * 来源：
 * - 字节跳动面试题
 */
function promiseAllLimit(promises, limit) {
  promises = Array.from(promises);
  let result = [];
  let successNum = 0;
  let failNum = 0;
  let length = promises.length;
  promises.forEach((item, index) => {
    Promise.resolve(item).then(
      (value) => {
        successNum++;
        result[index] = value;
        if (successNum >= length) {
          resolve(result);
        }
      },
      (err) => {
        failNum++;
        if (failNum >= limit) {
          reject(new Error("limit error"));
          return;
        }
        successNum++;
        result[index] = null;
        if (successNum >= length) {
          resolve(result);
        }
      },
    );
  });
}

export {
  promiseAll,
  promiseAny,
  serialRun,
  promiseLimit,
  promiseRace,
  promiseAllSettled,
  promiseAllLimit,
};
