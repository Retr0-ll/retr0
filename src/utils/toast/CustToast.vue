<template>
  <transition name="fade">
    <div
      class="CustToast"
      :class="type"
      v-if="showToast"
    >

      <span class="icon">
        <!-- <img :src="iconSrc" /> -->
      </span>

      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  /**
   * 自己封装的Toast v0.2
   * params: showToast Boolean 是否激活toast 默认 false
   * params: type String       toast提示类型 共normal success，fail，warning 四个选项 默认normal
   * params: message String    toast消息
   * params: duration Number      toast显示时间 默认 3000ms
   * */
  name: "CustToast",
  data() {
    return {
      showToast: true,
      type: "normal",
      message: "消息提示",
      duration: 3000,
    };
  },
  computed: {
    // iconSrc() {
    //   window.console.log("当前类型", this.type);
    //   let tipType = ["normal", "success", "warning", "fail"];
    //   if (tipType.includes(this.type)) {
    //     return require(`@/assets/img/common/${this.type}.svg`);
    //   } else {
    //     throw "Toast type数据只允许为 normal, success, warning, fail 四种其中的一种，默认为normal";
    //   }
    // },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.CustToast {
  position: fixed;
  left: 50%;
  top: 50%;
  background: rgb(233, 233, 235);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  animation: show-toast 0.2s;
  color: #909399;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  display: flex;
  align-items: center;
}

@keyframes show-toast {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.success {
  color: #67c23a;
  background: rgb(225, 243, 216);
}

.warning {
  color: #e6a23c;
  background: rgb(250, 236, 216);
}

.fail {
  color: #f56c6c;
  background: rgb(253, 226, 226);
}

.icon img {
  width: 20px;
  height: 20px;
  margin-top: 3px;
  margin-right: 4px;
}
</style>
