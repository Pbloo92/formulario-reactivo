# FormularioReactivo

Práctica de Ionic + Angular para comparar **Reactive Forms** y **Template-Driven Forms**.

## Requisitos

- Node.js LTS compatible con Angular 19
- npm
- Git

## Ejecutar en local

```bash
npm install
npm start
```

La aplicación se abre normalmente en `http://localhost:8100`.

Para compilar:

```bash
npm run build
```

## Páginas

- `/registro`: formulario reactivo con `FormBuilder`, `Validators`, fecha máxima, alerta de confirmación, modo oscuro y descarga de PDF.
- `/driven`: formulario Template-Driven con `FormsModule`, `ngModel` y validación desde la plantilla.

## Seguridad

La práctica simula el envío en el cliente. No imprime la contraseña en consola ni la incluye en el PDF. No hay backend ni persistencia de datos. En una aplicación real, las contraseñas deben enviarse por HTTPS y almacenarse únicamente en el servidor mediante un hash seguro de contraseñas.

## Historial de Git recomendado

Haz commits pequeños después de terminar cada fase, en vez de realizar un único commit final:

```bash
git add .
git commit -m "chore: crear proyecto inicial Ionic Angular"
git push
```

Ejemplos para commits posteriores:

- `feat: crear RegistroPage y DrivenPage`
- `feat: implementar formulario reactivo y validaciones`
- `feat: añadir formulario template-driven`
- `style: adaptar formularios a dispositivos moviles`
- `fix: corregir validaciones y revisar seguridad`
- `chore: preparar despliegue en Vercel`

Si el ZIP se descarga sin historial Git, inicializa tu propio repositorio y crea los commits a medida que revises y completes las fases. No simules commits antiguos: cada commit debe reflejar cambios reales.

## GitHub

1. Crea un repositorio vacío llamado `FormularioReactivo`.
2. Inicializa Git en esta carpeta si no existe.
3. Añade el remoto de GitHub.
4. Publica la rama `main`.

## Vercel

Importa el repositorio GitHub. Usa `npm run build` como comando de compilación y verifica el directorio generado en `dist/formulario-reactivo/browser` antes de fijar el directorio de salida. Si la aplicación SPA necesita fallback para rutas, revisa la configuración de reescrituras de Vercel.

## Responsive

Prueba en Chrome DevTools con anchos aproximados de 320 px, 390 px, 768 px y 1366 px.
