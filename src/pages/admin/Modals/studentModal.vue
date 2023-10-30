<template>
   <AppModal v-model="dialog">
      <vee-form
         :initial-values="forms"
         :validation-schema="schema"
         @submit="add"
      >
         <VInput
            type="text"
            label="Firstname"
            placeHolder="firstname"
            name="first_name"
         ></VInput>
         <VInput
            type="text"
            label="Lastname"
            placeHolder="lastname"
            name="last_name"
         ></VInput>
         <VInput
            type="text"
            label="Username"
            name="username"
            masked="true"
            placeHolder="(+998) **-***-**-**"
         ></VInput>
         <VButton
            type="submit"
            btn_type="primary"
            class="container"
            :isLoading="adminStore.student.loading"
            >{{ btn_title }}</VButton
         >
      </vee-form>
   </AppModal>
</template>

<script setup>
import { useAdminStore } from "../../../stores/admin";
import { computed, ref, watch } from "vue";

import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import phoneEditor from "../../../hooks/phoneEditor";

const dialog = ref(false);
let forms = ref({
   first_name: "",
   last_name: "",
   username: "",
});
const openModal = (item) => {
   if (item) {
      forms.value = { ...item };
      dialog.value = true;
   } else {
      dialog.value = true;
   }
};

watch(dialog, (value) => {
   if (!value) forms.value = {};
});
const adminStore = useAdminStore();

const add = async (values) => {
   if (!forms.value.id) {
      const payload = { ...values, username: phoneEditor(values?.username) };
      const newStudent = await adminStore.addStudent(payload);
      console.log("newn", newStudent);
   } else {
      const payload = {
         first_name: values?.first_name,
         last_name: values?.last_name,
         username: phoneEditor(values?.username),
      };
      const updatedStudent = await adminStore.updateStudent(values.id, payload);
      console.log("updated", { ...updatedStudent });
   }
};

const btn_title = computed(() => {
   if (adminStore.student.loading) {
      return "Saving...";
   } else {
      if (forms.value.username) {
         return "Save";
      } else return "Add";
   }
});

watch(
   () => adminStore.student.data,
   () => {
      dialog.value = false;
   }
);
const schema = computed(() => {
   return {
      first_name: "required|min:2|max:25",
      last_name: "required|min:2|max:25",
      username: "required|min:2|max:25",
   };
});

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
