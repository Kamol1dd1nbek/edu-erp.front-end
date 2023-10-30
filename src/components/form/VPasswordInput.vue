<template>
   <div class="w-full">
      <label for="name" class="ml-4 text-baseText text-[19px] font-normal"
         >{{ label }}<span class="text-baseRed"> *</span></label
      >
      <div class="w-full flex justify-between items-center relative">
         <vee-field
            :type="active ? 'text' : 'password'"
            :name="name"
            placeholder="********"
            class="w-[89%] mt-[7px] p-[16px] border border-[#0D1523] outline-none font-normal text-[21px] rounded-s-lg text-baseText"
         />
         <button
            type="button"
            @click="active = !active"
            class="flex items-center border border-[#0D1523] absolute right-0 top-[7px] justify-center w-[10%] text-baseText text-[18px] h-[65px] rifht bg-white rounded-e-lg"
         >
            <SvgIcon type="mdi" :path="active ? mdiEyeOff : mdiEye" />
         </button>
      </div>
      <ErrorMessage
         :name="name"
         class="text-reddish mt-2 text-[16px] font-medium"
      />
   </div>
   
</template>

<script setup>
import { ErrorMessage } from "vee-validate";
import { ref } from "vue";
const active = ref();
import { mdiEye, mdiEyeOff } from "@mdi/js";
// import SvgIcon from "@jamescoyle/vue-icon";
const props = defineProps({
   label: String,
   name: String,
});
</script>

<style lang="scss" scoped></style>
