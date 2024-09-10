export default [
  {
    path: '/score_query',
    name: 'score_query',
    component: () => import('./scoreInquiry/index.vue'),
    meta: {
      title: '成绩查询'
    }
  },
  {
    path: '/score_import',
    name: 'score_import',
    component: () => import('./scoreImport/index.vue'),
    meta: {
      title: '成绩导入'
    }
  }
]
