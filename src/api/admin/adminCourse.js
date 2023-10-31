import axiosClient from "../apiClient";

const adminCourseApi = {
   getAllCourses(query) {
      const url = `admin/get-courses?page=${query.page}&limit=${query?.limit}`;
      return axiosClient.get(url);
   },
   addCourse(payload) {
      const url = `admin/add-course`;
      return axiosClient.post(url, payload);
   },
   deleteCourse(id) {
      const url = `admin/delete-course/${id}`;
      return axiosClient.delete(url);
   },
   updateCourse(id, payload) {
      const url = `admin/update-course/${id}`;
      return axiosClient.put(url, payload);
   },
};

export default adminCourseApi;
