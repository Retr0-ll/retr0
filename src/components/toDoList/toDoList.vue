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
          @choose="chooseItem"
          :group="item.title"
        >
          <transition-group
            :name="!drag ? 'flip-list' : 'no'"
            mode="out-in"
          >
            <div
              class="draggable-item"
              v-for="element in item.list"
              :key="element.id"
            >
              <list-item
                :objData="element"
                @changeDrag="changeDrag"
                @changeStatus="changeStatus"
                ref="child"
              ></list-item>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div
      class="add-item"
      v-show="!disabled"
      @click="newItem"
    >添加</div>
  </div>
</template>

<script>
import back from "@/utils/backBtn/back";
import ListItem from "./listItem";
import Draggable from "vuedraggable";
import moment from "moment";
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
        ghostClass: "ghost",
        delay: 200,
        dragClass: "sortable-drag",
        chosenClass: "sortable-chosen",
      };
    },
  },
  watch: {},
  created() {
    this.getList();
    window.addEventListener("uploadData", () => {
      console.log(111);
      this.uploadDataHandler();
    });
  },
  mounted() {
    console.log(this.listData);
  },
  methods: {
    uploadDataHandler() {
      this.axios.post("/update-task-list", this.listData).then((res) => {
        console.log("post", this.listData);
      });
    },
    // 改变可拖动状态，如果有在编辑的item就不可拖动
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
    changeStatus(obj) {
      if (obj.status === "done") {
        this.listData[0].list.map((ele, index) => {
          if (ele.id === obj.id) {
            this.listData[0].list.splice(index, 1);
            this.listData[1].list.unshift(obj);
          }
        });
      } else {
        this.listData[1].list.map((ele, index) => {
          if (ele.id === obj.id) {
            this.listData[1].list.splice(index, 1);
            this.listData[0].list.unshift(obj);
          }
        });
      }
      this.$store.commit("ADD_TODOLIST_ITEM");
    },
    startDrag() {
      this.drag = true;
    },
    endDrag() {
      this.drag = false;

      this.current = "";
      this.$store.commit("ADD_TODOLIST_ITEM");
      console.log(this.listData);
    },
    chooseItem() {
      navigator.vibrate =
        navigator.vibrate ||
        navigator.webkitVibrate ||
        navigator.mozVibrate ||
        navigator.msVibrate;

      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    },
    onMoveCallback(evt, originalEvent) {
      this.currentTask = evt.draggedContext.element;
      // this.current = +evt.to.dataset.index;
    },
    async getList() {
      await this.axios.get("/get-task-list").then((res) => {
        console.log("test", res.data);
        this.test = res.data;
      });
    },
    // 添加item
    newItem() {
      let obj = {
        id: 0,
        name: "",
        desc: "",
        status: "",
        editTime: "",
        exp: {
          tag: "",
        },
      };
      obj.id = moment().valueOf();
      obj.status = "undone";
      this.listData[0].list.unshift(obj);
      setTimeout(() => {
        console.log(this.$refs.child);
        const n = this.$refs.child.length - 1;
        this.$refs.child[n].editItem();
      }, 100);
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
  min-height: 100%;
  width: 100%;
  overflow: auto;
}
h1 {
  cursor: default;
}

.ghost {
  opacity: 0;
}
.sortable-drag {
  transform: scale(1.05, 1.05);
}
.sortable-chosen {
  transform: scale(1.05, 1.05);
}

#list {
  flex: 1;
  height: 100%;
  width: 100%;
  max-width: 24em;
  padding: 2em 0;
  position: relative;
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
  .flip-list-enter, .flip-list-leave-to
/* .flip-list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(24em);
    transition: all 0.5s;
  }
  .flip-list-leave-active {
    position: absolute;
    transition: all 0.5s;
  }
}
.add-item {
  position: fixed;
  bottom: 1em;
  right: 1em;
  width: 4em;
  height: 4em;
  background-color: aquamarine;
  border-radius: 50%;
  cursor: pointer;
}
</style>
