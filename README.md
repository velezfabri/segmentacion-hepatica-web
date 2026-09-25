# Segmentación Hepática Asistida por Deep Learning

Sitio web estático para la recepción de solicitudes y estudios tomográficos orientados a la segmentación automática del hígado y de sus segmentos de Couinaud (I–VIII) mediante modelos de Deep Learning (3D U-Net).

---

## 🔬 Características del proyecto

- **Contexto clínico y de investigación**: Dirigido a médicos radiólogos, cirujanos hepatobiliares e investigadores biomédicos.
- **Sin backend complejo ni base de datos**: Arquitectura puramente estática en React + TypeScript + Tailwind CSS.
- **Flujo de dos pasos**:
  1. El profesional completa el formulario de solicitud con sus datos institucionales y acepta los términos de anonimización e investigación.
  2. Tras registrar la solicitud (vía Formspree), el sistema presenta el panel de confirmación con el botón directo hacia la carpeta o *File Request* de Dropbox.
- **Visualizador interactivo de segmentos de Couinaud**: Esquema de referencia anatómica para los segmentos I a VIII y su correspondencia con etiquetas NIfTI.
- **Compatibilidad**: Estudios en formato NIfTI (`.nii`, `.nii.gz`) o series axiales DICOM comprimidas en un único archivo `.zip`. Salida visualizable en herramientas médicas estándar como [3D Slicer](https://www.slicer.org/).

---

## ⚙️ Configuración de URLs (Formspree y Dropbox)

Las URLs pueden modificarse de dos maneras:

### 1. Mediante archivo de configuración central
Edita el archivo:
```ts
client/src/config.ts
```

```ts
export const siteConfig: SiteConfig = {
  formspreeUrl: "https://formspree.io/f/tu-endpoint",
  dropboxUrl: "https://www.dropbox.com/request/tu-enlace-de-subida",
  githubUrl: "https://github.com/velezfabri/PI-Velez-Final",
  turnaroundTime: "habitualmente dentro de las siguientes 24 horas",
};
```

### 2. Mediante variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
VITE_FORMSPREE_URL=https://formspree.io/f/tu-endpoint
VITE_DROPBOX_URL=https://www.dropbox.com/request/tu-enlace-de-subida
```

---

## 🚀 Ejecución en desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor local Vite
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 📦 Construcción para producción (Exportación independiente)

Para generar la compilación estática lista para subir a cualquier proveedor de hosting estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages, AWS S3, etc.):

```bash
pnpm build
```

Los archivos finales de distribución se generarán en la carpeta:
`dist/public`

---

## 📚 Repositorio del modelo de investigación

- **GitHub**: [https://github.com/velezfabri/PI-Velez-Final](https://github.com/velezfabri/PI-Velez-Final)

---

## ⚠️ Aviso de investigación

Las segmentaciones generadas tienen fines de investigación y evaluación biomédica. Los resultados deben ser revisados por un profesional cualificado y no deben utilizarse de forma independiente para tomar decisiones diagnósticas o terapéuticas.
