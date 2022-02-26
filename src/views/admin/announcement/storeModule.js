import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    addImages(ctx, formData) {
      return new Promise((resolve, reject) => {
        console.log('add images')
        axios
          .post('upload/images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // fetchUsers(ctx, queryParams) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get('/apps/user/users', { params: queryParams })
    //       .then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },
    // fetchUser(ctx, { id }) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(`/apps/user/users/${id}`)
    //       .then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },
    // addUser(ctx, userData) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post('/apps/user/users', { user: userData })
    //       .then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },
  },
}
