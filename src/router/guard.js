import { useUserStore } from '@/stores/user.js'
import { getUrlParams, cookieUtils, storageUtils, tokenUtils } from '@/utils/common.js'
import * as commonHttp from '@/api/common.js'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

export default function (router) {
  const whiteList = ['/login'] // 允许未登录访问

  const userStore = useUserStore()

  router.beforeEach(async (to, from) => {
    const urlToken = getUrlParams().get('token')

    // 没有token，清空用户数据
    if (!tokenUtils.get() && !urlToken) {
      cookieUtils.removeAll();
      storageUtils.removeAll();
      userStore.initUser();
    }

    // 地址带token，写入地址的token
    if (urlToken) {
      // 先清空之前的用户数据
      cookieUtils.removeAll();
      storageUtils.removeAll();
      userStore.initUser();

      // 写入新的token
      tokenUtils.set(urlToken)
    }

    // 跳转白名单页面
    if (whiteList.includes(to.path)) {
      return true;
    }
    // 跳转权限页面
    else {
      // 没有权限菜单，有token，更新一次权限菜单
      if (!userStore.permission.length && tokenUtils.get()) {
        let permissionList = await commonHttp.getUserPermission()
        permissionList.push('/home', '/score_query', '/score_import', '/campus_application', '/supervision_list')

        // 有菜单权限，跳对应页面
        if (permissionList && permissionList.includes(to.path)) {
          userStore.setUserPermission(permissionList);
          return {
            ...to,
            query: {
              ...to.query,
              token: undefined
            }
          };
        }

        ElMessage.warning({ message: '没有菜单权限' });
        return false
      }
      // 没有权限菜单，没有token，回登录
      else if (!userStore.permission.length && !tokenUtils.get()) {
        return { name: 'Login' }
      }
    }
  })

  router.afterEach((to, from) => {
    // 用户信息为空，请求用户数据
    if (!Object.keys(userStore.userInfo).length && tokenUtils.get()) {
      commonHttp.getUserInfo().then(res => {
        userStore.setUserInfo(res)
      })
    }
  })
}
