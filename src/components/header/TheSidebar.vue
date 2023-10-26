<template>
   <div class="flex bg-white">
      <div
         :class="isOpen ? 'block' : 'hidden'"
         @click="isOpen = false"
         class="fixed inset-0 z-20 transition-opacity opacity-50 lg:hidden bg-[]"
         style="background-color: rgba(0, 16.81, 19.13, 0.5)"
      ></div>
      <div
         :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
         class="w-[223px] bg-secondBg fixed pt-[70px] inset-y-0 left-0 z-20 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0"
      >
         <router-link
            v-for="(item, index) in AdminMenu"
            :key="index"
            :to="item.path"
            active-class="active"
            class="flex py-[15px] gap-[15px] pl-[30px] w-full px-[15px] text-white"
            ><SvgIcon type="mdi" :path="item.icon" class="w-5 h-5" />
            <span class="text-4">{{ item.label }}</span></router-link
         >
      </div>
   </div>
</template>

<script setup>
import { useSidebar } from "../../hooks/useSidebar";
import { AdminMenu } from "../menu/AdminMenu";
import SvgIcon from "@jamescoyle/vue-icon";
const { isOpen } = useSidebar();
</script>

<style lang="scss" scoped>
.active {
   background: #f5fccd;
   color: #12486b;
}
</style>
