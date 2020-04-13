import Vue from 'vue'
import Vuex from 'vuex'
import collapseSide from './modules/collapseSide'
import tagsView from './modules/tagsView'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    collapseSide,
    tagsView
  },
  getters
})
