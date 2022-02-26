const dashboard = [
  {
    path: '/admin/home',
    name: 'dashboard-home',
    component: () => import('@/views/dashboards/analytics/Analytics.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/dashboards/eCommerce',
    name: 'dashboard-eCommerce',
    component: () => import('@/views/dashboards/ecommerce/Ecommerce.vue'),
    meta: {
      layout: 'content',
    },
  },
]

export default dashboard
