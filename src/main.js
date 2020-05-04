import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { db } from "./firebase/init.js";

Vue.config.productionTip = false;
let app = null;
db.collection('users').get()
  .then(() => {
    if (!app) {
      app = new Vue({
        router,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    }
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  })
