# Taskaroo - Frontend

## Descripción

Este es el frontend de la aplicación Taskaroo, una aplicación de gestión de tareas para cada uno de los usuarios creados en la aplicación. La aplicación permite a los usuarios crea tareas, marcarlas como completadas o no completadas. La aplicación también permite crear usuarios y visualizar las tareas que tiene cada uno.

## Sitio web

La aplicación se puede utilizar en el siguiente enlace: [Taskaroo](https://sacastrot.github.io/taskaroo-frontend/#/)

## IDE y Extensiones Recomendadas

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y desactivar Vetur).

## Tecnologías

- [Vue 3](https://v3.vuejs.org/) - Frontend Framework
- [Vue Router](https://router.vuejs.org/) - Routing Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Code Formatter

## Instalación

1. Clonar el repositorio

```sh
git clone https://github.com/sacastrot/taskaroo-frontend.git
```

2. Instalar dependencias

```sh
npm install
```

3. Crear archivo `.env.development` en la raíz del proyecto con el dominio del backend. Por ejemplo, puede dirigirse al repositorio del backend [aquí](https://github.com/sacastrot/taskaroo-backend.git):

```sh
VITE_API_URL=http://localhost:8000
```

4. Iniciar el servidor de desarrollo

```sh
npm run dev
```

### Compilar para Producción

```sh
npm run build
```

## Estructura de Archivos

- **public**: Archivos estáticos, como imágenes, favicon, etc.
- **dist**: Archivos compilados minimizados de la aplicación para el despliegue.
- **src**: Código fuente de la aplicación.

  - **assets**: Archivos estáticos, como estilos css, entro otros.
  - **components**: En esta carpeta se encuentran todos los componentes de la aplicación.
  - **models**: Modelos que permiten dar estructura a la información.
    - **models/error**: Modelos de errores que se manejan en la aplicación.
  - **router**: Configuración de todas las rutas de la aplicación.
  - **services**: Servicios para realizar peticiones HTTP.
  - **views**: Vistas principales de la aplicación, las vistas se cargan en el router, y cada vista usa los componentes disponibles.
  - **App.vue**: Componente raíz de la aplicación, este componente es el punto de entrada de la aplicación.
  - **main.ts**: En este archivo se inicializa la aplicación con el plugin de Vue.js, Monta la aplicación en el DOM en el elemento con el id `app`.

- **.env.development**: Archivo de configuración para el entorno de desarrollo.
- **.env.example**: Archivo de configuración de variables de entorno.
- **.eslintrc.js**: Archivo de configuración de ESLint. Este archivo se utiliza para definir las reglas de linteo de código.
- **.ginignore**: Archivo de configuración de los archivos que se ignoran en Git.
- **.prettierrc**: Archivo de configuración de Prettier. Este archivo se utiliza para definir las reglas de formato de código.
- **package.json**: Archivo de configuración de los paquetes de Node.js.
- **postcss.config.js**: Archivo de configuración de PostCSS. Este archivo se utiliza para definir las reglas de PostCSS. Para TailwindCSS.
- **README.md**: Archivo de documentación del proyecto.
- **tailwind.config.js**: Archivo de configuración de TailwindCSS. Este archivo se utiliza para definir las reglas de TailwindCSS. Como los colores, fuentes, tamaños, etc.
- **tsconfig.json**: Archivo de configuración de TypeScript. Este archivo se utiliza para definir las reglas de TypeScript.
- **tsconfig.app.json**: Archivo de configuración de TypeScript. Este archivo se utiliza para definir las reglas de TypeScript para la aplicación.
- **tsconfig.node.json**: Archivo de configuración de TypeScript. Este archivo se utiliza para definir las reglas de TypeScript para Node.js.
- **vite.config.ts**: Archivo de configuración de Vite. Este archivo se utiliza para definir las reglas de Vite. Como plugins, alias, etc.

## Funcionamiento

La aplicación permite a los usuarios crear tareas, marcarlas como completadas o no completadas. La aplicación también permite crear usuarios y visualizar las tareas que tiene cada uno.

1. El componente `App.vue` es el componente raíz de la aplicación. En este componente se encuentra el componente `RouterView` que carga las rutas de la aplicación.
2. El router carga una ruta específica, que corresponde a una vista de la carpeta `views`. Cada vista carga los componentes necesarios para mostrar la información.
3. Los componentes se encuentran en la carpeta `components`. Cada componente tiene su propio archivo `.vue` y su archivo `.ts` para el código TypeScript, los componentes y las vistas usan servicios para realizar peticiones HTTP al backend y poder mostrar la información, enviar información, etc. Estos servicios son importados desde la carpeta `services`.
4. Los modelos se encuentran en la carpeta `models`. Los modelos permiten dar estructura a la información que se recibe del backend, como los usuarios, tareas, errores, etc.

## Autor

Santiago Castro - Desarrollador de software y estudiante de ingeniería de sistemas en la Universidad Nacional de Colombia.

[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?style=flat-square&logo=github)](https://github.com/sacastrot)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/santiago-castro-tabares/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-Profile-blue?style=flat-square&logo=stackoverflow)](https://stackoverflow.com/users/19891867/santiago)
