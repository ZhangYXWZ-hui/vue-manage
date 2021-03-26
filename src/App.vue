<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
@import "./assets/css/main.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;
  body {
    margin: 0;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
export default {
  created(){
    this.$store.dispatch('setMenu',JSON.parse(localStorage.getItem('usermenu')))
  }
}
</script>
