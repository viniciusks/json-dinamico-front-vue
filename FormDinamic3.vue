<template lang="html">
  <div>
    <h3>{{ msg }}</h3>
    <div id="formTipoDado">
<!-- 
			<pre>{{ campos }}</pre>
			<pre>{{ objects }}</pre>
-->
			<div class="row" v-for="json in campos">
				<select class="form-control widthDefault inlineBlock" v-on:click="zeraDado2(json)" v-model="json.tipo">
					<option value="1">Par</option>
					<option value="2">Array</option>
					<option value="3">Object</option>
				</select>
				<div class="inlineBlock" v-if="json.tipo == '1' || json.tipo == '2'">
					<input class="form-control widthDefault inlineBlock" v-if="json.tipo == '1'" placeholder="Key..." v-model="json.key">
					<input class="form-control widthDefault inlineBlock" v-if="json.tipo == '2'" :disabled="json.disabled == 1" placeholder="Key..." v-model="json.key">
					<input class="form-control widthDefault inlineBlock" placeholder="Value..." v-model="json.value">
					<button class="marg5 btn btn-primary inlineBlock" v-if="json.disabled != 1" v-on:click="addLinha(json.tipo,json.key,json.value),desativarCampos(json)">Adicionar</button>
				</div>
				<div class="inlineBlock" v-if="json.tipo == '3'">
					<input class="form-control widthDefault inlineBlock" placeholder="Object..." v-model="json.nameObj"/>
					<button class="marg5 btn btn-primary inlineBlock" v-if="json.disabled != 1" v-on:click="addObject(json.nameObj,'1')">Adicionar Objeto</button>
				</div>
				<br>
			</div>
			<br>
			<div v-for="json in campos">
				<legend v-if="json.tipo == '3'">Objeto {{ json.nameObj }}</legend>
				<div v-if="json.tipo == '3'" v-for="campo2 in campos2">
					<select class="form-control widthDefault inlineBlock" v-on:click="zeraDado(campo2)" v-model="campo2.tipo">
						<option value="1">Par</option>
						<option value="2">Array</option>
						<option value="3">Object</option>
					</select>
					<div class="inlineBlock" v-if="campo2.tipo == '1' || campo2.tipo == '2'">
						<span class="form-control widthDefault3 inlineBlock" disabled>{{ campo2.nameObj }}</span>
					</div>
					<div class="inlineBlock" v-if="campo2.tipo == '1' || campo2.tipo == '2'">
						<input placeholder="Key..." v-model="campo2.key" v-if="campo2.tipo == '1'" class="form-control widthDefault inlineBlock">
						<input placeholder="Key..." v-model="campo2.key" v-if="campo2.tipo == '2'" :disabled="campo2.disabled == 1" class="form-control widthDefault inlineBlock">
						<input placeholder="Value..." v-model="campo2.value" class="form-control widthDefault inlineBlock">
						<button class="marg5 btn btn-primary inlineBlock" v-if="campo2.disabled != 1" v-on:click="addLinhaObject(campo2.tipo,campo2.nameObj,campo2.key,campo2.value),desativarCampos(campo2)">Adicionar</button>
						<button class="marg5 btn btn-danger inlineBlock" v-if="campo2.disabled != 1" v-on:click="sairObject(campos2)">Sair</button>
					</div>
					<div class="inlineBlock" v-if="campo2.tipo == '3'">
						<select class="form-control widthDefault inlineBlock" v-model="campo2.flag">
							<option value="0">Dentro</option>
							<option value="1">Fora</option>
						</select>
						<input placeholder="Object..." v-if="campo2.flag == '0'" v-model="campo2.nameObj2" class="form-control widthDefault inlineBlock">
						<input placeholder="Object..." v-if="campo2.flag == '1'" v-model="campo2.nameObj" class="form-control widthDefault inlineBlock">
						<button id="addNoForm" class="marg5 btn btn-primary inlineBlock" v-on:click="addObject(campo2.nameObj,campo2.flag,campo2.nameObj2)">Adicionar</button>
					</div>
				</div>
			</div>
    </div>
		<br>
		<button type="submit" class="btn btn-primary" @click="save()">Enviar</button>
  </div>
</template>

<script>

/* 
	- MANDAR PARA A API E ADICIONAR NO MONGO ||| PARCIALMENTE COMPLETO

	- FINALIZAR A LISTAGEM DO JSON ATRAVÉS DO MÉTODO, DANDO PT QUANDO LISTO TIPO 3
	DENTRO DE TIPO 3. ||| PARCIALMENTE COMPLETO

	- DEPOIS DO ALMOÇO DESABILITAR OS BOTOES DE ADICIONAR

	- DEPOIS DE TUDO:
		- AO CLICAR NO BOTAO ADICIONAR DESABILITAR A RESPECTIVA LINHA
*/

export default {
  name: "Form",
  data: function(){
    return {
			msg: "Formulário dinâmico JSON",
			campoObject: this.$store.state.jsonObject,
			objects: [],
			tipo: '1',
			nameObj:'',
			key: "",
			value: "",
			campos: [
				{
					tipo: '1',
					nameObj: '',
					flag:'0',
					key: '',
					value: '',
					disabled: 0
				}
			],
			campos2: [],
			cont: 0
    }
	},
  methods: {
		zeraDado(campo) {
			campo.key = ''
			campo.value = ''
			campo.nameObj2 = ''
		},
		zeraDado2(campo){
			campo.key = ''
			campo.value = ''
		},
		sairObject(campo){
			let index = campo.length
			campo.splice(index - 1,1)
			this.campos.push({tipo:'1',nameObj:'',flag:'0',key:'',value:''})
		},
		addObject(obj,iflag,obj2) {
			if(obj == '' || iflag == ''){
				alert("Preencha os campos do objeto primeiro.")
			}	else {
				if(iflag == '1'){
					this.objects.push({tipo:'3',nameObj:obj,flag:iflag})
					this.campos2.push({tipo:'1',nameObj:obj,flag:'0',key:'',value:''})
				} else {
					this.objects.push({tipo:'3',nameObj:obj2,nameObj2:obj,flag:iflag})
					this.campos2.push({tipo:'1',nameObj:obj2,nameObj2:obj,flag:'0',key:'',value:''})
				}
			}
		},
		newObject(type,obj,key,val) {
			if(type == '1') {
				let info = {
					tipo: type,
					nameObj: obj,
					key: key,
					value: val
				}
				this.campos2.push({tipo:'1',nameObj:obj,flag:'0',key:'',value:''})
				this.$store.dispatch('newJsonObject',info)
			} else if(type == '2'){
				let infoArray = {
					tipo: '2',
					nameObj:'',
					key: '',
					value: []
				}
				infoArray.nameObj = obj
				infoArray.key = key
				infoArray.value.push(val)
				this.campos2.push({tipo:'2',nameObj:obj,flag:'0',key:key,value:''})
				this.$store.dispatch('newJsonObject', infoArray)
			}
		},
		desativarCampos(obj){
			return obj.disabled = 1
		},
		addLinhaObject(type,obj,key,val) {
			if(type == '' || obj == '' || key == '' || val == ''){
				alert("Preencha os campos primeiro.")
			} else {
				this.newObject(type,obj,key,val)
			}
		},
		addLinha(type,key,val) {
			if(key == '' || val == ''){
				alert("Preencha os campos.")
			} else {
				if(type == '1'){
					let info = {
						tipo: type,
						key: key,
						value: val
					}
					this.$store.dispatch('newJsonPar', info)
					this.campos.push({tipo:'1',nameObj:'',flag:'0',key:'',value:''})
				} else if(type == '2') {
					let infoArray = {
						tipo: '2',
						key: '',
						value: []
					}
					infoArray.key = key
					infoArray.value.push(val)
					this.$store.dispatch('newJsonArray', infoArray)
					this.campos.push({tipo:'2',nameObj:'',flag:'0',key:infoArray.key,value:''})
				}
			}
		},
		formPar(campo, json) {
			$.each(campo, function(i,o){
				json[o.key] = o.value
			})
		},
		formArray(campo, json) {
			$.each(campo, function(i,o){
				let key = o.key
				json[key] = o.value
			})
		},
		formObject(obj,campo,json) {
			if(obj.flag == '1'){
				json[obj.nameObj] = {}
				$.each(campo,function(i,o){
					if(obj.nameObj == o.nameObj){
						json[obj.nameObj][o.key] = o.value
					}
				})
			} else {
				this.objInside(obj,campo,json)
			}
		},
		objInside(obj,campo,json){
			json[obj.nameObj2][obj.nameObj] = {}
			console.log(obj.nameObj2)
			console.log(obj.nameObj)
			/* CONTINUAR A PARTE DE RECURSÃO */
			$.each(campo,function(i,o){
				if(obj.nameObj == o.nameObj) {
					json[obj.nameObj2][obj.nameObj][o.key] = o.value
				}
			})
		},
		save() {
			let campoPar = this.$store.state.jsonPar
			let campoArray = this.$store.state.jsonArray
			let campoObject = this.$store.state.jsonObject

			var json = {}

			if(campoPar.length != 0) {
				this.formPar(campoPar, json)
			}

			if(campoArray.length != 0) {
				this.formArray(campoArray, json)
			}

			if(campoObject.length != 0) {
				for(let i = 0; i < this.objects.length; i++){
					this.formObject(this.objects[i],campoObject, json)
				}
			}

			console.log(json)
		}
	}
}
</script>

<style>
.inlineBlock{
  display: inline-block;
}
.widthDefault{
  margin: 5px auto !important;
  width: 250px;
  margin: 5px;
}
.widthDefault2{
  margin: 5px !important;
  width: 250px;
  margin: 5px;
}
.widthDefault3{
  margin: 5px auto !important;
	width: 100px;
	margin: 5px;
}
.widthDivForm{
  width: 542px;
}
.floatLeft{
  float: left;
}
.pad5{
	padding: 14px 40px;
}
.marg5{
  margin: 5px !important;
}
.margHor5{
  margin: 0px 5px;
}
.margHor15{
  margin: 0px 15px !important;
}
.margLeft100{
	margin-left: 112px;
}
.div-hr{
	width: 760px;
}
</style>

