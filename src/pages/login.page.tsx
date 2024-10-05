import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@redux/store";
import { login } from "@redux/slices/auth.slice";
import { useFormik } from "formik";
import { loginSchema } from "@utils/validations/auth.schema";
import { Button, Input } from "@components";

export function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      {" "}
      <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-md'>
        {" "}
        <h2 className='text-2xl font-bold mb-6 text-center'>Inicio de sesión</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label='Correo electrónico'
            type='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Ingrese su correo electrónico'
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <Input
            label='Contraseña'
            type='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Ingrese su contraseña'
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
          <Button type='submit' disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
