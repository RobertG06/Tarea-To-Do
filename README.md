Gestor de Tareas (Vue 3 + Laravel + PostgreSQL)

Esta es una aplicación sencilla de Gestor de Tareas desarrollada con Vue 3 en el frontend y Laravel en el backend, usando PostgreSQL como base de datos. La app permite:

Listar tareas

Crear nuevas tareas

Marcar tareas como completadas

Eliminar tareas
--------------------------------------------------------------------------
Contenido del repositorio

Frontend (Vue 3): carpeta frontend

Componentes reutilizables:

TaskForm.vue → Formulario para crear nuevas tareas

TaskList.vue → Lista de tareas con opciones de marcar y eliminar

Servicio de API: src/services/api.js usando axios

Backend (Laravel): carpeta backend

API REST en routes/api.php

Modelo Task con campos: id, title, description, completed, created_at, updated_at
-------------------------------------------------------------------------------------------
Requisitos

Node.js (v18+) y npm

PHP (v8+)

Composer

PostgreSQL

Navegador moderno
-------------------------------------------------------------------------------------------
Configuración del Backend (Laravel + PostgreSQL)

Clonar el repositorio o descargar el backend.

Instalar dependencias de Laravel:

composer install
------------------------------------------------------------

Crear archivo .env basado en .env.example y configurar la base de datos PostgreSQL:

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=tasks_db
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña

------------------------------------------------------------------------------
Generar la clave de la aplicación:

php artisan key:generate

-------------------------------------------------------------------------------
Crear la tabla tasks ejecutando las migraciones:

php artisan migrate

-------------------------------------------------------------------------------
Levantar el servidor de Laravel:

php artisan serve

Por defecto estará disponible en: http://localhost:8000
--------------------------------------------------------------------------------

Configuración del Frontend (Vue 3)

Ir a la carpeta frontend:

cd frontend

Instalar dependencias:

npm install

Crear un archivo .env en frontend con la URL de la API del backend:

VITE_API_BASE=http://localhost:8000/api/v1

Iniciar la aplicación frontend en modo desarrollo:

npm run dev

Por defecto estará disponible en: http://localhost:5173
