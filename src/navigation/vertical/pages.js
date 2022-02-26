import { mdiCalendarOutline, mdiCogOutline, mdiHomeOutline, mdiMessageTextOutline, mdiPostOutline } from '@mdi/js'

export default [
  {
    title: 'Home',
    icon: mdiHomeOutline,
    to: 'admin-dashboard-home',
  },
  {
    title: 'Announcements',
    icon: mdiPostOutline,
    to: 'admin-announcement-list',
  },
  {
    title: 'Useful Contact No',
    icon: mdiPostOutline,
    to: 'admin-useful-contact-no-list',
  },
  {
    title: 'Bookings',
    icon: mdiCalendarOutline,
    to: 'admin-booking-list',
  },
  {
    title: 'Organizational Chart',
    icon: mdiCalendarOutline,
    to: 'admin-organizational-chart-list',
  },
  {
    title: 'Chats',
    icon: mdiMessageTextOutline,
    to: 'apps-chat',
  },
  {
    title: 'Masjids',
    icon: mdiMessageTextOutline,
    to: 'admin-masjid-list',
  },
  {
    title: 'Users',
    icon: mdiMessageTextOutline,
    to: 'admin-user-list',
  },
  {
    title: 'Settings',
    icon: mdiCogOutline,
    to: { name: 'apps-user-view', params: { id: 21 } },
  },
]
