import { createRouter, createWebHistory } from 'vue-router'

// 初始化模块路由
const initRouteModules = () => {
  // vite提供的批量导入文件方法，导入模块路由
  // { eager: true }：同步的方式加载文件
  const routeModules = import.meta.glob('../views/*/routes.js', { eager: true })

  const routes = Object.keys(routeModules).map((path) => {
    const routeModule = routeModules[path]
    return routeModule.default
  })

  return routes.flat()
}

// 等待模块路由初始化完成
const routes = initRouteModules()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/home/index.vue')
    },

    // 添加模块路由
    ...routes
  ]
})

export default router
