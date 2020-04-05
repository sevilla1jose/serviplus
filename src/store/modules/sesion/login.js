import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    processing: false,
    error: null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    error: state => state.error,
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
      state.processing = false,
      state.error = null
    },
    setLogout (state) {
      state.currentUser = null
      state.processing = false,
      state.error = null
    },
    setProcessing (state, payload) {
      state.processing = payload
    },
    setError (state, payload) {
      state.currentUser = null
      state.processing = false
      state.error = payload
    },
  },
  actions: {
    login ({ commit }, payload) {
      commit('setProcessing', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          firebase.firestore().collection('/user')
            .doc(user.user.uid)
            .get()
            .then(userRecord => {
              const item = {
                uid: user.user.uid,
                nombre: userRecord.data().name,
                perfil: userRecord.data().profile,
                foto: user.user.photoURL || '/assets/img/profile-pic-l.jpg'
              }
              localStorage.setItem('user', JSON.stringify(item))
              commit('setUser', {
                uid: user.user.uid,
                nombre: userRecord.data().nombres,
                foto: user.user.photoURL || '/assets/img/profile-pic-l.jpg' })
            })
        },
        err => {
          localStorage.removeItem('user')
          commit('setError', err)
        })
    },
    signOut ({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          localStorage.removeItem('user')
          commit('setLogout')
        }, _error => {})
    }
  }
}
