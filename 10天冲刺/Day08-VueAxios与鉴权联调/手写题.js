/**
 * Day 8 手写题
 * 主题：请求封装、拦截器、鉴权
 */

/**
 * 题 1：实现 createHttpClient()
 * 要求：支持 request / response 拦截器
 * 题目描述：
 * - 实现一个最小版请求客户端工厂
 * - 返回的 request 函数支持注册请求拦截器和响应拦截器
 * - 内部基于 fetch 即可
 * 来源：
 * - 2026 前端高频工程化手写题
 * - 结合 Axios 拦截器专题
 */
function createHttpClient() {
  // TODO
}

/**
 * 题 2：实现 serializeParams(params)
 * 题目描述：
 * - 把对象序列化为查询字符串
 * - 过滤 null / undefined
 * 来源：
 * - 高频前端工程化手写题
 * - 结合 Day08 请求封装
 */
function serializeParams(params) {
  // TODO
}

/**
 * 题 3：实现 attachToken(config, getToken)
 * 题目描述：
 * - 从 getToken 中拿 token
 * - 若存在 token，则挂到请求头中
 * 来源：
 * - Day08 Token 鉴权专题
 */
function attachToken(config, getToken) {
  // TODO
}

/**
 * 题 4：实现 createRequestDeduper()
 * 要求：相同 key 的请求复用同一个 Promise
 * 题目描述：
 * - 返回一个函数 dedupe(key, requestFn)
 * - 同一时刻相同 key 的请求只发一次
 * - 请求结束后自动释放占用
 * 来源：
 * - 2026 前端高频工程化手写题
 */
function createRequestDeduper() {
  // TODO
}

export {
  createHttpClient,
  serializeParams,
  attachToken,
  createRequestDeduper,
};
