import { Button } from "@components/button";
import { Input } from "@components/input";
import { Textarea } from "@components/text-area";
import { IPost } from "@interfaces/post.interface";
import { createPost, updatePost } from "@redux/slices/post.slice";
import { RootState, useAppDispatch } from "@redux/store";
import { postSchema } from "@utils/validations/post.schema";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IPostFormProps {
  post: IPost | null;
  onClose: () => void;
}

export function PostForm({ post, onClose }: IPostFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : "",
      body: post ? post.body : "",
    },
    validationSchema: postSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (post) {
          await dispatch(
            updatePost({ ...values, userId: +user!.id, id: post.id })
          ).unwrap();
        } else {
          await dispatch(createPost({ ...values, userId: +user!.id })).unwrap();
        }
        toast.success(
          `Se ${post ? "editó" : "creó"} el post de forma exitosa `
        );
        onClose();
      } catch (error) {
        console.error(error);
        toast.error(
          `Ocurrió un error ${post ? "editando" : "creando"} el post `
        );
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (post) {
      formik.setValues({
        title: post.title,
        body: post.body,
      });
    } else {
      formik.setValues({
        title: "",
        body: "",
      });
    }
  }, [post]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-4'>
        <Input
          label='Título'
          type='text'
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Ingrese el título del post'
          error={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ""
          }
        />
      </div>
      <div className='mb-4'>
        <Textarea
          label='Descripción'
          name='body'
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Ingrese la descripción del post'
          error={
            formik.touched.body && formik.errors.body ? formik.errors.body : ""
          }
        />
      </div>
      <Button
        type='submit'
        disabled={loading || !formik.values.title || !formik.values.body}
      >
        {loading
          ? post
            ? "Actualizando Post..."
            : "Creando Post..."
          : post
          ? "Actualizar Post"
          : "Crear Post"}
      </Button>
    </form>
  );
}
