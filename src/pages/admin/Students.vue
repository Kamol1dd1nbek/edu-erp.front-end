<template>
   <div class="w-full relative h-full">
      <studentModal ref="student_modal" />
      <div class="m-auto w-[95%]">
         <div class="flex justify-between my-6">
            <h1 class="text-[22px] font-semibold text-[#002842] min-w-[170px]">
               Students ( {{ studentStore?.allStudents?.data?.count }} )
            </h1>
            <VButton
               @click="openModal"
               btn_type="primary"
               class="min-w-[150px] flex gap-3"
            >
               <SvgIcon type="mdi" :path="mdiPlusBox" />
               Add student
            </VButton>
         </div>
         <app-table
            :header="headers"
            :body="studentStore?.allStudents?.data?.users"
            class="overflow-x-auto"
            :loading="studentStore.getAllStudents.loading"
         >
            <template #body_action="{ item }">
               <button
                  class="border border-[green]"
                  @click="openEditModal(item)"
               >
                  <SvgIcon type="mdi" :path="mdiPencil" class="text-[black]" />
               </button>
               <button
                  class="border border-[red]"
                  @click="openDeleteModal(item)"
               >
                  <SvgIcon
                     type="mdi"
                     :path="mdiDeleteEmpty"
                     class="text-[crimson]"
                  />
               </button>
            </template>
         </app-table>
         <div
            class="flex absolute left-[50%] transform translate-x-[-50%] bottom-7 justify-center text-center"
         >
            <v-pagination
               v-model="params.page"
               :pages="params.last_page"
               :range-size="1"
               active-color="#DCEDFF"
               @update:modelValue="studentStore.getAllStudents(params)"
            />
         </div>
      </div>
   </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import { mdiPlusBox, mdiDeleteEmpty } from "@mdi/js";
import { mdiPencil } from "@mdi/js";
import studentModal from "./Modals/studentModal.vue";
import VButton from "../../components/form/VButton.vue";
import AppTable from "../../components/ui/appTable.vue";
import { useAdminStore } from "../../stores/admin";
import { onMounted, ref } from "vue";
// import SvgIcon from "@jamescoyle/vue-icon";

const openEditModal = (item) => {
   student_modal.value.openModal(item);
};
const openDeleteModal = (item) => {
   student_modal.value.openDeleteModal(item);
};

const params = {
   page: 1,
   limit: 9,
   last_page: null,
};

const studentStore = useAdminStore();

const headers = ref([
   {
      title: "Firstname",
      value: "first_name",
   },
   {
      title: "Lastname",
      value: "last_name",
   },
   {
      title: "Phone",
      value: "username",
   },
   {
      title: "Operations",
      value: "action",
   },
]);

const student_modal = ref();

const openModal = () => {
   student_modal.value.openModal();
};

onMounted(async () => {
   await studentStore.getAllStudents(params);
});
</script>

<style lang="scss" scoped></style>
