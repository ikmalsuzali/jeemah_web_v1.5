/* eslint-disable import/order */
/* eslint-disable import/order */
<template>
  <div id="user-list">
    <!-- app drawer -->
    <detail
      v-model="isSidebarActive"
    ></detail>

    <!-- list filters -->
    <v-card>
      <v-card-title>
        Announcement
      </v-card-title>

      <!-- actions -->
      <v-card-text class="d-flex align-center flex-wrap pb-0">
        <!-- search -->
        <v-text-field
          v-model="searchQuery"
          placeholder="Search"
          outlined
          hide-details
          dense
          class="user-search me-3 mb-4"
        >
        </v-text-field>

        <v-spacer></v-spacer>

        <div class="d-flex align-center flex-wrap">
          <v-btn
            color="primary"
            class="mb-4 me-3"
            @click.stop="isSidebarActive = !isSidebarActive"
          >
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Create</span>
          </v-btn>

          <v-btn
            color="secondary"
            outlined
            class="mb-4"
          >
            <v-icon
              size="17"
              class="me-1"
            >
              {{ icons.mdiExportVariant }}
            </v-icon>
            <span>Export</span>
          </v-btn>
        </div>
      </v-card-text>

      <!-- table -->
      <v-data-table
        v-model="selectedRows"
        :headers="tableColumns"
        :items="items"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
      >
        <!-- name -->
        <template #[`item.fullName`]="{item}">
          <div class="d-flex align-center">
            <v-avatar
              :color="item.avatar ? '' : 'primary'"
              :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
              size="32"
            >
              <v-img
                v-if="item.avatar"
                :src="require(`@/assets/images/avatars/${item.avatar}`)"
              ></v-img>
              <span
                v-else
                class="font-weight-medium"
              >{{ avatarText(item.fullName) }}</span>
            </v-avatar>

            <div class="d-flex flex-column ms-3">
              <router-link
                :to="{ name : 'apps-user-view', params : { id : item.id } }"
                class="text--primary font-weight-semibold text-truncate cursor-pointer text-decoration-none"
              >
                {{ item.fullName }}
              </router-link>
              <small>@{{ item.username }}</small>
            </div>
          </div>
        </template>

        <!-- role -->
        <template #[`item.role`]="{item}">
          <div class="d-flex align-center">
            <v-avatar
              size="30"
              :color="resolveUserRoleVariant(item.role)"
              :class="`v-avatar-light-bg ${resolveUserRoleVariant(item.role)}--text me-3`"
            >
              <v-icon
                size="18"
                :color="resolveUserRoleVariant(item.role)"
              >
                {{ resolveUserRoleIcon(item.role) }}
              </v-icon>
            </v-avatar>
            <span class="text-capitalize">{{ item.role }}</span>
          </div>
        </template>

        <!-- plan -->
        <template #[`item.currentPlan`]="{item}">
          <span class="text-capitalize font-weight-semibold text--primary">{{ item.currentPlan }}</span>
        </template>

        <!-- status -->
        <template #[`item.status`]="{item}">
          <v-chip
            small
            :color="resolveUserStatusVariant(item.status)"
            :class="`${resolveUserStatusVariant(item.status)}--text`"
            class="v-chip-light-bg font-weight-semibold text-capitalize"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <!-- actions -->
        <template #[`item.actions`]="{item}">
          <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                :to="{name:'apps-user-view',params:{id:item.id}}"
              >
                <v-list-item-title>
                  <v-icon
                    size="20"
                    class="me-2"
                  >
                    {{ icons.mdiFileDocumentOutline }}
                  </v-icon>
                  <span>Details</span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item link>
                <v-list-item-title>
                  <v-icon
                    size="20"
                    class="me-2"
                  >
                    {{ icons.mdiDeleteOutline }}
                  </v-icon>
                  <span>Delete</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
// sidebar
import store from '@/store'
import { avatarText } from '@core/utils/filter'
import {
  mdiAccountOutline,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiExportVariant,
  mdiFileDocumentOutline,
  mdiPlus,
  mdiSquareEditOutline,
} from '@mdi/js'
import { onUnmounted, ref } from '@vue/composition-api'
import Detail from './Detail.vue'
import storeModule from './storeModule'
import useList from './useList'

export default {
  components: {
    Detail,
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'admin-announcement'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, storeModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const {
      items,
      tableColumns,
      searchQuery,
      roleFilter,
      planFilter,
      statusFilter,
      loading,
      options,
      selectedRows,
      totalItems,
      fetchList,
      resolveUserTotalIcon,
    } = useList()

    const isSidebarActive = ref(false)

    return {
      items,
      tableColumns,
      searchQuery,
      roleFilter,
      planFilter,
      statusFilter,
      loading,
      options,
      isSidebarActive,
      selectedRows,
      totalItems,
      avatarText,
      resolveUserTotalIcon,
      fetchList,

      // icons
      icons: {
        mdiSquareEditOutline,
        mdiFileDocumentOutline,
        mdiDotsVertical,
        mdiDeleteOutline,
        mdiPlus,
        mdiExportVariant,
        mdiAccountOutline,
      },
    }
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/apps/user.scss';
</style>
