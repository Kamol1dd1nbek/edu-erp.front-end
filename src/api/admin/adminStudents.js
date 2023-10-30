import axiosClient from "../apiClient";

const adminStudentApi = {
   getStudents(params) {
      const url = `admin/get-students?page=${params.page}&limit=${params.limit}`;
      return axiosClient.get(url);
   },
   addStudent(payload) {
      const url = "admin/add-student";
      return axiosClient.post(url, { ...payload, role_id: 3 });
   },
   updateStudent(id, payload) {
      const url = `admin/update-student/${id}`;
      return axiosClient.put(url, payload);
   },
   deleteStudent(id){
      console.log(id, id, id);
      const url = `admin/delete-student/${id}`;
      return axiosClient.delete(url);
   }
};
export default adminStudentApi;
