<template>
  <v-navigation-drawer
    :value="isSidebarActive"
    temporary
    touchless
    :right="!$vuetify.rtl"
    :width="$vuetify.breakpoint.smAndUp ? 600 : '100%'"
    app
    @input="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <v-card height="100%">
      <div
        class="drawer-header d-flex align-center mb-4"
      >
        <span class="font-weight-semibold text-base text--primary">Announcement</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          @click="$emit('update:is-add-new-user-sidebar-active',false)"
        >
          <v-icon size="22">
            {{ icons.mdiClose }}
          </v-icon>
        </v-btn>
      </div>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="onSubmit"
        >
          <v-carousel
            v-if="data.post_images.length"
            cycle
            height="200"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(slide, i) in data.post_images"
              :key="i"
            >
              <v-img
                :src="`http://localhost:3000/uploads/${slide.filename}`"
              >
                <v-btn
                  class="ma-4"
                  dense
                  color="error"
                  @click="onPostImageDelete(i)"
                >
                  <v-icon dark>
                    {{ icons.mdiTrashCan }}
                  </v-icon>
                </v-btn>
              </v-img>
            </v-carousel-item>
          </v-carousel>
          <v-btn
            block
            dense
            color="primary"
            class="mb-6"
            @click="onFileInputClick"
          >
            File Input
            <v-icon dark>
              {{ icons.mdiUpload }}
            </v-icon>
          </v-btn>

          <v-file-input
            v-show="false"
            id="myFileInput"
            ref="myFileInput"
            v-model="images"
            counter
            multiple
            dense
            placeholder="Select your files"
            prepend-icon=""
            outlined
            :show-size="1000"
            @change="onFileChange"
          >
          </v-file-input>
          <v-select
            v-model="data.category_id"
            :items="categories"
            label="Category"
            outlined
            dense
          >
            <template v-slot:append-item>
              <v-divider class="mb-2"></v-divider>
              <v-list-item disabled>
                <v-list-item-avatar color="grey lighten-3">
                  <v-icon size="22">
                    {{ icons.mdiPlus }}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    Add new category
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
          <v-text-field
            v-model="data.name"
            outlined
            dense
            :rules="[validators.required]"
            label="Name"
            placeholder="John Doe"
            hide-details="auto"
            class="mb-6"
          ></v-text-field>

          <v-row>
            <v-col>
              <v-menu
                id="start-date-menu"
                ref="menu"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="data.start_date"
                    label="Start Date"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="data.start_date"
                  no-title
                  scrollable
                />
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                id="end-date-menu"
                ref="end-date-menu"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                nudge-left="78"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="data.end_date"
                    label="End Date"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="data.end_date"
                  no-title
                  scrollable
                />
              </v-menu>
            </v-col>
          </v-row>
          <quill-editor
            ref="myQuillEditor"
            v-model="data.description"
            class="mb-5 rounded h-100"
            :options="editorOptions"
          />
          <v-btn
            color="primary"
            class="me-3"
            type="submit"
          >
            Save
          </v-btn>
          <v-btn
            color="secondary"
            outlined
            type="reset"
            @click="resetData"
          >
            Cancel
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import store from '@/store'
import { emailValidator, required } from '@core/utils/validation'
import { mdiClose, mdiPlus, mdiTrashCan, mdiUpload } from '@mdi/js'
import { ref, unref } from '@vue/composition-api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor,
  },
  model: {
    prop: 'isSidebarActive',
    event: 'update:is-sidebar-active',
  },
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const blankData = {
      name: '',
      description: '',
      post_base_category: '',
      post_view_type: '',
      post_category_id: '',
      start_date: '',
      end_date: '',
      post_images: [],
      post_attachments: [],
      booking_id: '',
      project_id: '',
    }

    const menu = ref(null)
    const myFileInput = ref({ name: '' })
    const images = ref([])
    const postImages = ref([])
    const categories = ref([])
    const editorOptions = ref(JSON.parse(JSON.stringify({})))

    const valid = ref(false)
    const form = ref(null)

    const validate = () => {
      form.value.validate()
    }

    const onFileInputClick = () => {
      const fileInput = document.getElementById('myFileInput')
      if (fileInput) {
        fileInput.click()
      }
    }

    const onCloseModal = modalId => {
      console.log(menu.value)
      menu.value.activateMenu()
      const modal = document.getElementById(modalId)
      console.log(modal)
      modal.showCalendar()
    }

    const resetForm = () => {
      form.value.reset()
    }

    let data = ref(JSON.parse(JSON.stringify(blankData)))
    const resetData = () => {
      data.value = JSON.parse(JSON.stringify(blankData))
      resetForm()
      emit('update:is-sidebar-active', false)
    }

    const onPostImageDelete = index => {
      data = unref(data)
      data.post_images.splice(index, 1)
    }

    const onSaveData = (key, value) => {
      console.log(key, value)
      data = unref(data)
      data[key] = value
    }

    const onFileChange = files => {
      if (!files.length) return
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })
      store.dispatch('admin-announcement/addImages', formData).then(imageData => {
        imageData.data.forEach(image => {
          data = unref(data)
          data.post_images.push(image)
          data = ref(data)
        })
      })
    }

    const onSubmit = () => {
      if (valid.value) {
        store.dispatch('admin-announcement/addUser', data.value).then(() => {
          emit('refetch-data')
          emit('update:is-sidebar-active', false)
        })

        resetData()
      } else {
        validate()
      }
    }

    return {
      resetData,
      form,
      onSubmit,
      data,
      valid,
      validate,
      images,
      postImages,
      categories,
      myFileInput,
      onFileChange,
      onFileInputClick,
      onPostImageDelete,
      onSaveData,
      onCloseModal,
      editorOptions,
      menu,

      // validation
      validators: { required, emailValidator },
      icons: {
        mdiClose,
        mdiPlus,
        mdiUpload,
        mdiTrashCan,
      },
    }
  },
}
</script>

<style lang="css">
.ql-toolbar {
  border-color: rgba(94, 86, 105, 0.77);
  border-radius: 4px 0px 4px 0px;
}

.ql-container {
  border-color: rgba(94, 86, 105, 0.77);
  border-radius: 0px 4px 0px 4px;
  border-top-style: none;
  height: 300px;
}
</style>
