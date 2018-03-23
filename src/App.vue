<template>
  <div id="app">
    <vueClock/>
  </div>
</template>

<script>
import vueClock from './components/vueClock'

export default {
  name: 'App',
  components: {
      vueClock
  }
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
