import moment from "moment";
import { todoStorage } from "../common/storage";

const mutations = {
  ADD_TODOLIST_ITEM(state, data) {
    if (!data) {
      todoStorage.setTodoList = state.todoData;
    } else {
      // 修改单个任务
      if (data.item.id) {
        state.todoData.map(groupItem => {
          groupItem.list.map((item, index) => {
            // 从这个list中找到任务，修改
            if (item.id === data.item.id) {
              item = data.item;
              groupItem.list.splice(index, 1, item);
            }
          });
          return groupItem;
        });
        todoStorage.setTodoList = state.todoData;
      } else {
        // 新增任务，data.index是任务分组下标，新增到对应分组
        let list = state.todoData[data.index].list;
        data.item.id = moment().valueOf();
        list.push(data.item);
      }
      todoStorage.setTodoList = state.todoData;
    }
  }
};

export default mutations;
