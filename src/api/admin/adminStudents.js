import axiosClient from "../apiClient";

const adminStudentApi = {
   getStudents(params) {
      const url = "admin/get-students";
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
};
export default adminStudentApi;
