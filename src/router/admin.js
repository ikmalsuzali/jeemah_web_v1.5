const admin = [
  {
    path: '/admin/home',
    name: 'admin-dashboard-home',
    component: () => import('@/views/dashboards/analytics/Analytics.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/admin/announcement',
    name: 'admin-announcement-list',
    component: () => import('@/views/admin/announcement/List.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/admin/useful-contact-no',
    name: 'admin-useful-contact-no-list',
    component: () => import('@/views/pages/admin/useful-contact.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/admin/organizational-chart',
    name: 'admin-organizational-chart-list',
    component: () => import('@/views/pages/admin/organizational-chart.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/admin/booking',
    name: 'admin-booking-list',
    component: () => import('@/views/pages/admin/booking.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/admin/masjid',
    name: 'admin-masjid-list',
    component: () => import('@/views/pages/admin/booking.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/admin/user',
    name: 'admin-user-list',
    component: () => import('@/views/apps/user/user-list/UserList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/apps/invoice/edit/:id',
    name: 'apps-invoice-edit',
    component: () => import('@/views/apps/invoice/invoice-edit/InvoiceEdit.vue'),
    meta: {
      layout: 'content',
    },
  },
]

export default admin
