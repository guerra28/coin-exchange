import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import About from '@/views/About';
import Error from '@/views/Error'
import CoinDetail from '@/views/CoinDetail'

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/about",
        name: "about",
        component: About
    },
    {
        path: '/coin/:id',
        name: 'coin-detail',
        component: CoinDetail
    },
    {
        path: "*",
        name: "error",
        component: Error
    }


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;