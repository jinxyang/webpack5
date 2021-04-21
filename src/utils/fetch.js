import axios from 'axios'
import { message } from 'antd'

import config from 'config'

const defaultErrorMessage = '请求错误，请重试'

const http = axios.create({
  baseURL: config.API,
  timeout: 60000,
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return { data: {}, code: 1, message: defaultErrorMessage, error }
  },
)

http.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) {
      const url = window.URL.createObjectURL(response.data)
      return { data: { url }, code: 0, message: '' }
    }

    if (response.data.code) {
      const errorMessage = response.data.message || defaultErrorMessage
      message.error(errorMessage)
      return {
        data: {},
        code: response.data.code || 1,
        message: errorMessage,
      }
    }
    return {
      data: response.data.data,
      code: 0,
      message: response.data.message || '请求成功',
    }
  },
  (error) => {
    const errorMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      defaultErrorMessage

    message.error(errorMessage)
    return { data: {}, code: error.response.status, message: errorMessage }
  },
)

export default http.request
