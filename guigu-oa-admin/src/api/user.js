import request from '@/utils/request'
//登录相关api
export function login(data) {
  return request({
    url: '/admin/system/index/login',
    method: 'post',
    data
  })
}
//登录之后获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/system/index/info',
    method: 'get',
    params: { token }
  })
}
//退出登录
export function logout() {
  return request({
    url: '/admin/system/index/logout',
    method: 'post'
  })
}
