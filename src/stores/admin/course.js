import adminCourseApi from "../../api/admin/adminCourse";
import { defineStore } from "pinia";
import Notification from "../../plugins/Notification";

export const useCourseStore = defineStore({
   id: "course",
   state: () => ({
      allCourses: {
         data: null,
         error: null,
         loading: false,
      },
      course: {
         data: null,
         error: null,
         loading: false,
      },
      params: null,
   }),
   actions: {
      async getAllCourses(params) {
         try {
            this.params = params;
            this.allCourses.loading = true;
            this.allCourses.data = await adminCourseApi.getAllCourses(params);
            console.log(this.allCourses.data, "---------------<>----");
            params.last_page = Math.ceil(
               this.allCourses.data.count / params.limit
            );
         } catch (error) {
            this.allCourses.error = error?.response?.data;
            console.log(error, "bu yerda");
         } finally {
            this.allCourses.loading = false;
         }
      },
      async updateCourse(id, payload) {
         try {
            this.course.loading = true;
            this.course.data = await adminCourseApi.updateCourse(id, payload);
            Notification("Course successfully updated!");
            this.getAllCourses(this.params);
         } catch (error) {
            console.log(error);
            this.course.course = error?.response?.data;
         } finally {
            this.course.loading = false;
         }
      },
      async addCourse(payload) {
         try {
            this.course.loading = true;
            this.course.data = await adminCourseApi.addCourse(payload);
            Notification("Course successfully added!");
            this.getAllCourses(this.params);
         } catch (error) {
            this.course.error = error?.response?.data;
         } finally {
            this.course.loading = false;
         }
      },
      async deleteCourse(id) {
         try {
            this.course.loading = true;
            this.course.data = await adminCourseApi.deleteCourse(id);
            Notification("Course sucessfully deleted!");
            this.getAllCourses(this.params);
         } catch (error) {
            this.course.error = error?.response?.data;
         } finally {
            this.course.loading = false;
         }
      },
   },
});
