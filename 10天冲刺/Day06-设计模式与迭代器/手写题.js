/**
 * Day 6 手写题
 * 主题：设计模式、事件系统、迭代器
 */

/**
 * 题 1：实现 EventEmitter
 * 题目描述：
 * - 支持 on / off / emit / once
 * - emit 时把参数传给订阅函数
 * - off 时按函数引用精确移除
 * 来源：
 * - 2026 Front End Interview Handbook Event Emitter
 * - 高频前端手写题
 */
class EventEmitter {
  on(eventName, handler) {
    // TODO
  }

  off(eventName, handler) {
    // TODO
  }

  emit(eventName, ...args) {
    // TODO
  }

  once(eventName, handler) {
    // TODO
  }
}

/**
 * 题 2：实现 Subject / Observer 最小版本
 * 题目描述：
 * - Subject 维护订阅者列表
 * - 调用 notify 时批量通知所有观察者
 * 来源：
 * - 飞书《大前端面试宝典》设计模式相关
 * - Day06 观察者模式专题
 */
class Subject {
  subscribe(observer) {
    // TODO
  }

  unsubscribe(observer) {
    // TODO
  }

  notify(payload) {
    // TODO
  }
}

/**
 * 题 3：实现 makeRangeIterator(start, end)
 * 要求：返回符合迭代器协议的对象
 * 题目描述：
 * - 返回一个对象，调用 next() 能依次产出 start 到 end-1
 * 来源：
 * - 2026 Front End Interview Handbook JavaScript fundamentals
 * - Day06 迭代器专题
 */
function makeRangeIterator(start, end) {
  // TODO
}

/**
 * 题 4：给对象增加 Symbol.iterator，使其可 for...of
 * 题目描述：
 * - 让普通对象也能被 for...of 遍历
 * - 遍历结果这里约定为 `[key, value]`
 * 来源：
 * - Day06 可迭代对象专题
 */
function attachIterator(obj) {
  // TODO
}

export { EventEmitter, Subject, makeRangeIterator, attachIterator };
