import { todoStorage } from "../common/storage";

const mutations = {
  ADD_TODOLIST_ITEM(state, data) {
    if (!data) {
      todoStorage.setTodoList = state.todoData;
    } else {
      // 修改单个任务
      if (data.id) {
        state.todoData.map(groupItem => {
          groupItem.list.map((item, index) => {
            // 从这个list中找到任务，修改
            if (item.id === data.id) {
              item = data;
              groupItem.list.splice(index, 1, item);
            }
          });
          return groupItem;
        });
        todoStorage.setTodoList = state.todoData;
      } else {
        // 新增任务，data.index是任务分组下标，新增到对应分组
        // let list = state.todoData[0].list;
        // data.id = moment().valueOf();
        // data.status = "undone";
        // list.push(data);
      }
      todoStorage.setTodoList = state.todoData;
    }
  },
  DELATE_ITEM(state, data) {
    if (data) {
      state.todoData.map(groupItem => {
        groupItem.list.map((item, index) => {
          // 从这个list中找到任务，删除
          if (item.id === data.id) {
            groupItem.list.splice(index, 1);
          }
        });
        return groupItem;
      });
      todoStorage.setTodoList = state.todoData;
    }
  }
};

export default mutations;
