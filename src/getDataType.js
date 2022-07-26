function getDataType (target) {
  const type = typeof target
  if (type === 'object') {
    return Object.prototype.toString.call(target).replace(/^[object (\S+)]$/, '$1').toLowerCase()
  } else {
    // 基础数据类型直接返回
    return type
  }
}

export default getDataType