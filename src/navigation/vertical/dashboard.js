import { mdiHomeOutline } from '@mdi/js'

export default [
  {
    title: 'Dashboards',
    icon: mdiHomeOutline,
    badge: '3',
    badgeColor: 'warning',
    children: [
      {
        title: 'Home',
        to: 'dashboard-analytics',
      },
    ],
  },
]
