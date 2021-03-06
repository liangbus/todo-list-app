/**
 * 函数节流
 * @param fn 节流执行的目标 Function
 * @param delay 节流时间
 * @param context 执行上下文
 */
 const throttle = (fn: Function, delay: number, context: Object): any => {
  let lastTime = 0
  return function() {
    const now = new Date().getTime()
    if(now - lastTime > delay) {
      fn.call(context)
      lastTime = now
    }
  }
}

export default throttle