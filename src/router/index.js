import Vue from "vue";
import Router from "vue-router";
import home from "@/pages/home";
import upperCase from "@/components/upperCase";
import px2PX from "@/components/px2PX";
import todolist from "@/components/toDoList/toDoList";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        title: "Home"
      }
    },
    {
      path: "/uppercase",
      name: "upperCase",
      component: upperCase,
      meta: {
        title: "转成大写"
      }
    },
    {
      path: "/todolist",
      name: "todolist",
      component: todolist,
      meta: {
        title: "To Do"
      }
    },
    {
      path: "/px2PX",
      name: "px2PX",
      component: px2PX,
      meta: {
        title: "px2PX"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

const app = new Vue({
  router
}).$mount("#app");

export default router;
