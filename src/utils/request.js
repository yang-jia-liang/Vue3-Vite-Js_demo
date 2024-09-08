import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-loading.css'

import { tokenUtils, dataUtils } from '@/utils/common.js'

const STATUS_SUCCESS = '0000' // 成功
const STATUS_SESSION_EXPIRED = '1002' // 会话过期
const ERROR_DEFAULT_MSG = '请求失败'

if (process.env.NODE_ENV === 'development') {
  window.$ctx = 'http://192.168.2.51:4080/teapi/V1'
}

const baseURL = window.$ctx

// loading
let loadingService
let requestNums = 0 // 请求数
const openLoading = () => {
  if (requestNums === 0) {
    loadingService = ElLoading.service({
      lock: true,
      background: 'transparent',
      customClass: 'global-request-loading' // 全局请求loading的类名
    })
  }

  requestNums++
}
const closeLoading = () => {
  if (requestNums <= 0) return

  requestNums--

  if (requestNums === 0) {
    loadingService.close()
  }
}

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 60000,
    responseType: 'json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = tokenUtils.get()
    const TOKEN_KEY = tokenUtils.TOKEN_KEY

    const Authorization = token ? `${TOKEN_KEY} ${token}` : undefined
    const XCSRFTOKE =
      process.env.NODE_ENV === 'development'
        ? 'QXL-CSRF-TOKEN'
        : dataUtils.encrypt(`qinglu+${Date.now()}+${Math.random()}`)

    // 请求头设置
    config.headers = {
      ...config.headers,
      Authorization,
      'X-CSRF-TOKEN': XCSRFTOKE
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const request = function (config) {
  const loading = config.loading ?? true
  const closeError = config.closeError ?? false
  loading && openLoading()

  return new Promise((resolve, reject) => {
    instance
      .request(config)
      .then((res) => {
        loading && closeLoading()

        try {
          const ret = transformRequestData(res)
          resolve(ret)
        } catch (err) {
          if (!closeError) {
            ElMessage.closeAll()
            ElMessage.error({ message: err.message })
          }

          reject(err)
        }
      })
      .catch((e) => {
        loading && closeLoading()

        if (axios.isAxiosError(e) && !closeError) {
          ElMessage.closeAll()
          ElMessage.error({ message: ERROR_DEFAULT_MSG })
        }

        reject(e)
      })
  })
}

function transformRequestData(res) {
  const { data } = res

  if (!data) throw new Error()

  // 请求的是数据流
  if (data instanceof Blob) {
    return res
  }

  const { result, message, code } = data

  // 请求成功
  if (code === STATUS_SUCCESS) {
    return result
  }
  // 会话过期
  else if (code === STATUS_SESSION_EXPIRED) {
    tokenUtils.clear()
    location.href = `/login`
    throw new Error(message)
  } else {
    ElMessage.error({ message: message || ERROR_DEFAULT_MSG })
    throw new Error(message || ERROR_DEFAULT_MSG)
  }
}

export default request
