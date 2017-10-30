<template>
  <div>
    <input class="form-control widthDefault inlineBlock" v-model="storeID" placeholder="Qual ID procura?">
		<button class="btn btn-primary inlineBlock" v-on:click="callStore(storeID)">Buscar</button>
    <div ref="jsoneditor" class="divJson"></div>
    <small class="textSmall">*Certifique-se de que o campo do ID foi inserido/preenchido corretamente antes de enviar.</small><br>
		<button class="btn btn-primary marg5" v-on:click="callSave()">Enviar</button>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor/dist/jsoneditor-minimalist.js'
import 'jsoneditor/dist/jsoneditor.min.css'
import _ from 'lodash'

export default {
  name: 'json-editor',
  data: function () {
    return {
      editor: null,
      storeID: ""
    }
  },
  props: {
    json: {
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    onChange: {
      type: Function
    }
  },
  watch: {
    json: {
      handler (newJson) {
        if (this.editor) {
          this.editor.set(newJson)
        }
      },
      deep: true
    }
  },
  methods: {
    _onChange (e) {
      if (this.onChange && this.editor) {
        this.onChange(this.editor.get())
      }
    },
    get() {
      return this.editor.get()
    },
    callSave(){
      var json = this.get()
      this.$store.dispatch('callSave',json).then(() => {
        this.editor.set(this.json)
        this.storeID = ""
      })
    },
    callStore(store){
      this.$store.dispatch('callStore',store).then(() => {
        this.storeID = ""
      })
    }
  },
  mounted: function () {
    const container = this.$refs.jsoneditor
    const options = _.extend({
      onChange: this._onChange
    }, this.options)
    this.editor = new JSONEditor(container, options)
    this.editor.set(this.json)
  },
  beforeDestroy: function () {
    if (this.editor) {
      this.editor.destroy()
      this.editor = null
    }
  }
}
</script>

<style>
.divJson{
  width: 500px;
  height: 500px;
  margin: 5px auto;
}
</style>