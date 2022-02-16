// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueClipboard from "vue-clipboard2";
import showToast from "./utils/toast/index";
import axios from "axios";
import vueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(VueClipboard);
Vue.use(showToast);
Vue.prototype.axios = axios;
Vue.use(vueAxios, axios);

axios.defaults.baseURL = window.gurl.SERVICE_CONTEXT_PATH;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
