<template>
   <div class="w-full">
      <label
         class="ml-4 text-baseText text-[19px] font-normal"
         v-if="labeled"
         for="name"
         >{{ label }}<span class="text-baseRed"> *</span></label
      >
      <vee-field
         v-if="masked"
         class="w-full p-[16px] outline-none font-normal text-[18px] rounded my-[7px] border bg-white border-[rgba(0, 0, 0, 0.38)]"
         v-mask="'(+998) ##-###-##-##'"
         :placeholder="placeHolder"
         masked="true"
         :type="type"
         :name="name"
      />
      <vee-field
         v-else
         class="w-full p-[16px] outline-none font-normal text-[21px] rounded mt-[7px]"
         :placeholder="placeHolder"
         :type="type"
         :name="name"
      />
      <ErrorMessage
         class="text-reddish mt-2 text-[16px] font-medium"
         :name="name"
      />
   </div>
</template>

<script setup>
// imports
import { ErrorMessage } from "vee-validate";

// Props
const props = defineProps({
   type: {
      type: String,
      default: "text",
   },
   masked: {
      type: Boolean,
      default: false,
   },
   labeled: {
      type: Boolean,
      default: true,
   },
   placeHolder: String,
   label: String,
   name: String,
});
</script>

<style lang="scss" scoped></style>
