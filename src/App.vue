<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav>
      <a href="#/" class="btn btn-primary">Home</a>
      <a href="#/form" class="btn btn-primary">Create form</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  style: [
    require('bootstrap/dist/css/bootstrap.min.css')
  ]
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
