<template>
  <div>
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
.tabs {
  cursor: pointer;
  font-size: 1rem;
}
</style>