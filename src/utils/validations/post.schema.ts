import * as Yup from "yup";

export const postSchema = Yup.object({
  title: Yup.string().required("El título es requerido"),
  body: Yup.string().required("La descripción es requerida"),
});
