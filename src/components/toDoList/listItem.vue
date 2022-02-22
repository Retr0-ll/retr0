<template>
  <div
    class="item"
    ref="item"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        class="item-nromal"
        v-if="!editting"
        key="nromal"
      >
        <div
          class="check"
          :class="objData.status === 'done'?'tick':'' "
          @click="check"
        ></div>
        <div class="item-right">
          <span :class="objData.status === 'done'?'done':'' ">{{objData.name}}</span>
          <div
            class="btn"
            @click="editItem"
          >
            编辑
          </div>
        </div>
      </div>
      <div
        v-else
        class="item-edit"
        key="edit"
      >
        <input
          class="input"
          type="text"
          v-model="objData.name"
          :placeholder="objData.name"
        >
        <div
          class="btn"
          @click="editDone"
        >
          完成
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "ListItem",
  data() {
    return {
      editting: false,
    };
  },
  props: {
    objData: {
      type: [Object],
      default: () => {},
    },
  },
  methods: {
    editItem() {
      this.editting = true;
      this.$emit("changeDrag", true);
      this.$refs.item.style.height = "20em";
    },
    editDone() {
      this.editting = false;
      this.$emit("changeDrag", false);
      this.$refs.item.style.height = "4em";
      this.$store.commit("ADD_TODOLIST_ITEM", this.objDataj);
    },
    check() {
      if (this.objData.status !== "done") {
        this.objData.status = "done";
      } else {
        this.objData.status = "undone";
      }
      this.$emit("changeStatus", this.objData);
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  box-sizing: border-box;
  padding: 0 1em;
  border-radius: 0.5em;
  width: 100%;
  height: 4em;
  background-color: #f5f5f5;
  transition: all 0.5s ease-out;
  user-select: none;
}
.item-nromal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4em;
  .check {
    box-sizing: border-box;
    width: 1.2em;
    height: 1.1em;
    border-radius: 50%;
    border: solid gray 2px;
    cursor: pointer;
  }
  .tick {
    background-color: gray;
    background-image: url("../../assets/tick.png");
    background-size: 100% 100%;
  }
  .item-right {
    display: flex;
    justify-content: space-between;
    padding-left: 1em;
    width: 100%;
    .done {
      text-decoration: line-through;
      color: #9c9c9c;
    }
  }
}
.item-edit {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  margin: 1em 0;
  background: transparent;
  color: #2c3e50;
  outline-style: none;
  border: none;
  border-bottom: solid gray 2px;
  font-size: 1em;
  font-weight: 400;
  width: 50%;
  transition: width 0.4s ease-in-out;
}
&:focus {
  width: 100%;
}
.btn {
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>