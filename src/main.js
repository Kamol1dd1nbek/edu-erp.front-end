import veeValidatePlugins from "./plugins/vee-validate";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "./assets/main.css";

import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.use(veeValidatePlugins);
app.use(createPinia());
app.use(router);

app.mount("#app");
