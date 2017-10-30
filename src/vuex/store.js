import Vue from 'vue'

export default {
  state: {
    infoStore: {}
  },
  mutations: {
    updateInfoStore(state,data){
      state.infoStore = data
    }
  },
  actions: {
    callSave(context,data){
      var infoStore = {}
      Vue.http.post("api/insertform", data).then(response => {
        context.commit('updateInfoStore', infoStore)
      }, response => {
        if(response.data.returnCode == 0) {
          alert(response.data.message)
        } else if(response.data.returnCode == 1) {
          alert(response.data.message)
        } else if(response.data.returnCode == 2) {
          alert(response.data.message)
        }
      })
    },
    callStore(context,data){
      Vue.http.get("api/infoloja/" + data).then(response => {
        context.commit('updateInfoStore', response.data)
      }, response => {
        if(response.data.returnCode == 0){
          alert(response.data.message)
        } else {
          alert("ID não encontrado.")
        }
      })
    }
  }
}