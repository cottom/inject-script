export const debounce = (fn, time) => {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, time)
  }
}

export const throttle = (fn, time) => {
  let lastTimestamp = null
  return (...args) => {
    if (!lastTimestamp || lastTimestamp + time > Date.now()) {
      fn(...args)
      lastTimestamp = Date.now()
    }
  }
}
