import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./includes/validation";
import "./includes/firebase";
import "./assets/tailwind.css";
import "./assets/main.css";

createApp(App).use(store).use(router).use(VeeValidatePlugin).mount("#app");
