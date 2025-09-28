# ⚽ Organizador de Partidos de Fútbol

Una aplicación web moderna para organizar partidos de fútbol en el barrio con inteligencia artificial para crear equipos balanceados.

## 🌟 Características

- **🤖 IA para Equipos Balanceados**: Algoritmo inteligente que distribuye jugadores según habilidades
- **👥 Gestión de Jugadores**: Registro completo con niveles de habilidad y posiciones preferidas
- **📅 Programación de Partidos**: Sistema completo para organizar encuentros con fecha, hora y ubicación
- **📊 Estadísticas Detalladas**: Seguimiento de rendimiento y porcentajes de victoria
- **💾 Datos Persistentes**: Toda la información se guarda localmente en el navegador
- **📱 Responsive**: Funciona perfectamente en móviles y tablets

## 🚀 Tecnologías Utilizadas

- **Next.js** - Framework de React para producción
- **React** - Biblioteca para interfaces de usuario
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos
- **LocalStorage** - Persistencia de datos sin servidor

## 📦 Instalación

### Prerrequisitos
- Node.js 18.0 o superior
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd organizador-futbol-barrio
```

2. **Instala las dependencias**
```bash
npm install
# o
yarn install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abre tu navegador**
Navega a [http://localhost:3000](http://localhost:3000)

## 🎮 Cómo Usar la Aplicación

### 1. Agregar Jugadores
- Ve a la pestaña "Jugadores"
- Completa el nombre, nivel de habilidad (1-10) y posición preferida
- Haz clic en "Agregar Jugador"

### 2. Programar un Partido
- Ve a la pestaña "Partidos"
- Selecciona fecha, hora y ubicación
- Haz clic en "Crear Partido con IA"
- El sistema creará automáticamente equipos balanceados

### 3. Registrar Resultados
- Una vez finalizado el partido, ingresa los marcadores
- Haz clic en "Finalizar" para actualizar las estadísticas

### 4. Ver Estadísticas
- Ve a la pestaña "Estadísticas"
- Consulta el rendimiento de cada jugador
- Revisa el resumen general de actividad

## 🏗️ Estructura del Proyecto

```
organizador-futbol-barrio/
├── package.json          # Dependencias y scripts
├── next.config.js        # Configuración de Next.js
├── tailwind.config.js    # Configuración de Tailwind CSS
├── postcss.config.js     # Configuración de PostCSS
├── pages/
│   ├── _app.js          # Configuración global de la app
│   ├── _document.js     # Configuración del documento HTML
│   └── index.js         # Página principal de la aplicación
└── styles/
    └── globals.css      # Estilos globales con Tailwind
```

## 🚀 Despliegue en Vercel

1. **Fork o clona este repositorio**
2. **Conecta tu GitHub con Vercel** en [vercel.com](https://vercel.com)
3. **Importa el proyecto** desde tu repositorio
4. **Despliega automáticamente** - Vercel detecta Next.js

### Variables de Entorno
Este proyecto no requiere variables de entorno para funcionar.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Funcionalidades Futuras

- [ ] Sistema de notificaciones por WhatsApp/SMS
- [ ] Integración con calendarios (Google Calendar, Outlook)
- [ ] Sistema de pagos para alquiler de canchas
- [ ] Modo torneo con eliminatorias
- [ ] Ratings y comentarios de jugadores
- [ ] Geolocalización de canchas cercanas
- [ ] Aplicación móvil nativa

## 🐛 Reportar Problemas

Si encuentras un bug o tienes una sugerencia, por favor abre un [issue](../../issues) en GitHub.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- Comunidad de desarrolladores de Next.js
- Contribuyentes de Tailwind CSS
- Iconos proporcionados por Lucide
- Comunidades deportivas locales que inspiraron este proyecto

---

**¡Hecho con ❤️ para las comunidades deportivas!**

_¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!_