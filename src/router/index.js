import { createRouter, createWebHistory } from 'vue-router'
const initRouteModules = async () => {
  // vite提供的批量导入文件方法，导入模块路由
  // 需要在应用加载时就预先加载所有匹配到的模块，以便加快应用的启动速度{ eager: true }，可能导致初始加载慢，按需开启
  const routeModules = import.meta.glob('../views/*/routes.js', { eager: false })

  const routes = await Promise.all(
    Object.keys(routeModules).map(async (path) => {
      const routeModule = await routeModules[path]()
      return routeModule.default
    })
  )

  return routes.flat()
}

// 初始化模块路由
const moduleRoutes = initRouteModules()

// 等待模块路由初始化完成
const routes = await moduleRoutes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
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
