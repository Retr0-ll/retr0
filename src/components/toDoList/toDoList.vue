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
  mounted() {
    console.log(this.listData);
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
</style>
