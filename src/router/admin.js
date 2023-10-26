export default {
   path: "/admin",
   name: "admin",
   component: import("../pages/admin/Admin.vue"),
   children: [
      {
         path: "students",
         name: "students",
         component: import("../pages/admin/Students.vue"),
      },
      {
         path: "courses",
         name: "courses",
         component: import("../pages/admin/Courses.vue"),
      },
      {
         path: "groups",
         name: "groups",
         component: import("../pages/admin/Groups.vue"),
      },
      {
         path: "rooms",
         name: "rooms",
         component: import("../pages/admin/Rooms.vue"),
      },
      {
         path: "profile",
         name: "profile",
         component: import("../pages/global/Profile.vue"),
      },
   ],
};
