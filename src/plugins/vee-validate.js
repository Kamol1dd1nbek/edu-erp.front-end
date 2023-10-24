import { Form, Field, ErrorMessage, configure, defineRule } from "vee-validate";
import { required, min, max, email } from "@vee-validate/rules";

export default {
   install(app) {
      app.component("VeeForm", Form);
      app.component("VeeField", Field);
      app.component("ErrorMessage", ErrorMessage);

      defineRule("required", required);
      defineRule("email", email);
      defineRule("min", min);
      defineRule("max", max);

      configure({
         generateMessage: (context) => {
            const messages = {
               required: `The field ${context.field} is required`,
               min: `The files ${context.field} is too short`,
               max: `The files ${context.field} is too long`,
               email: `The field ${context.field} is invalid email`,
            };
            return messages[context.rule.name]
               ? messages[context.rule.name]
               : `${context.field} is not entered`;
         },
         validateOnBlur: true,
         validateOnChange: true,
         validateOnInput: true,
         validateOnModelUpdate: true,
      });
   },
};
