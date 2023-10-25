export default function phoneEditor(phone) {
   return (
      "+" +
      phone
         .split("")
         .filter((e) => !isNaN(+e) && e !== " ")
         .join("")
   );
}
