import Vue from "vue";
import Router from "vue-router";
import upperCase from "@/components/upperCase";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
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

export default router;
