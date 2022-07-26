/**
 * 节流：控制流量,单位时间内事件只能触发一次，滚动条滑动
 * @param {*} fn 
 * @param {*} wait 
 * @returns 
 */
function throttle (fn, wait) {
  let timer
  return function () {
    let self = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(self, args)
      }, wait)
    }
  }
}

export default throttle