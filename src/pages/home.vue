<template>
  <div class="wrapper">
    <h1>Home</h1>
    <div class="tabs-wrapper">
      <div
        class="tabs"
        @click="toUpperCase"
      >
        toUpperCase
      </div>
      <div
        class="tabs"
        @click="toDoList"
      >
        ToDo List
      </div>
      <div
        class="tabs"
        @click="px2PX"
      >
        px2PX
      </div>
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
    toDoList() {
      this.$router.push("todolist");
    },
    px2PX() {
      this.$router.push("px2PX");
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  cursor: default;
}
.tabs-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 25em;
}
.tabs {
  display: flex;
  cursor: pointer;
  font-size: 1.2em;
  width: 8em;
  height: 2em;
  border-radius: 0.5em;
  transition: all 0.5s;
  margin: 0.5em 1em;
  justify-content: center;
  align-items: center;
}
.tabs:hover {
  background-color: rgb(241, 241, 241);
  color: #598bb9;
}
</style>