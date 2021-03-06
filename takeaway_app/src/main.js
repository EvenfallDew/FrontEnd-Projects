import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/reset.css";
import "@/assets/fonts/iconfont.css";

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

import animated from "animate.css";
Vue.use(animated);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
