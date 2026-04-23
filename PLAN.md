# Contexto del taller: Portal web de ACECOM

## Propósito general

Este taller busca enseñar desarrollo web de forma práctica y con una narrativa similar a un proyecto real. La idea no es solo mostrar cómo hacer una página, sino cómo se construye una aplicación web con separación entre frontend y backend, consumo de API, persistencia básica, trabajo con ramas y despliegue final.

El proyecto del taller será un **portal web de ACECOM**.

## Objetivo del taller

Construir una aplicación web sencilla pero realista que permita mostrar:

* información de ACECOM
* miembros
* talleres
* blog
* comentarios moderados en posts

Además, el taller debe transmitir estas ideas principales:

1. **Frontend y backend tienen responsabilidades distintas**.
2. **El frontend consume una API expuesta por el backend**.
3. **La persistencia no siempre requiere una base de datos compleja; SQLite es suficiente para una demo funcional**.
4. **Los comentarios seguirán un flujo de moderación realista**.
5. **El proyecto terminará empaquetado con Docker para mostrar una salida cercana a producción**.

## Stack técnico

### Frontend

* Vue
* Vue Router

### Backend

* Fastify
* OpenAPI (vía `@fastify/swagger` + `@fastify/swagger-ui`)

### Base de datos

* SQLite
* Prisma como ORM

### Despliegue

* Docker para frontend y backend

## Alcance funcional del proyecto

### Frontend

El portal tendrá páginas o secciones para:

* Home
* Miembros
* Talleres
* Blog
* Detalle de post

### Backend

El backend expondrá una API para servir al frontend con datos de:

* miembros
* talleres
* posts
* comentarios

## Flujo de comentarios

Los comentarios no se publican directamente.

El usuario enviará:

* nombre
* comentario

El backend hará lo siguiente:

* guardará el comentario en SQLite usando Prisma
* marcará el comentario con `approved = false`
* solo devolverá al frontend los comentarios aprobados

Esto permite enseñar un flujo realista de moderación.

## Dinámica del taller

La dinámica debe seguir una narrativa simple y clara, con pocas etapas grandes, para que cada commit represente una idea importante del proyecto.

La historia del taller será esta:

1. nace el backend con una API respaldada por SQLite + seed editable
2. nace el frontend y consume esa API
3. se agregan comentarios moderados sobre la base existente
4. se dockeriza todo para despliegue
5. se cierra con una versión final publicable

La sesión debe sentirse como un recorrido de proyecto, no como una lista desordenada de código.

## Flujo de ramas

Se trabajará con un flujo simple. Las ramas de backend se crean **encadenadas** para que durante la exposición los PRs se abran en cascada sin conflictos, y cada una representa una etapa clara del taller.

```text
main
└── develop
    ├── feature/frontend-core
    └── feature/init
        └── feature/backend-core
            └── feature/persistence
                └── feature/comments
                    └── feature/deploy
                        └── feature/guest-members
```

### Sentido de cada rama

* `main`: versión estable o final del taller
* `develop`: integración del trabajo
* `feature/init`: inicialización del backend (TypeScript + Fastify listo para recibir rutas)
* `feature/backend-core`: endpoints de miembros/talleres/posts con OpenAPI, data en fixtures JSON
* `feature/persistence`: migración de los fixtures a Prisma + SQLite con seed en `.sql` editable
* `feature/frontend-core`: frontend base y conexión a la API (paralela a backend)
* `feature/comments`: comentarios moderados sobre la base que ya existe (parte desde `feature/persistence`)
* `feature/deploy`: dockerización (parte desde `feature/comments`)
* `feature/guest-members`: endpoint abierto `POST /api/members` para que los participantes se registren como "Miembro invitado" (cierre del taller, para que prueben la API desde Swagger o Thunder Client)

## Flujo de commits del taller

El backend se arma en cuatro pasos didácticos en lugar de un único super-commit, así cada etapa se puede explicar en vivo:

### 1. Inicialización del proyecto

**Rama:** `feature/init`

```bash
chore(backend): initialize project with typescript and fastify
```

Este commit debe incluir:

* `package.json`, `tsconfig.json`, `.gitignore`
* Fastify arrancando en el puerto 3000
* scripts `dev`, `build`, `start`
* README básico

Mensaje didáctico:

> Arrancamos sentando la base: TypeScript, Fastify y scripts para correr el servidor. Todavía no hay endpoints ni datos.

---

### 2. Endpoints con OpenAPI y data en fixtures

**Rama:** `feature/backend-core`

```bash
chore(backend): bootstrap fastify api with members workshops and posts endpoints
```

Este commit debe incluir:

* prefijo `/api`
* endpoint de miembros (con links a Instagram, LinkedIn y GitHub)
* endpoint de talleres (cada uno con los miembros que lo exponen)
* endpoint de posts (body en markdown)
* endpoint de detalle de post
* documentación OpenAPI expuesta en `/api/docs`
* data servida desde fixtures JSON-like en `src/data/`

Mensaje didáctico:

> Ahora el backend expone los endpoints del portal con OpenAPI. La data todavía es estática (fixtures), pero el contrato de la API queda fijo.

---

### 3. Migración a Prisma + SQLite con seed editable

**Rama:** `feature/persistence`

```bash
feat(backend): migrate json fixtures to prisma sqlite with editable seed.sql
```

Este commit debe incluir:

* Prisma 7 con `@prisma/adapter-better-sqlite3`
* `prisma.config.ts`, `prisma/schema.prisma` (Member, Workshop, WorkshopPresenter, Post)
* relación **Member → Post** (un miembro puede tener muchos posts; `Post.authorId` FK)
* `prisma/seed.sql` editable con todos los datos (reemplaza a los fixtures); un único post inicial escrito por Sergio
* `prisma/seed.ts` (runner del seed)
* migración inicial aplicada
* rutas reescritas para consultar la DB; `/api/posts` y `/api/posts/:id` devuelven `author` como objeto `Member` anidado
* script `db:init` en `package.json` (`prisma generate && prisma migrate deploy && prisma db seed`) para que quien clona el repo deje el backend listo con un solo comando

Mensaje didáctico:

> Reemplazamos los fixtures por persistencia real: Prisma + SQLite y un archivo `seed.sql` que cualquiera puede editar a mano para cambiar el contenido del portal.

---

### 4. Frontend base

**Rama:** `feature/frontend-core`

```bash
feat(frontend): create acecom portal pages with vue router and api integration
```

Este commit debe incluir:

* proyecto Vue
* Vue Router
* páginas de Home, Members, Workshops, Blog y BlogDetail
* consumo de API desde el frontend

Mensaje didáctico:

> Ahora construimos el frontend y lo conectamos al backend para consumir datos reales.

---

### 5. Comentarios moderados

**Rama:** `feature/comments`

```bash
feat(comments): add prisma sqlite comments with moderation flow
```

Este commit debe incluir:

* modelo `Comment` agregado al schema de Prisma (con relación FK a `Post`)
* migración aplicada
* creación de comentarios con `approved = false`
* endpoint para enviar comentarios
* endpoint para listar solo comentarios aprobados
* formulario de comentario en frontend
* lista de comentarios aprobados en el detalle del blog
* mensaje en frontend indicando que el comentario fue enviado para revisión

Mensaje didáctico:

> Agregamos una feature más cercana a producción: comentarios con moderación sobre la base de datos que ya existía.

---

### 6. Dockerización

**Rama:** `feature/deploy`

```bash
chore(deploy): dockerize frontend and backend for production
```

Este commit debe incluir:

* Dockerfile del frontend
* Dockerfile del backend (multi-stage con migración + seed al arranque)
* configuración necesaria para correr ambos servicios en contenedores

Mensaje didáctico:

> Empaquetamos el proyecto para que quede listo para ejecutarse de forma consistente y acercarlo a producción.

---

### 7. Endpoint abierto para los participantes

**Rama:** `feature/guest-members`

```bash
feat(members): add open post endpoint to self-register as guest member
```

Este commit debe incluir:

* `POST /api/members` abierto (sin auth)
* el backend fuerza `role = "Miembro invitado"` y genera un `id` `guest-<uuid>`
* schema del body validado con OpenAPI (name, bio, links opcionales)
* ejemplo en el README para curl / Swagger UI / Thunder Client

Mensaje didáctico:

> Cerramos el taller con un endpoint abierto donde los participantes se registran como "Miembro invitado" desde la propia Swagger UI o Thunder Client. Es la excusa perfecta para enseñar cómo se prueba una API real contra el servidor que acabamos de dockerizar.

---

### 8. Cierre del taller

**Merge:** `develop -> main`

```bash
release: publish acecom portal workshop version
```

Mensaje didáctico:

> Cerramos el proyecto con una versión estable y publicable.

## Versión final resumida del historial

Si se quiere mostrar el flujo completo de forma muy clara, este es el historial ideal:

```bash
chore(backend): initialize project with typescript and fastify
chore(backend): bootstrap fastify api with members workshops and posts endpoints
feat(backend): migrate json fixtures to prisma sqlite with editable seed.sql
feat(frontend): create acecom portal pages with vue router and api integration
feat(comments): add prisma sqlite comments with moderation flow
chore(deploy): dockerize frontend and backend for production
feat(members): add open post endpoint to self-register as guest member
release: publish acecom portal workshop version
```

## Qué debe transmitir el taller

Este taller no debe venderse como “hagamos una landing”.
Debe presentarse como:

> Un taller donde se construye un portal web real, separando frontend y backend, consumiendo una API, agregando persistencia con Prisma y SQLite, aplicando un flujo básico de moderación, y terminando con dockerización para despliegue.

## Resultado esperado

Al final del taller debería existir:

* un portal funcional de ACECOM
* páginas para miembros, talleres y blog
* detalle de post con comentarios
* comentarios persistidos con SQLite y Prisma
* moderación básica en backend
* frontend conectado al backend vía API
* frontend y backend dockerizados
* una versión final integrable o desplegable

## Criterio de simplicidad

El taller debe mantener una complejidad controlada.
No se busca construir un CMS completo ni autenticación.
No se debe incluir:

* login
* panel admin completo
* subida de imágenes
* edición de posts desde interfaz
* roles y permisos
* moderación compleja

La idea es enseñar bien las bases, no abarcar demasiado.

## Resumen en una frase

La narrativa del taller es:

> construir un portal web de ACECOM con Vue y Fastify, conectarlo mediante API, añadir comentarios moderados con Prisma y SQLite, y cerrar con dockerización como paso hacia producción.
