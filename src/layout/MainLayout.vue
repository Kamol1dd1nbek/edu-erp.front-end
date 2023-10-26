<template>
   <div class="w-full flex h-screen">
      <TheSidebar />
      <div class="w-full bg-baseBg flex flex-col h-screen">
         <TheHeader />
         <router-view></router-view>
      </div>
   </div>
</template>

<script setup>
import TheSidebar from "../components/header/TheSidebar.vue";
import TheHeader from "../components/header/TheHeader.vue";
import { useSidebar } from "../hooks/useSidebar";
const { isOpen } = useSidebar();
</script>

<style lang="scss" scoped>
.full {
   width: 100%;
}
.selfWidth {
   // width: ;
   background: red !important;
}
</style>
