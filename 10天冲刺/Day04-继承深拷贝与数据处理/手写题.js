/**
 * Day 4 手写题
 * 主题：深拷贝、数组、树结构、数据处理
 */

/**
 * 题 1：实现 deepClone
 * 要求：支持循环引用、Date、RegExp、Map、Set
 * 题目描述：
 * - 深拷贝任意层级对象/数组
 * - 不能只用 JSON 方案
 * - 需要正确处理循环引用和常见内置对象
 * 来源：
 * - 2026 Front End Interview Handbook Deep Clone
 * - 高频前端手写题
 */
function deepClone(value, cache = new WeakMap()) {
  // TODO
}

/**
 * 题 2：实现 flatten
 * 题目描述：
 * - 把任意层级的嵌套数组拍平成一维数组
 * 示例：
 *   flatten([1,[2,[3,4]],5]) => [1,2,3,4,5]
 * 来源：
 * - 2026 Front End Interview Handbook Flatten
 * - 高频前端手写题
 */
function flatten(arr) {
  // TODO
}

/**
 * 题 3：实现 uniqueBy(arr, key)
 * 题目描述：
 * - 对对象数组按某个字段去重
 * - key 支持字符串字段名或函数
 * 来源：
 * - 飞书《大前端面试宝典》Q96
 * - 高频数据处理题
 */
function uniqueBy(arr, key) {
  // TODO
}

/**
 * 题 4：实现 listToTree(list)
 * 要求：按 id / parentId 转树
 * 题目描述：
 * - 把平铺列表转成树结构
 * - 根节点通常满足 parentId == null
 * 来源：
 * - 高频前端数据结构手写题
 */
function listToTree(list) {
  // TODO
}

/**
 * 题 5：实现 groupBy(arr, key)
 * 题目描述：
 * - 按字段或分组函数对数组元素分组
 * - 返回一个对象，key 是分组结果
 * 来源：
 * - 2026 Front End Interview Handbook Lodash groupBy examples
 */
function groupBy(arr, key) {
  // TODO
}

export { deepClone, flatten, uniqueBy, listToTree, groupBy };
