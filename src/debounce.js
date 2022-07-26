/**
 * 防抖 ，单位时间内事件触发会重置。防抖可以比作等电梯，只要有一个人进来就要等一会儿，输入框事件
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
function debounce (fn, delay = 1500) {
  return function () {
    let timer = null
    const self = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setInterval(() => {
      fn.apply(self, ...args)
    }, delay)
  }
}

export default debounce