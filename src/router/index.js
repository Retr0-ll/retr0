import Vue from "vue";
import Router from "vue-router";
import upperCase from "@/components/upperCase";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "upperCase",
      component: upperCase
    }
  ]
});
