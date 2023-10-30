import veeValidatePlugins from "./plugins/vee-validate";
import SvgIcon from "@jamescoyle/vue-icon";
import VueTheMask from "vue-the-mask";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "./assets/main.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.component("SvgIcon", SvgIcon);
app.use(veeValidatePlugins);
app.use(createPinia());
app.use(ElementPlus);
app.use(VueTheMask);
app.use(router);

app.mount("#app");
