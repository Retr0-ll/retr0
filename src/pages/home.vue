<template>
  <div class="wrapper">
    <h1>Home</h1>
    <div
      class="tabs"
      @click="toUpperCase"
    >
      toUpperCase
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    toUpperCase() {
      this.$router.push("uppercase");
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
h1 {
  cursor: default;
}
.tabs {
  cursor: pointer;
  font-size: 1rem;
}
</style>