// 获取数据

import http from './fetch';


export const login = (params) => http.postParam('/admin/login', params);       // 登录接口

export const getUserLoginState = (params) => http.postParam('/admin/currentUser', params);      // 获取用户登录状态接口

export const getHomeNum = (params) => http.postParam('/user/statistics', params);      // 获取首页数据接口

export const getUserList = (params) => http.postParam('/user/list', params);       // 获取用户列表接口

export const changeUserInfo = (params) => http.postParam('/user/update', params);       // 修改用户信息接口

export const deleteUser = (params) => http.post('/user/batchDelete', params);       // 删除接口

export const checkeUser = (params) => http.post('/user/batchUpdateStatus', params);       // 审核接口

export const userDetail = (params) => http.postParam('/user/get', params);       // 获取用户列表接口










