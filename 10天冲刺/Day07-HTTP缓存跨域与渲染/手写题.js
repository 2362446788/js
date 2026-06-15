/**
 * Day 7 手写题
 * 主题：网络、跨域、DOM 事件
 */

/**
 * 题 1：实现 ajax(options)
 * 要求：返回 Promise，支持 method、url、data、timeout
 * 题目描述：
 * - 用 XMLHttpRequest 封装一个最小可用的 ajax
 * - 成功时 resolve 响应内容
 * - 失败、超时、网络错误时 reject
 * 来源：
 * - 2026 Front End Interview Handbook Ajax
 * - 飞书《大前端面试宝典》Q69
 */
function ajax(options) {
  // TODO
}

/**
 * 题 2：实现 jsonp(url, params, callbackKey)
 * 题目描述：
 * - 动态插入 script 发起请求
 * - 服务端会返回形如 callbackName(data) 的脚本
 * - 需要清理全局回调和 script 标签
 * 来源：
 * - 飞书《大前端面试宝典》Q71
 * - Day07 跨域专题
 */
function jsonp(url, params = {}, callbackKey = "callback") {
  // TODO
}

/**
 * 题 3：实现 delegate(parent, selector, eventName, handler)
 * 题目描述：
 * - 基于事件委托，把子元素事件统一代理到父元素
 * - 命中 selector 时触发 handler
 * - 返回解绑函数
 * 来源：
 * - 2026 Front End Interview Handbook Event delegation
 * - 飞书《大前端面试宝典》Q114
 */
function delegate(parent, selector, eventName, handler) {
  // TODO
}

/**
 * 题 4：实现 getElementsByClassNameLite(root, className)
 * 题目描述：
 * - 不直接调用原生 getElementsByClassName
 * - 自己遍历 DOM 树并找出匹配 className 的元素
 * 来源：
 * - 2026 Front End Interview Handbook getElementsByClassName
 */
function getElementsByClassNameLite(root, className) {
  // TODO
}

export { ajax, jsonp, delegate, getElementsByClassNameLite };
