<template>
  <div class="wrapper">
    <back />
    <h1>ToDo List</h1>
    <h1>{{test}}</h1>
  </div>
</template>

<script>
import back from "@/utils/backBtn/back";

export default {
  name: "UpperCase",
  data() {
    return {
      test: null,
    };
  },
  props: {},
  components: {
    back,
  },
  watch: {},
  mounted() {
    this.getTest();
  },
  methods: {
    async getTest() {
      await this.axios.get("/todolist").then((res) => {
        console.log(res);
        this.test = res.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
h1 {
  cursor: default;
}
</style>
