<template lang="html">
  <div>
    <h3>{{ msg }}</h3>
    <button class="btn btn-danger inlineBlock" v-on:click="clearObj()">Zerar campos</button>
    <button class="btn btn-primary inlineBlock" v-on:click="callModel()">Modelo padrão</button>
		<json-editor :json="json"></json-editor>
		<pre hidden>{{changeStore}}</pre>
  </div>
</template>

<script>
import jsonEditor from "../components/jsonEditor.vue"
import structDefault from "../../structDefault.json"

export default {
  name: "Form",
  data: function(){
    return {
			msg: "Formulário dinâmico JSON",
			json: {},
      store: this.$store.state.infoStore,
      structDefault: structDefault
    }
	},
	components:{
		jsonEditor: jsonEditor
	},
  computed: {
    changeStore(){
			this.store = this.$store.state.infoStore
			this.json = this.store
    }
  },
  methods: {
    clearObj() {
      this.json = {}
    },
    callModel() {
      this.json = this.structDefault
    }
  }
}
</script>

<style>
.widthDefault{
  margin: 5px auto !important;
  width: 425px;
  margin: 5px;
}
.inlineBlock {
  display: inline-block;
}
.marg5{
  margin: 5px !important;
}
.marg20{
  margin: 20px !important;
}
.textSmall{
  color: #777b7b;
}
</style>

