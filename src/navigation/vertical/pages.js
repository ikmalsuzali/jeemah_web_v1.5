import { mdiCalendarOutline, mdiCogOutline, mdiHomeOutline, mdiMessageTextOutline, mdiPostOutline } from '@mdi/js'

export default [
  {
    title: 'Home',
    icon: mdiHomeOutline,
    to: 'dashboard-analytics',
  },
  {
    title: 'Announcements',
    icon: mdiPostOutline,
    to: 'apps-users-list',
  },
  {
    title: 'Useful Contact No',
    icon: mdiPostOutline,
    to: 'apps-users-list',
  },
  {
    title: 'Bookings',
    icon: mdiCalendarOutline,
    to: 'apps-calendar',
  },
  {
    title: 'Chats',
    icon: mdiMessageTextOutline,
    to: 'apps-chat',
  },
  {
    title: 'Masjids',
    icon: mdiMessageTextOutline,
    to: 'apps-user-list',
  },
  {
    title: 'Users',
    icon: mdiMessageTextOutline,
    to: 'apps-user-list',
  },
  {
    title: 'Settings',
    icon: mdiCogOutline,
    to: { name: 'apps-user-view', params: { id: 21 } },
  },
]
