<template>
   <!-- for add and update -->
   <AppModal v-model="dialog">
      <vee-form
         :initial-values="forms"
         :validation-schema="schema"
         @submit="save"
      >
         <Warning
            v-if="courseStore?.course?.error"
            :title="courseStore?.course?.error?.message"
         />
         <VInput
            type="text"
            label="Name"
            placeHolder="Course name"
            name="name"
         ></VInput>
         <VInput
            type="number"
            label="Price"
            placeHolder="1200000"
            name="price"
         ></VInput>
         <VInput
            type="number"
            label="Lessons count"
            placeHolder="67"
            name="lessons_count"
         ></VInput>
         <VButton
            type="submit"
            btn_type="primary"
            class="container"
            :isLoading="courseStore?.course?.loading"
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
         Deleting course
      </h2>
      <p
         class="w-[240px] conatiner m-auto text-center text-[16px] text-[#475569]"
      >
         Are you really gonna delete this course?
      </p>
      <div class="flex w-[95%] m-auto justify-between mt-9">
         <VButton
            @click="deleteDialog = false"
            btn_type="black_outline"
            class="w-[45%]"
            >CANCEL</VButton
         >
         <VButton
            @click="deleteCourse()"
            btn_type="danger_outline"
            class="w-[45%]"
            >DELETE</VButton
         >
      </div>
   </AppModal>
</template>

<script setup>
// imports
import { useCourseStore } from "../../../stores/admin/course";
import DeleteIcon from "../../../components/icons/DeleteIcon.vue";
import { computed, ref, watch } from "vue";
import Warning from "../../../components/ui/Alert.vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";

// variables
const courseStore = useCourseStore();
const deleteDialog = ref(false);
const dialog = ref(false);
const schema = computed(() => {
   return {
      name: "required|min:2|max:25",
      price: "required|min:2|max:25",
      lessons_count: "required|min:2|max:25",
   };
});
let forms = ref({
   name: "",
   price: null,
   lessons_count: null,
});
const unique_id = ref(null);

// actions
const openModal = (item) => {
   if (item) {
      forms.value = { ...item };
      dialog.value = true;
   } else {
      dialog.value = true;
   }
};
const openDeleteModal = (item) => {
   deleteDialog.value = true;
   unique_id.value = item?.id;
};
watch(dialog, (value) => {
   if (!value) forms.value = {};
   courseStore.course.error = null;
});

const save = async (values) => {
   if (!forms.value.id) {
      await courseStore.addCourse({
         name: values.name,
         price: values.price,
         lessons_count: values.lessons_count,
      });
   } else {
      const payload = {
         name: values?.name,
         price: values?.price,
         lessons_count: values?.lessons_count,
      };
      const updatedCourse = await courseStore.updateCourse(values.id, payload);
      console.log("updated", { ...updatedCourse });
   }
};

const deleteCourse = async (value) => {
   try {
      const deletedCourse = await courseStore.deleteCourse(unique_id.value);
   } catch (error) {}
};

const btn_title = computed(() => {
   if (courseStore.course.loading) {
      return "Saving...";
   } else {
      if (forms.value.id) {
         return "Save";
      } else return "Add";
   }
});

// watchers
watch(
   () => courseStore.course.data,
   () => {
      dialog.value = false;
      deleteDialog.value = false;
   }
);

// Expose
defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
