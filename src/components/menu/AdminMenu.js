import { mdiAccount, mdiGolf, mdiAccountGroup, mdiDoorOpen, mdiCogOutline } from "@mdi/js";
export const AdminMenu = [
   { path: "students", label: "Students", name: "students", icon: mdiAccount },
   { path: "courses", label: "Courses", name: "courses", icon: mdiGolf },
   { path: "groups", label: "Groups", name: "groups", icon: mdiAccountGroup },
   {
      path: "rooms",
      label: "Rooms",
      name: "rooms",
      icon: mdiDoorOpen
  },
  {
      path: "profile",
      label: "Profile",
      name: "profile",
      icon: mdiCogOutline
  },
];
