# ✨ Nombre del Proyecto - Backend

Backend desarrollado con **Node.js** y **Express**, generado a partir de `express-generator`.  
Provee API REST para el To Do List.

## 🚀 Tecnologías principales

- Node.js (v18 o superior recomendado)
- Express.js
- Express Generator
---

📋 Requisitos previos

Asegúrate de tener instalado:

Node.js (>= 18.x recomendado)
npm (>= 9.x) o yarn
Git

Verifica versiones:
node -v
npm -v

## 📦 Instalación

1. Clona el repositorio:
   
git clone https://github.com/LuisEstuardoLima/ToDoListProyect-backend.git
cd ToDoListProyect-backend

# Instala las dependencias: npm install 

▶️ Ejecución del proyecto

🔹 Modo producción: npm start

🌐 Acceso a la API

Una vez iniciado el servidor:

http://localhost:3000

📁 Estructura del proyecto (Express Generator)

├── bin/
│   └── www                # Archivo de inicio del servidor
├── public/                # Archivos estáticos (si aplica)
├── routes/                # Definición de rutas
│   ├── goals.js
|   ├── index.js
|   ├── tasks.js
│   └── users.js
├── views/                 # Vistas (si usas templates, ej: Jade/Pug)
├── app.js                 # Configuración principal de Express
├── package-lock.json
├── package.json
└── README.md

📡 Endpoints principales (ejemplo)

➔ /getTasks - GET

➔ /getGoals - GET

➔ /removeTask - DELETE

➔ /removeGoal - DELETE

➔ /addTask - POST

➔ /addGoal - POST


Estos Endpoints se pueden verificar usando Postman.
