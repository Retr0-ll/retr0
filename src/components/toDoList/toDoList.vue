<template>
  <div class="wrapper">
    <back />
    <h1>ToDo List</h1>
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
          :class="{active:current===index}"
          :data-index="index"
          :move="onMoveCallback"
          :disabled="disabled"
          :list="item.list"
          v-bind="dragOptions"
          @end="endDrag"
          @start="startDrag"
          :group="item.title"
        >
          <transition-group :name="!drag ? 'flip-list' : null">
            <div
              class="draggable-item"
              v-for="element in item.list"
              :key="element.id"
            >
              <list-item
                :objData="element"
                @changeDrag="changeDrag"
              ></list-item>
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
import { mapGetters } from "vuex";

export default {
  name: "UpperCase",
  data() {
    return {
      test: null,
      current: "",
      drag: false,
      currentTask: "",
      disabled: false,
      stakeDeep: 0,
      // listData: [
      //   {
      //     title: "进行中",
      //     list: [
      //       {
      //         id: 1,
      //         name: "测试1",
      //       },

      //       {
      //         id: 2,
      //         name: "测试2",
      //       },

      //       {
      //         id: 3,
      //         name: "测试3",
      //       },

      //       {
      //         id: 4,
      //         name: "测试4",
      //       },
      //       {
      //         id: 5,
      //         name: "测试5",
      //       },
      //       {
      //         id: 6,
      //         name: "测试6",
      //       },
      //       {
      //         id: 7,
      //         name: "测试7",
      //         desc: "",
      //         timeStamp: "",
      //         exp: {
      //           tag: "",
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     title: "已完成",
      //     list: [],
      //   },
      // ],
    };
  },
  props: {},
  components: {
    back,
    ListItem,
    Draggable,
  },
  computed: {
    ...mapGetters({
      listData: "getTodoData",
    }),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        ghostClass: "ghost",
        delay: 200,
      };
    },
  },
  watch: {},
  mounted() {
    console.log(this.todoList);
    // this.getTest();
  },
  methods: {
    changeDrag(val) {
      if (val) {
        this.stakeDeep += 1;
      } else {
        this.stakeDeep -= 1;
      }
      if (this.stakeDeep) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    startDrag() {
      this.drag = true;
    },
    endDrag() {
      this.drag = false;

      this.current = "";
      this.$store.commit("ADD_TODOLIST_ITEM");
    },
    onMoveCallback(evt, originalEvent) {
      this.currentTask = evt.draggedContext.element;
      // this.current = +evt.to.dataset.index;
    },
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

.sortable-chosen {
  transform: scale(1.05, 1.05);
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
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
}
</style>
