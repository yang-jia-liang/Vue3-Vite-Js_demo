export default [
  {
    path: '/supervision_list',
    name: 'supervision_list',
    component: () => import('./supervisionList/index.vue'),
    meta: {
      title: '督办列表'
    },
  },
]
