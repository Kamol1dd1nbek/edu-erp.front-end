<template>
   <div class="w-full relative h-full">
      <courseModal ref="course_modal" />
      <div class="m-auto w-[95%]">
         <div class="flex justify-between my-6">
            <h1 class="text-[22px] font-semibold text-[#002842] min-w-[170px]">
               Courses ( {{ courseStore?.allCourses?.data?.count }} )
            </h1>
            <VButton
               @click="openModal"
               btn_type="primary"
               class="min-w-[150px] flex gap-3"
            >
               <SvgIcon type="mdi" :path="mdiPlusBox" />
               Add course
            </VButton>
         </div>
         <appTable
            :header="headers"
            :body="courseStore?.allCourses?.data?.courses"
         >
            <template #body_action="{ item }">
               <button
                  class="border border-[green]"
                  @click="openModal(item)"
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
         </appTable>
         <div
            class="flex absolute left-[50%] transform translate-x-[-50%] bottom-7 justify-center text-center"
         >
            <v-pagination
               v-model="params.page"
               :pages="params.last_page"
               :range-size="1"
               active-color="#DCEDFF"
               @update:modelValue="courseStore.getAllCourses(params)"
            />
         </div>
      </div>
   </div>
</template>

<script setup>
// imports
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { onMounted, ref } from "vue";
import { useCourseStore } from "../../stores/admin/course";
import appTable from "../../components/ui/appTable.vue";
import VButton from "../../components/form/VButton.vue";
import { mdiPlusBox,mdiPencil, mdiDeleteEmpty } from "@mdi/js";
import courseModal from "./Modals/courseModal.vue";

// variables
const courseStore = useCourseStore();
const params = ref({
   page: 1,
   limit: 9,
   last_page: null,
});
const headers = ref([
   { title: "Name", value: "name" },
   { title: "Price", value: "price" },
   { title: "Lessons count", value: "lessons_count" },
   { title: "Actions", value: "action" },
]);
const course_modal = ref();

// actions
const openModal = (item) => {
   course_modal.value.openModal(item);
};
const openDeleteModal = (item) => {
   course_modal.value.openDeleteModal(item);
};
// ls
onMounted(async () => {
   await courseStore.getAllCourses(params.value);
});
</script>

<style lang="scss" scoped></style>
