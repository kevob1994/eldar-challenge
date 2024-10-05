# eldar-challenge

Este repositorio fue construido con `Vite` + `React v18` + `TypeScript v5.5.3`.

## REQUISITOS

1. node 22.6.0
2. npm 10.8.3
3. `npm i`
4. `npm run dev`


### Utilidades


- [Redux toolkit](https://redux-toolkit.js.org/)
- [Redux react](https://react-redux.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React router dom](https://reactrouter.com/en/main)
- [React](https://es.reactjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Axios](https://axios-http.com/docs/intro)


### Develop

Para ejecutar la aplicación, ejecuta el siguiente comando:

```
cd eldar-challenge
primero se debe crear el archivo .env con la variable de entorno VITE_API_URL (la api que estamos haciendo uso es https://jsonplaceholder.typicode.com)
npm run dev

La aplicación cuenta con 2 usuarios con data mock para probar, que son:

- Usuario regular
email: user@example.com
password: password


- Usuario Admin
email: admin@example.com
password: password

A diferencia del usuario regular, el usuario admin tiene la posibilidad de editar, crear y eliminar
```

### Build

Para hacer el build de la aplicación y paquetes, ejecuta el siguiente comando:

```
cd eldar-challenge
npm run build
```


### Estructura Principal


1. Components:
	- La carpeta components contiene los componentes reutilizables de la interfaz de usuario.

2. Hooks:
	- La carpeta hooks incluye hooks personalizados de React para manejar lógica específica de la aplicación.

3. Interfaces:
	- En interfaces se definen las interfaces de TypeScript, lo que ayuda a garantizar la tipificación en el proyecto.

4. Pages:
	- La carpeta pages contiene las diferentes páginas de la aplicación, que se gestionan por la ruta.

5. Redux:
	- La carpeta redux se utiliza para gestionar el estado global de la aplicación mediante Redux y toda su configuración.

6. Routes:
	- La carpeta routes se encarga de la configuración de react router dom.

7. Servicios:
	- En services se implementan funciones que se comunican con APIs.

6. Utilidades:
	- La carpeta utils incluye funciones y constantes reutilizables en diferentes partes de la aplicación.


Esta estructura modular y organizada permite encapsular diferentes aspectos de la aplicación, asegurando que estén claramente definidos y separados, lo que a su vez facilita la legibilidad del código.

En el proyecto, aplicamos el principio de Atomic Design, lo que nos permite reutilizar cada uno de los componentes dentro de nuestra aplicación de forma autónoma, sin depender de otros.
