const initRouteModules = () => {
  // vite提供的批量导入文件方法，导入模块路由
  // { eager: true }：同步的方式加载文件
  const routeModules = import.meta.glob('./subPages/route.js', { eager: true })

  const routes = Object.keys(routeModules).map((path) => {
    const routeModule = routeModules[path]
    return routeModule.default
  })

  return routes.flat()
}

// 等待模块路由初始化完成
const routes = initRouteModules()

export default [
  {
    path: '/myWorkbench',
    name: 'MyWorkbench',
    component: () => import('./index.vue'),
    meta: {
      title: '我的工作台'
    },
    children: routes
  }
]
