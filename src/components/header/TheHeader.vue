<template>
   <div
      class="h-[70px] w-full py-4 px-10 bg-secondBg border-l-2 border-white flex justify-between"
   >
      <button
         class="p-[10px] absolute left-0 top-0 flex items-center lg:hidden mr-6"
         @click="isOpen = true"
      >
         <SvgIcon
            type="mdi"
            :path="mdiHamburger"
            class="text-[21px] text-[red]"
         />
      </button>
      <div class="w-[400px] h-[40px] relative flex">
         <input
            type="text"
            placeholder="Search"
            class="w-full rounded-[100px] py-3 px-4 outline-none text-[13px] min-w-[100px] pr-10"
         />
         <SvgIcon
            type="mdi"
            :path="mdiMagnify"
            class="absolute top-2 right-4"
         />
      </div>
      <div
         class="account h-[100%] cursor-pointer flex items-center ml-2 relative"
      >
         <div class="rounded-full bg-white w-[35px] h-[35px] overflow-hidden">
            <img v-if="avatar_url" :src="avatar" alt="img" class="" />
            <SvgIcon
               v-else
               type="mdi"
               :path="mdiAccountOutline"
               class="text-[#002842] w-[35px] h-[35px] p-[2px]"
            />
         </div>
         <p class="text-white px-[10px] text-3 font-thin">{{ account_name }}</p>
         <SvgIcon type="mdi" :path="mdiTriangleSmallDown" class="text-white" />

         <div
            class="sub_menu duration-200 absolute w-[140px] bg-white overflow-hidden rounded-lg"
         >
            <div
               @click="logout"
               class="flex py-3 px-4 text-baseText hover:text-white hover:bg-baseText"
            >
               <SvgIcon type="mdi" :path="mdiLogout" class="text-error" />
               <p class="ml-4">Log out</p>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();
import { mdiLogout, mdiMagnify,mdiHamburger, mdiAccountOutline } from "@mdi/js";
import { useSidebar } from "../../hooks/useSidebar";
const { isOpen } = useSidebar();
const logout = async () => {
   await authStore.authLogout();
   location.reload();
};
const avatar_url = localStorage.getItem("avatar");
const avatar = `${import.meta.env.VITE_APP_BASE_URL}${avatar_url}`;
const names_obj = JSON.parse(localStorage.getItem("fullname"));
const account_name = names_obj.last_name[0] + "." + names_obj.first_name;
</script>

<style lang="scss" scoped>
.sub_menu {
   opacity: 0;
   visibility: hidden;
   top: 60px;
}
.account:hover .sub_menu {
   opacity: 1;
   visibility: visible;
   top: 40px;
}
</style>
