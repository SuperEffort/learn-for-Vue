import axios from 'axios'

const getToken = () => localStorage.getItem('S-Token')

// 刷新 access_token 的接口
const refreshToken = () => instance.get('/resultToken', { headers: { PASS: localStorage.getItem('L-Token') } }, false)

// 创建 axios 实例
const instance = axios.create({
    baseURL: '//127.0.0.1:4000',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.setToken = (token) => {
    instance.defaults.headers.Authorization = token
    window.localStorage.setItem('S-Token', token)
}

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
instance.interceptors.response.use((response) => {
    const { returnCode } = response.data
    const { config } = response
    if (returnCode === 104) {
        if (!isRefreshing) {
            isRefreshing = true
            return refreshToken().then((res) => {
                if (res.data.returnCode === 400) {
                    console.log('抱歉，您的登录状态已失效，请重新登录！')
                    return
                }
                const { accessToken } = res.data
                instance.setToken(accessToken)
                config.headers.Authorization = accessToken
                // token 刷新后将数组的方法重新执行
                requests.forEach((cb) => cb(accessToken))
                requests = [] // 重新请求完清空
                return instance(config)
            }).catch((err) => {
                console.log('抱歉，您的登录状态已失效，请重新登录！')
                return Promise.reject(err)
            }).finally(() => {
                isRefreshing = false
            })
        } else {
            // 返回未执行 resolve 的 Promise
            return new Promise((resolve) => {
                // 用函数形式将 resolve 存入，等待刷新后再执行
                requests.push((token) => {
                    config.headers.Authorization = token
                    resolve(instance(config))
                })
            })
        }
    }
    return response
}, (error) => Promise.reject(error))

// 给请求头添加 access_token
const setHeaderToken = (isNeedToken) => {
    const accessToken = isNeedToken ? getToken() : null
    if (isNeedToken) { // api 请求需要携带 access_token
        if (!accessToken) {
            console.log('不存在 access_token 则跳转回登录页')
        }
        instance.defaults.headers.common.Authorization = accessToken
    }
}

// 有些 api 并不需要用户授权使用，则不携带 access_token；默认不携带，需要传则设置第三个参数为 true
export const get = (url, params = {}, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance({
        method: 'get',
        url,
        params
    })
}

export const post = (url, params = {}, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance({
        method: 'post',
        url,
        data: params
    })
}

export default instance
