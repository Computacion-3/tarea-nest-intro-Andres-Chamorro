
# Taller: NestJS con TypeORM, Roles, Permisos y Games

## Descripción

Este taller muestra la evolución de un proyecto NestJS:

* Inicia con un sistema en memoria para manejar **usuarios** y **roles**.
* Se migra a una base de datos relacional usando **TypeORM**.
* Se añaden nuevas entidades y relaciones:

  * **Roles ↔ Permisos** (ManyToMany).
  * **Usuarios ↔ Games** (OneToMany).

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone "https://github.com/Computacion-3/tarea-nest-intro-Andres-Chamorro.git"
cd my-nest-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo **.env** en la raíz con las siguientes variables (ajusta según tu entorno):

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5435
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=mydatabase
DB_SYNCHRONIZE=true
```

### 4. Ejecutar la aplicación

```bash
npm run start:dev
```

La API estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Estructura del proyecto

```
src/
├── app.module.ts
├── users/
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── roles/
│   ├── dto/
│   ├── entities/
│   ├── roles.controller.ts
│   ├── roles.module.ts
│   └── roles.service.ts
├── permissions/
│   ├── dto/
│   ├── entities/
│   ├── permissions.controller.ts
│   ├── permissions.module.ts
│   └── permissions.service.ts
├── games/
│   ├── dto/
│   ├── entities/
│   ├── games.controller.ts
│   ├── games.module.ts
│   └── games.service.ts
```

---

## Entidades y relaciones

### **User**

* `id`, `username`, `email`, `passwordHash`, `bio`, `createdAt`.
* Relación:

  * Muchos usuarios **pertenecen a un rol** (`ManyToOne`).
  * Un usuario puede tener **muchos juegos** (`OneToMany`).

### **Role**

* `id`, `name`, `description`.
* Relación:

  * Un rol puede tener **muchos usuarios**.
  * Un rol puede tener **muchos permisos** (`ManyToMany`).

### **Permission**

* `id`, `name`, `description`.
* Relación:

  * Muchos permisos pueden estar en **muchos roles** (`ManyToMany`).

### **Game**

* `id`, `title`, `genre`, `createdAt`.
* Relación:

  * Un juego pertenece a **un usuario** (`ManyToOne`).

---

## Endpoints principales

### Users

* `POST /users` → Crear usuario
* `GET /users` → Listar todos
* `GET /users/:id` → Buscar por ID
* `PATCH /users/:id` → Actualizar
* `DELETE /users/:id` → Eliminar

### Roles

* `POST /roles` → Crear rol
* `GET /roles` → Listar todos
* `GET /roles/:id` → Buscar por ID
* `PATCH /roles/:id` → Actualizar
* `DELETE /roles/:id` → Eliminar

### Permissions

* `POST /permissions` → Crear permiso
* `GET /permissions` → Listar todos
* `GET /permissions/:id` → Buscar por ID
* `PATCH /permissions/:id` → Actualizar
* `DELETE /permissions/:id` → Eliminar

### Games

* `POST /games` → Crear juego
* `GET /games` → Listar todos
* `GET /games/:id` → Buscar por ID
* `PATCH /games/:id` → Actualizar
* `DELETE /games/:id` → Eliminar

---

## Ejemplos de requests (JSON)

### Crear un Role

```json
POST /roles
{
  "name": "admin",
  "description": "Administrador del sistema"
}
```

### Crear un Permission

```json
POST /permissions
{
  "name": "create_user",
  "description": "Permite crear usuarios"
}
```

### Crear un User

```json
POST /users
{
  "username": "oscar",
  "email": "oscar@example.com",
  "passwordHash": "123456",
  "bio": "Estudiante",
  "roleName": "admin"
}
```

### Crear un Game

```json
POST /games
{
  "title": "Zelda",
  "genre": "Adventure",
  "userId": 1
}
```

---

¿Quieres que en este README también te agregue una sección de **Pruebas con Postman** (con colecciones listas para importar), o con esto que te dejé ya te sirve para entregar?
