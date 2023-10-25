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
            class="w-[90%] mt-[20px] flex flex-col gap-[30px]"
         >
            <Warning v-if="1 !== 1" title="Phone number or password wrong!"/>
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
            <button type="submit">send</button>
         </vee-form>
      </div>
   </section>
</template>

<script setup>
// imports
import VInput from "../../components/form/VInput.vue";
import Warning from "../../components/ui/Alert.vue";
import VPasswordInput from "../../components/form/VPasswordInput.vue";
import { computed, ref } from "vue";

// store
// const authStore = useAuthStore();

// variables
const loading = ref(false);

// Validation schema
const schema = computed(() => {
   return {
      password: "required|min:6|max:15",
      phone: "required|min:8|max:19",
   };
});

// Button text
const btn_title = computed(() => {
   if (loading.value) {
      return "Loading...";
   } else {
      return "Login";
   }
});

// Log In
const login = async (values) => {
   loading.value = true;
   const payload = {
      phone: phoneEditor(values.phone),
      password: values.password,
   };
   await authStore.authLogin(payload);
   loading.value = false;
};

const send = (vals) => {
   console.log(vals);
};
</script>
<style lang="scss" scoped></style>
