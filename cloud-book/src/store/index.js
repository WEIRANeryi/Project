import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from '../utils/index'
import api from '../utils/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userData: {},
    readList: {},
  },
  mutations: {
    'CHANGE_USERDATA'(state, userData) {
      state.userData = userData;
    },
    'CHANGE_READLIST'(state,readList) {
      state.readList = readList;
    }
  },
  actions: {
    getUserData(context) {
      fetch.get(api.getUser).then(res => {
        context.commit('CHANGE_USERDATA',res.data)
      })
    },
    getReadList(context) {
      fetch.get(api.getRead).then(res => {
        context.commit('CHANGE_READLIST',res.data)
      })
    }
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem(key),
      setItem: (key,value) => sessionStorage.setItem(key,value),
      removeItem: key => sessionStorage.removeItem(key)
    }
  })]
})

export default store
