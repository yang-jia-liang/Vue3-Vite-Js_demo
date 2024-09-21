import request from '@/utils/request.js'

// 登录
export const login = (data) => {
  return request({
    url: `/teapi/V1/login`,
    data,
    method: 'POST'
  })
}

// 退出登录
export const logout = () => {
  return request({
    url: `/teapi/V1/logout`,
    method: 'POST'
  })
}

// 获取用户数据
export const getUserInfo = () => {
  return request({
    url: `/teapi/V1/me`,
    method: 'GET'
  })
}

// 获取用户权限
export const getUserPermission = () => {
  return request({
    url: `/teapi/V1/users/permissions`,
    method: 'GET'
  })
}
