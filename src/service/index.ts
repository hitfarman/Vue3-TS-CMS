import { localCache } from '@/utils/cache'
import { BASE_URL, HEADERS, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: HEADERS,
  interceptors: {
    requestSuccessFn: (config) => {
      // 到这个baseURL的每个请求都携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default hyRequest
