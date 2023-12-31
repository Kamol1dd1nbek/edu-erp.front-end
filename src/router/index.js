import { createRouter, createWebHistory } from "vue-router";
import * as NProgress from "nprogress";
import teacher from "./teacher";
import director from "./director";
import finance from "./finance";
import student from "./student";
import admin from "./admin";
import notFound from "./page_not_found";
import auth from "./auth";

const router = createRouter({
   history: createWebHistory(),
   routes: [admin, auth, teacher, director, finance, student, notFound],
});

router.beforeResolve((to, from, next) => {
   NProgress.start();
   next();
});

router.beforeEach((to, from, next) => {
   const token = localStorage.getItem("token");
   const name = to.name === "auth";
   if (!token && !name) {
      return next({ name: "auth" });
   } else {
      if (token && name) {
         return next({ name: "students" });
      } else {
         next();
      }
   }
});

router.afterEach(() => {
   NProgress.done();
});

export default router;
