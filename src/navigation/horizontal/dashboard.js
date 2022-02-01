// eslint-disable-next-line object-curly-newline
import { mdiChartTimelineVariant, mdiHomeOutline } from '@mdi/js'

export default [
  {
    title: 'Dashboards',
    icon: mdiHomeOutline,
    children: [
      {
        icon: mdiChartTimelineVariant,
        title: 'Analytics',
        to: 'dashboard-analytics',
      },
    ],
  },
]
