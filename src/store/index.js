import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      RefEntities: []
    },
    mutations: {
      setRefEntities(state,data) {
        if (state.RefEntities.length == 0 || data.reload){
          fetch('/.netlify/functions/fauna-refentity')
            .then((response) => {
              return response.json()
            }).then((res) => {
              state.RefEntities = res
            })
        }
      }
    },
    getters: {
      allRefEntities: state => {
        return state.RefEntities
      }
    }
  })