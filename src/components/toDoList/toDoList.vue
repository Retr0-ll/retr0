<template>
  <div class="wrapper">
    <back></back>
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
      await this.axios.get("http://retr0home.club:8000/api").then((res) => {
        this.test = res.data;
        console.log(res);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
