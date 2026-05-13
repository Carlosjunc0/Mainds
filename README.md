# MAINDS - Maquinados Industriales del Sur

Plataforma web para MAINDS, mostrando su capacidad técnica, precisión milimétrica y soluciones industriales complejas.

## Tecnologías

- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion, React Router Dom.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Nodemailer.

## Requisitos Previos

- Node.js (v18 o superior recomendado)
- MongoDB (Local o Atlas)
- Cuenta de correo electrónico para Nodemailer (ej. Gmail con contraseña de aplicación)

## Configuración y Ejecución

### 1. Variables de Entorno

#### Backend
Navega a la carpeta `backend` y renombra o copia el archivo `.env.example` a `.env`. Completa las variables con tus credenciales:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mainds
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=maquinados.indelsur@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion
```

### 2. Instalación de Dependencias

Para el Frontend:
```bash
cd frontend
npm install
```

Para el Backend:
```bash
cd backend
npm install
```

### 3. Ejecución en Entorno de Desarrollo

Iniciar el servidor Backend (con Nodemon):
```bash
cd backend
npm run dev
```

Iniciar el Frontend (Vite):
```bash
cd frontend
npm run dev
```

El frontend estará disponible normalmente en `http://localhost:5173` y el backend en `http://localhost:5000`.

## Estructura del Proyecto

- `/frontend`: Aplicación en React.
- `/backend`: API RESTful en Node.js.