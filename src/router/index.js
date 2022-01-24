import Vue from "vue";
import Router from "vue-router";
import home from "@/pages/home";
import upperCase from "@/components/upperCase";

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
