import adminStudentApi from "../../api/admin/adminStudents";
import { defineStore } from "pinia";
import Notification from "../../plugins/Notification";

export const useStudentStore = defineStore({
   id: "student",
   state: () => ({
      allStudents: {
         data: null,
         error: null,
         loading: false,
      },
      student: {
         data: null,
         error: null,
         loading: false,
      },
      params: null,
   }),
   actions: {
      async getAllStudents(params) {
         try {
            this.params = params;
            this.allStudents.loading = true;
            this.allStudents.data = await adminStudentApi.getStudents(params);
            // console.log(this.allStudents.data);
            params.last_page = Math.ceil(
               this.allStudents.data.count / params.limit
            );
         } catch (error) {
            this.allStudents.error = error?.response?.data;
         } finally {
            setTimeout(() => {
               this.allStudents.loading = false;
            }, 2000);
         }
      },
      async addStudent(payload) {
         try {
            this.student.loading = true;
            this.student.data = await adminStudentApi.addStudent(payload);
            Notification("Student successfully added!");
            this.getAllStudents(this.params);
         } catch (error) {
            this.student.error = error?.response?.data;
         } finally {
            this.student.loading = false;
         }
      },
      async updateStudent(id, payload) {
         try {
            this.student.loading = true;
            this.student.data = await adminStudentApi.updateStudent(
               id,
               payload
            );
            Notification("Student successfully updated!");
            this.getAllStudents(this.params);
         } catch (error) {
            this.student.error = error?.response?.data;
         } finally {
            this.student.loading = false;
         }
      },
      async deleteStudent(id) {
         try {
            this.student.loading = true;
            this.student.data = await adminStudentApi.deleteStudent(id);
            Notification("Student successfully deleted!");
            this.getAllStudents(this.params);
         } catch (error) {
            this.student.error = error?.response?.data;
         } finally {
            this.student.loading = false;
            Notification(this.student.error, "error")
         }
      },
   },
});
