<template>
  <div class="wrapper">
    <back></back>
    <h1><span>x</span>px to max(<span>x</span>px, <span>x</span>PX)</h1>
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
      text: '',
      res: '',
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
    handleText() {
      const patt=/[0-9]+px/g;

      this.res = this.text.split('');

      const pxArr = []

      while (true) {
        let result=patt.exec(this.text);
        if (result == null) break;
        pxArr.push(result);
      }

      console.log(pxArr);

      while(pxArr.length) {
        const pxItem = pxArr.pop();
        
        if(pxItem.index && this.res[pxItem.index - 1] === '-') {
          this.res.splice(pxItem.index - 1, pxItem[0].length + 1, `min(${pxItem[0]}, ${pxItem[0].replace('px', 'PX')})`)
        } else {
          this.res.splice(pxItem.index, pxItem[0].length, `max(${pxItem[0]}, ${pxItem[0].replace('px', 'PX')})`)
        }
      }

      this.res = this.res.join('');
      
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
    font-family: 'Times New Roman', Times, serif;
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
