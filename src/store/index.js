import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import { todoStorage } from "../common/storage";

Vue.use(Vuex);

let state = {
  // todoData: todoStorage.getTodoList || [
  //   {
  //     title: "进行中",
  //     list: []
  //   },
  //   {
  //     title: "已完成",
  //     list: []
  //   }
  // ]
  todoData: todoStorage.getTodoList || [
    {
      title: "进行中",
      list: [
        {
          id: 1,
          name: "测试1"
        },

        {
          id: 2,
          name: "测试2"
        },

        {
          id: 3,
          name: "测试3"
        },

        {
          id: 4,
          name: "测试4"
        },
        {
          id: 5,
          name: "测试5"
        },
        {
          id: 6,
          name: "测试6"
        },
        {
          id: 7,
          name: "测试7",
          desc: "",
          timeStamp: "",
          exp: {
            tag: ""
          }
        }
      ]
    },
    {
      title: "已完成",
      list: []
    }
  ]
};

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions,
  getters
});
