/**
 * 
 * @param {*} target 
 * @returns 
 */
const isComplexDataType = (target) => (typeof target === 'object' || typeof target === 'function') && (target !== null)
const deepClone = function (target, map = new WeakMap()) {
  // 不是复杂数据类型直接返回
  if (!isComplexDataType(target)) return target
  // 日期对象直接返回一个新的日期对象
  if (target.constructor === Date) return new Date(target)
  // 正则对象直接返回正则
  if (target.constructor === RegExp) return new RegExp(target)
  // 如果循环引用了就用map解决
  if (map.has(target)) return map.get(target)
  let ret = {}
  map.set(target, map)
  for (const key of target) {
    ret[key] = (isComplexDataType(target[key]) && typeof target[key] !== 'function') ? deepClone(target[key], map) : target[key]
  }
  return ret
}

export default deepClone