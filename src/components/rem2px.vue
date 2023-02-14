<template>
  <div class="wrapper">
    <back></back>
    <h1><span>x</span>rem to <span>100*x</span>px</h1>
    <textarea
      class="textarea"
      name="textone"
      id="textone"
      cols="30"
      rows="10"
      v-model="text"
      placeholder="input here"
      autofocus
    ></textarea>
    <textarea
      class="textarea"
      name="texttwo"
      id="texttwo"
      cols="30"
      rows="10"
      placeholder="output here"
    ></textarea>
    <div class="btns">
      <div
        @click="copy"
        class="btn"
      >
        copy
      </div>
      <div
        @click="clear"
        class="btn"
      >
        clear
      </div>
    </div>
  </div>
</template>

<script>
import back from "@/utils/backBtn/back";

export default {
  name: "UpperCase",
  data() {
    return {
      text: "",
      res: "",
    };
  },
  props: {
    msg: String,
  },
  components: {
    back,
  },
  watch: {
    text() {
      this.handleText();
    },
  },
  methods: {
    pxToRem(str, width = 100) {
      const reg = /(\d+(\.\d*)?)+(px)/gi; //可以匹配浮点数
      let newStr = str.replace(reg, function (_x) {
        _x = _x.replace(/px/gi, "");
        return parseFloat(parseFloat(_x) / width) + "rem";
      });
      return newStr;
    },
    remToPx(str, width = 100) {
      const reg = /(\d+(\.\d*)?)+(rem)/gi; //可以匹配浮点数
      let newStr = str.replace(reg, function (_x) {
        _x = _x.replace(/rem/gi, "");
        return (
          Math.round(parseFloat(parseFloat(_x) * width) * 100) / 100 + "px"
        );
      });
      return newStr;
    },
    handleText() {
      this.res = this.remToPx(this.text);

      document.getElementById("texttwo").value = this.res;
    },

    clear() {
      this.text = "";
      document.getElementById("textone").focus();
      this.$toast("Cleared");
    },

    copy() {
      this.$copyText(this.res)
        .then(() => {
          this.$toast("Copied", "success", 2000);
        })
        .catch((err) => {
          this.$toast("Copy failed", "fail", 2000);
          console.error(err);
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

  span {
    font-family: "Times New Roman", Times, serif;
    color: rgb(120, 41, 194);
  }
}
.textarea {
  border: 0;
  border-radius: 5px;
  background-color: rgba(241, 241, 241, 0.98);
  width: 50%;
  height: 15em;
  padding: 10px;
  resize: none;
  margin-bottom: 10px;
}
.textarea:focus {
  outline: none;
}
.btns {
  display: flex;
  width: 15rem;
  justify-content: space-between;
}
.btn {
  cursor: pointer;
  font-size: 2em;
}
</style>
