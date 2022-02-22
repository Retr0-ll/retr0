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
        <span>{{objData.name}}</span>
        <div
          class="btn"
          @click="editItem"
        >
          编辑
        </div>
      </div>
      <div
        v-else
        class="item-edit"
        key="edit"
      >
        <input
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
}
.item-edit {
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