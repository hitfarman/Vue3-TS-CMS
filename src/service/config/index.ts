import { AxiosHeaders } from 'axios'

// export const BASE_URL = 'http://codercba.com:8000'
// export const TIME_OUT = 10000

// 2. 区分开发环境 和 生成环境方法二:
/*
  vite默认提供的环境变量
*/
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否是开发环境
// console.log(import.meta.env.PROD) // 是否是生成环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染

// 2. 代码逻辑判断, 判断当前环境,
let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生成环境
  BASE_URL = 'http://codercba.com:5000'
} else {
  // 开发环境
  BASE_URL = 'http://codercba.com:5000'
}
// console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
export const HEADERS = new AxiosHeaders({
  'Content-Type': 'application/json'
})
