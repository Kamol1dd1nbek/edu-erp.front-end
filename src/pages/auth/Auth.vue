<template>
   <section class="w-full h-screen bg-baseBg flex items-center justify-center">
      <div
         class="bg-white rounded w-[35%] flex justify-center flex-col items-center"
      >
         <p class="text-secondBg font-normal text-[32px] mt-[32px]">
            Log into your account
         </p>
         <vee-form
            @submit="send"
            :validation-schema="schema"
            class="w-[90%] mt-[20px] flex flex-col gap-[30px] pb-8"
         >
            <Warning
               v-if="authStore.userData.error"
               :title="authStore.userData.error.message"
            />
            <div class="w-full flex justify-between items-center">
               <VInput
                  type="text"
                  label="Username"
                  name="phone"
                  masked="true"
                  placeHolder="(+998) 93-102-06-34"
               ></VInput>
            </div>
            <div class="w-full flex justify-between items-center">
               <VPasswordInput
                  type="password"
                  label="Password"
                  name="password"
                  placeHolder="Password"
               ></VPasswordInput>
            </div>
            <VButton type="submit" btn_type="primary"
             :isLoading="authStore.userData.loading"  >{{ btn_title }}</VButton
            >
         </vee-form>
      </div>
   </section>
</template>

<script setup>
// imports
import VPasswordInput from "../../components/form/VPasswordInput.vue";
import VButton from "../../components/form/VButton.vue";
import VInput from "../../components/form/VInput.vue";
import Warning from "../../components/ui/Alert.vue";
import phoneEditor from "../../hooks/phoneEditor";
import { useAuthStore } from "../../stores/auth";
import { computed, ref, watch } from "vue";

// store
const authStore = useAuthStore();

// Validation schema
const schema = computed(() => {
   return {
      password: "required|min:6|max:15",
      phone: "required|min:8|max:25",
   };
});

// Button text
const btn_title = computed(() => {
   if (authStore.userData.loading) {
      return "Loading...";
   } else {
      return "Login";
   }
});

// Log In
const send = async (values) => {
   const payload = {
      username: phoneEditor(values.phone),
      password: values.password,
   };
   await authStore.authLogin(payload);
};
</script>
<style lang="scss" scoped></style>
