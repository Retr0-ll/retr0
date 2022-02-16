<template>
  <div class="item">
    <span>{{objData.name}}</span>
  </div>
</template>
<script>
export default {
  props: {
    objData: {
      type: [Object],
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4em;
  background-color: #f5f5f5;
}
</style>