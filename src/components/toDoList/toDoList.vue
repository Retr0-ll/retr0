<template>
  <div class="wrapper">
    <back />
    <h1>ToDo List</h1>
    <h1>{{test}}</h1>
    <div
      id="list"
      class="clearfix"
    >
      <div
        class="list-group"
        v-for="(item, index) in listData"
        :key="index"
      >
        <div class="list-title">{{item.title}}</div>
        <draggable
          class="draggable"
          :list="item.list"
          :group="item.title"
        >
          <transition-group
            @end="drag = false"
            @start="drag = true"
            :name="!drag ? 'flip-list' : null"
          >
            <div
              class="draggable-item"
              v-for="element in item.list"
              :key="element.id"
            >
              <list-item :objData="element"></list-item>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import back from "@/utils/backBtn/back";
import ListItem from "./listItem";
import Draggable from "vuedraggable";

export default {
  name: "UpperCase",
  data() {
    return {
      test: null,
      listData: [
        {
          title: "进行中",
          list: [
            {
              id: 1,
              name: "测试1",
            },

            {
              id: 2,
              name: "测试2",
            },

            {
              id: 3,
              name: "测试3",
            },

            {
              id: 4,
              name: "测试4",
            },
            {
              id: 5,
              name: "测试5",
            },
            {
              id: 6,
              name: "测试6",
            },
          ],
        },
        {
          title: "已完成",
          list: [],
        },
      ],
    };
  },
  props: {},
  components: {
    back,
    ListItem,
    Draggable,
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
  width: 100%;
  overflow-x: auto;
}
h1 {
  cursor: default;
}

#list {
  height: 100%;
  width: 100%;
  max-width: 24em;
  padding: 2em 0;
  .list-group {
    width: 100%;
    height: 100%;
    min-height: 10em;
  }
  .list-title {
    font-size: 1em;
    font-weight: 700;
    margin-bottom: 1em;
  }
  .draggable {
    height: 100%;
    flex: 1;
  }
  .draggable-item {
    margin-bottom: 0.5em;
    cursor: pointer;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
}
</style>
