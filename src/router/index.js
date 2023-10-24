import { createRouter, createWebHistory } from "vue-router";
import * as NProgress from "nprogress";

const router = createRouter({
   history: createWebHistory(),
   routes: [],
});

router.beforeResolve((to, from, next) => {
   NProgress.start();
   next();
});

router.beforeEach((to, from, next) => {
   next();
});

router.afterEach(() => {
   NProgress.done();
});

export default router;
