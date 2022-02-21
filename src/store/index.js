import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import { todoStorage } from "../common/storage";

Vue.use(Vuex);

let state = {
  todoData: todoStorage.getTodoList || [
    {
      title: "进行中",
      list: []
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
