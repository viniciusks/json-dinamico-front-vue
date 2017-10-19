import Vue from 'vue'

export default {
  state: {
    jsonPar: [],
    jsonArray: [],
    jsonObject: []
  },
  mutations: {
    setJsonPar (state, data) {
      state.jsonPar.push(data)
    },
    setJsonArray (state, data) {
      let bool = false
      if(state.jsonArray.length == 0) {
        state.jsonArray.push(data)
      } else {
        for(let i = 0; i < state.jsonArray.length; i++){
          let temp = state.jsonArray[i].key
          if(temp == data.key){
            bool = true
            break
          }
        }
        if(bool == true){
          for(let i = 0; i < state.jsonArray.length; i++){
            if(state.jsonArray[i].key == data.key){
              state.jsonArray[i].value.push(data.value[0])
            }
          }
        } else {
          state.jsonArray.push(data)
        }
      }
    },
    setJsonObject (state, data) {
      let bool = false
      if(data.tipo == '1'){
        state.jsonObject.push(data)
      } else if(data.tipo == '2'){
        if(state.jsonObject.length == 0){
          state.jsonObject.push(data)
        } else {
          for(let i = 0; i < state.jsonObject.length; i++){
            let temp = state.jsonObject[i].key
            if(temp == data.key){
              bool = true
              break
            }
          }
          if(bool == true){
            for(let i = 0; i < state.jsonObject.length; i++){
              if(state.jsonObject[i].key == data.key){
                state.jsonObject[i].value.push(data.value[0])
              }
            }
          } else {
            state.jsonObject.push(data)
          }
        }
      }
    }
  },
  actions: {
    newJsonPar (context, data) {
      context.commit('setJsonPar', data)
    },
    newJsonArray (context, data) {
      context.commit('setJsonArray', data)
    },
    newJsonObject (context, data) {
      context.commit('setJsonObject', data)
    }
    //Vue.http.post("api/insertform")
  }
}