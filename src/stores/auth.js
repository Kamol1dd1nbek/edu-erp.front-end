import { defineStore } from "pinia";
import authApi from "../api/auth/authApi";

export const authStore = defineStore({
   id: "auth",
   state: () => ({}),
   actions: {
      async authLogin(payload) {
         await authApi.login(paylod);
      },
   },
});
