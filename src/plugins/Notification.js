import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const Notification = (message, type="success") => {
   createToast(message, {
      position: "top-right",
      type: type,
      transition: "zoom",
   });
};

export default Notification;
