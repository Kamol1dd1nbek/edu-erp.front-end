import { defineStore } from "pinia";
import authApi from "../api/auth/authApi";
import router from "../router/index";

export const useAuthStore = defineStore({
   id: "auth",
   state: () => ({
      userData: {
         data: null,
         error: null,
         loading: false,
      },
   }),
   actions: {
      async authLogin(payload) {
         try {
            this.userData.loading = true;
            this.userData.data = await authApi.login(payload);
            const data = this.userData.data;
            if (this.userData.data.tokens.access_token) {
               localStorage.setItem("role", data.user.role.name);
               localStorage.setItem("token", data.tokens.access_token);
               localStorage.setItem("avatar", data.user.avatar);
               localStorage.setItem(
                  "fullname",
                  JSON.stringify({
                     first_name: data.user.first_name,
                     last_name: data.user.last_name,
                  })
               );
               if (data.user.role.name === "admin") {
                  await router.push({ name: "students" });
               } else if (data.user.role.name === "director") {
                  await router.push({ name: "director" });
               }
            }
         } catch (error) {
            this.userData.error = error?.response?.data;
         } finally {
            this.userData.loading = false;
         }
      },
      async authLogout() {
         try {
            const token = localStorage.removeItem("token");
            const id = localStorage.removeItem("id");
            localStorage.removeItem("avatar");
            localStorage.removeItem("full_name");
            if (id) {
               await authApi.logout(id);
            }
         } catch (error) {
            console.log(error);
         }
      },
   },
});
