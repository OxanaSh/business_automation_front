import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AOS from "aos";
import BootstrapVueNext from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "swiper/css";
import "swiper/css/bundle";
import "./assets/custom.scss";

axios.defaults.baseURL = "http://127.0.0.1:8000";
/*axios.defaults.withCredentials = true;*/

const app = createApp(App).use(router);
app.mixin({
  mounted() {
    AOS.init();
  },
});
app.use(BootstrapVueNext);
app.use(VueApexCharts);
app.config.globalProperties.$axios = axios;


app.mount('#app')