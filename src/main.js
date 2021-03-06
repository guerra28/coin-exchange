import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { dollarFilter, percentFilter } from '@/filters'
import Chartick from "vue-chartkick"
import { VueSpinners } from "@saeris/vue-spinners"
import Chart from "chart.js"


Vue.use(Chartick.use(Chart));
Vue.use(VueSpinners);
Vue.filter('dollar', dollarFilter);
Vue.filter('percent', percentFilter);
Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')