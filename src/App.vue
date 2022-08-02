<template>
  <div id="app">
    <!-- <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html {
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
