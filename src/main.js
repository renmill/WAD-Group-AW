import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";

// Reuse the old styling
import "../css/indexStylesheet.css";

// Styles needed for the vue layout
import "./style.css";

createApp(App).use(store).use(router).mount("#app");
