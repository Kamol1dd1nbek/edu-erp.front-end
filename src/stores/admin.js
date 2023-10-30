import adminStudentApi from "../api/admin/adminStudents";
import { defineStore } from "pinia";
import Notification from "../plugins/Notification";
export const useAdminStore = defineStore({
   id: "admin",
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
   }),
   actions: {
      async getAllStudents(params) {
         try {
            this.allStudents.loading = true;
            this.allStudents.data = await adminStudentApi.getStudents(params);
            console.log(this.allStudents.data);
            params.last_page = Math.ceil(this.allStudents.data.count / params.limit)
         } catch (error) {
            this.allStudents.error = error;
         } finally {
            setTimeout(() => {

               this.allStudents.loading = false;

            }, 2000)
         }
      },
      async addStudent(payload) {
         try {
            this.student.loading = true;
            this.student.data = await adminStudentApi.addStudent(payload);
            Notification("Student successfully added!");
            this.getAllStudents();
         } catch (error) {
            this.student.error = error;
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
            this.getAllStudents();
         } catch (error) {
            this.student.error = error;
         } finally {
            this.student.loading = false;
         }
      },
   },
});
