# 🚀 Guía de Despliegue - Sistema de Biblioteca

## 📋 Requisitos Previos
- Cuenta en GitHub (ya tienes el repo)
- Base de datos Supabase (ya configurada)

---

## 🔷 PARTE 1: Desplegar Backend en Render (5 minutos)

### Paso 1: Crear cuenta en Render
1. Ve a [https://render.com/](https://render.com/)
2. Click en **"Get Started"** o **"Sign Up"**
3. Selecciona **"Sign up with GitHub"**
4. Autoriza a Render para acceder a tu GitHub

### Paso 2: Crear Web Service
1. En el dashboard de Render, click en **"New +"** → **"Web Service"**
2. Busca y selecciona tu repositorio: **`ulicseg/biblioteca`**
3. Click en **"Connect"**

### Paso 3: Configurar el servicio
Completa los siguientes campos:

- **Name**: `biblioteca-backend` (o el nombre que prefieras)
- **Region**: `Oregon (US West)` (el más cercano que sea gratis)
- **Branch**: `master`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: **"Free"** ⚠️ (MUY IMPORTANTE)

### Paso 4: Configurar Variables de Entorno
Scroll hacia abajo hasta **"Environment Variables"** y agrega:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | (copia de tu archivo backend/.env) |
| `SUPABASE_KEY` | (copia de tu archivo backend/.env) |
| `PORT` | `3000` |

### Paso 5: Deploy
1. Click en **"Create Web Service"**
2. Espera 2-3 minutos mientras se despliega
3. Cuando termine, verás: ✅ **"Live"** en verde
4. **COPIA LA URL** que te da (será algo como: `https://biblioteca-backend.onrender.com`)

---

## 🔶 PARTE 2: Desplegar Frontend en Vercel (3 minutos)

### Paso 1: Crear cuenta en Vercel
1. Ve a [https://vercel.com/](https://vercel.com/)
2. Click en **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel

### Paso 2: Importar proyecto
1. En el dashboard, click en **"Add New..."** → **"Project"**
2. Busca y selecciona: **`ulicseg/biblioteca`**
3. Click en **"Import"**

### Paso 3: Configurar el proyecto
Completa:

- **Framework Preset**: `Vite`
- **Root Directory**: Click en **"Edit"** → Selecciona **`frontend`**
- **Build Command**: `npm run build` (viene por defecto)
- **Output Directory**: `dist` (viene por defecto)

### Paso 4: Variables de Entorno
Click en **"Environment Variables"** y agrega:

| Name | Value |
|------|-------|
| `VITE_API_URL` | La URL de Render que copiaste (ej: `https://biblioteca-backend.onrender.com`) |
| `VITE_SUPABASE_URL` | (copia de tu frontend/.env) |
| `VITE_SUPABASE_ANON_KEY` | (copia de tu frontend/.env) |

### Paso 5: Deploy
1. Click en **"Deploy"**
2. Espera 1-2 minutos
3. Cuando termine verás: 🎉 **Confetti animation**
4. Click en **"Continue to Dashboard"**
5. Tu app está en: `https://tu-proyecto.vercel.app`

---

## 🔧 PARTE 3: Actualizar la URL del Backend en el Frontend

Ahora necesitas actualizar el código del frontend para que apunte al backend en producción:

### Opción A: Usando variable de entorno (Recomendado)
Tu archivo `frontend/src/api/bibliotecaApi.js` ya debería estar usando:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

✅ Si ya lo tienes así, ¡no necesitas hacer nada más!

### Opción B: Si NO está usando variables de entorno
Edita `frontend/src/api/bibliotecaApi.js` y cambia:
```javascript
const API_BASE_URL = 'https://biblioteca-backend.onrender.com'; // Tu URL de Render
```

---

## ✅ Verificar que todo funciona

### Backend (Render)
1. Abre tu URL de Render: `https://tu-backend.onrender.com`
2. Deberías ver: `{"mensaje":"API de Biblioteca funcionando"}`

### Frontend (Vercel)
1. Abre tu URL de Vercel: `https://tu-proyecto.vercel.app`
2. Deberías ver la pantalla de login
3. Intenta hacer login con un usuario de prueba

---

## ⚠️ IMPORTANTE: Configurar CORS

Si ves errores de CORS en la consola del navegador, necesitas actualizar el backend:

Edita `backend/index.js` y asegúrate que el CORS permita tu dominio de Vercel:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tu-proyecto.vercel.app' // Agrega tu URL de Vercel aquí
  ]
}));
```

Luego haz commit y push:
```bash
git add .
git commit -m "fix: agregar URL de Vercel a CORS"
git push origin master
```

Render se redesplega automáticamente cuando detecta cambios en GitHub.

---

## 🎯 URLs Finales

Una vez desplegado, tendrás:

- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://biblioteca-backend.onrender.com`
- **Base de datos**: Ya en Supabase (cloud)

---

## 💡 Consejos

1. **Render FREE tier**: El backend se "duerme" después de 15 minutos sin uso. La primera request tarda ~30 segundos en despertar.
2. **Vercel FREE tier**: Ilimitado para proyectos personales
3. **Redespliegue automático**: Ambos servicios se redesplegan automáticamente cuando haces `git push`

---

## 🆘 Problemas Comunes

### Error: "Cannot connect to backend"
- ✅ Verifica que la variable `VITE_API_URL` esté correcta en Vercel
- ✅ Verifica que el backend esté "Live" en Render

### Error: "CORS policy"
- ✅ Agrega la URL de Vercel al CORS del backend (ver sección CORS arriba)

### Backend muy lento
- ⏰ Normal en el plan gratuito. Primera request tarda ~30 segundos (el servidor "despierta")

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas, revisa los logs:
- **Render**: Dashboard → Tu servicio → Pestaña "Logs"
- **Vercel**: Dashboard → Tu proyecto → Pestaña "Deployments" → Click en el deployment → "Build Logs"
