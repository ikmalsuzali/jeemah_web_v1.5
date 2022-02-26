import { mdiAccountCheckOutline, mdiAccountOutline, mdiAccountPlusOutline, mdiAccountRemoveOutline } from '@mdi/js'
import { ref, watch } from '@vue/composition-api'

export default function useList() {
  const listTable = ref([])

  const tableColumns = [
    { text: 'NAME', value: 'fullName' },
    { text: 'CATEGORY', value: 'role', sortable: false },
    { text: 'TYPE', value: 'currentPlan' },
    { text: 'START DATE', value: 'start_date' },
    { text: 'END DATE', value: 'end_date' },
    {
      text: 'ACTIONS',
      value: 'actions',
      align: 'center',
      sortable: false,
    },
  ]

  const searchQuery = ref('')
  const viewFilter = ref(null)
  const categoryFilter = ref(null)
  const startDateFilter = ref(null)
  const endDateFilter = ref(null)
  const loading = ref(false)
  const totalItems = ref(0)
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
  })
  const selectedRows = ref([])

  // fetch data
  // const fetchList = () => {
  //   store
  //     .dispatch('app-user/fetchUsers', {
  //       search: searchQuery.value,
  //       options: options.value,
  //       post_view_type: viewFilter.value,
  //       post_category_id: categoryFilter.value,
  //       start_date: startDateFilter.value,
  //       end_date: endDateFilter.value,
  //     })
  //     .then(response => {
  //       const { filteredData, total } = response.data

  //       listTable.value = filteredData
  //       totalItems.value = total

  //       // remove loading state
  //       loading.value = false
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  watch([searchQuery, viewFilter, categoryFilter, startDateFilter, endDateFilter, options], () => {
    loading.value = true

    // fetchList()
  })

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserTotalIcon = total => {
    if (total === 'Total Users') return { icon: mdiAccountOutline, color: 'primary' }
    if (total === 'Paid Users') return { icon: mdiAccountPlusOutline, color: 'error' }
    if (total === 'Active Users') return { icon: mdiAccountCheckOutline, color: 'success' }
    if (total === 'Pending Users') return { icon: mdiAccountRemoveOutline, color: 'warning' }

    return { icon: mdiAccountOutline, color: 'primary' }
  }

  return {
    listTable,
    tableColumns,
    searchQuery,
    viewFilter,
    categoryFilter,
    startDateFilter,
    endDateFilter,
    loading,
    options,
    totalItems,
    selectedRows,

    // fetchList,
    resolveUserTotalIcon,
  }
}
