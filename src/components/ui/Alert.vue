<template>
   <div class="w-full bg-red-100 flex p-5 rounded-md space-x-2">
      <div class="shrink-0"><AlertIcon /></div>
      <div class="flex-1">
         <h2 class="h-[24px] text-[#FF5252] text-[16px] font-bold">
            {{ title }}
         </h2>
      </div>
   </div>
</template>

<script setup>
import AlertIcon from "../icons/AlertOcta.vue";
const props = defineProps({
   title: {
      type: String,
      default: "Something went wrong!",
   },
});
</script>

<style lang="scss" scoped></style>
