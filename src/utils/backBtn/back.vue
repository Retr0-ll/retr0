<template>
  <div
    class="back-wrapper"
    @click="goBack"
  >
    <img
      src="./assets/back.png"
      alt=""
      class="back-img"
    >
  </div>
</template>

<script>
export default {
  name: "Back",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back-wrapper {
  position: absolute;
  cursor: pointer;
  left: 20px;
  top: 20px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-img {
  width: 25px;
  height: 25px;
}
</style>