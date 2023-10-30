<template>
   <!-- for add and update -->
   <AppModal v-model="dialog">
      <vee-form
         :initial-values="forms"
         :validation-schema="schema"
         @submit="save"
      >
         <Warning
            v-if="adminStore.student.error"
            :title="adminStore.student.error.message"
         />
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
   <!-- for delete -->
   <AppModal v-model="deleteDialog">
      <DeleteIcon class="container mb-10" />
      <h2
         class="mb-1 tracking-[0.179px] text-center text-[#1E293B] text-[20px] font-bold"
      >
         Deleting user
      </h2>
      <p
         class="w-[240px] conatiner m-auto text-center text-[16px] text-[#475569]"
      >
         Are you really gonna delete this user?
      </p>
      <div class="flex w-[95%] m-auto justify-between mt-9">
         <VButton
            @click="deleteDialog = false"
            btn_type="black_outline"
            class="w-[45%]"
            >CANCEL</VButton
         >
         <VButton
            @click="deleteStudent()"
            btn_type="danger_outline"
            class="w-[45%]"
            >DELETE</VButton
         >
      </div>
   </AppModal>
</template>

<script setup>
import DeleteIcon from "../../../components/icons/DeleteIcon.vue";
import { useAdminStore } from "../../../stores/admin";
import { computed, ref, watch } from "vue";
import Warning from "../../../components/ui/Alert.vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import phoneEditor from "../../../hooks/phoneEditor";

const dialog = ref(false);
const deleteDialog = ref(false);
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
const unique_id = ref(null);
const openDeleteModal = (item) => {
   deleteDialog.value = true;
   unique_id.value = item?.id;
};

watch(dialog, (value) => {
   if (!value) forms.value = {};
   adminStore.student.error = null;
});
const adminStore = useAdminStore();

const save = async (values) => {
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

const deleteStudent = async (value) => {
   try {
      const deletedStudent = await adminStore.deleteStudent(unique_id.value);
   } catch (error) {
      // console.log(error, "----------");
   }
};

const btn_title = computed(() => {
   if (adminStore.student.loading) {
      return "Saving...";
      console.log(122433254354332432143243);
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
      deleteDialog.value = false;
   }
);
const schema = computed(() => {
   return {
      first_name: "required|min:2|max:25",
      last_name: "required|min:2|max:25",
      username: "required|min:2|max:25",
   };
});

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
