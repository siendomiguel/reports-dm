# YouTube Analytics Reports - Documentation Site

Sitio de documentación construido con Docusaurus para visualizar reportes de análisis de YouTube.

## 📊 Reportes Actuales

- **Video 15-10-25**: Análisis de rendimiento con 33,713 vistas
- **Video 29-09-25**: Análisis comparativo de métricas
- **Análisis Comparativo**: Resumen de tendencias y recomendaciones

## 🚀 Quick Start

### Desarrollo Local

```bash
cd /e/dev/proyectos/daniel-muvdi/docs-stats-repo
npm start
```

El sitio estará disponible en `http://localhost:3000/docs-stats-repo/`

### Build de Producción

```bash
npm run build
npm run serve
```

## 📝 Agregar Nuevos Reportes

### Método 1: Script Automático (Recomendado)

```bash
./add-report.sh ../reports-youtube/nuevo-reporte.md
```

Este script:
- Copia el archivo desde `reports-youtube/`
- Agrega el frontmatter necesario
- Añade el botón de exportación PDF
- Escapa caracteres problemáticos automáticamente

### Método 2: Manual

1. Copia tu archivo `.md` a `docs/reports/`
2. Agrega el frontmatter al inicio:

```markdown
---
sidebar_position: 5
---

import PDFExport from '@site/src/components/PDFExport';

<PDFExport />

# Tu Reporte

Contenido aquí...
```

**Importante**: Si tu reporte contiene símbolos `<`, escríbelos como `&lt;` para evitar errores de compilación.

## 📁 Estructura del Proyecto

```
docs-stats-repo/
├── docs/reports/                    # Reportes en formato .md
│   ├── intro.md                     # Página principal
│   ├── youtube-analytics-report-video-15-10-25.md
│   ├── youtube-analytics-report-video-29-09-25.md
│   └── comparative-analysis-summary.md
├── src/
│   ├── components/PDFExport/        # Componente de exportación
│   └── css/custom.css               # Estilos personalizados
├── add-report.sh                    # Script helper
├── docusaurus.config.ts             # Configuración
└── README.md
```

## 🌐 Deploy a GitHub Pages

### Configuración Inicial

1. **Edita `docusaurus.config.ts`** y reemplaza:
   ```typescript
   url: 'https://TU_USUARIO_GITHUB.github.io',
   organizationName: 'TU_USUARIO_GITHUB',
   ```

2. **Crea el repositorio en GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: YouTube Analytics Reports"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/docs-stats-repo.git
   git push -u origin main
   ```

3. **Configura GitHub Pages**:
   - Ve a Settings > Pages
   - Source: GitHub Actions

El sitio se desplegará automáticamente en:
```
https://TU_USUARIO_GITHUB.github.io/docs-stats-repo/
```

### Actualizar Reportes

Para actualizar el sitio con nuevos reportes:

```bash
# Agregar nuevo reporte
./add-report.sh ../reports-youtube/nuevo-reporte.md

# Commit y push
git add .
git commit -m "Add nuevo-reporte"
git push
```

GitHub Actions automáticamente reconstruirá y desplegará el sitio.

## 🎨 Características

- ✅ Navegación automática basada en archivos
- ✅ Búsqueda local integrada
- ✅ Dark mode
- ✅ Exportación a PDF de cada reporte
- ✅ Deploy automático con GitHub Actions
- ✅ Diseño minimalista y profesional
- ✅ Responsive (mobile-friendly)

## 🔧 Comandos Disponibles

```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción
npm run serve      # Servir build localmente
npm run clear      # Limpiar cache
./add-report.sh    # Agregar nuevo reporte
```

## 📖 URLs de los Reportes

Cada archivo genera su propia ruta:

| Archivo | URL |
|---------|-----|
| `intro.md` | `/` (raíz) |
| `youtube-analytics-report-video-15-10-25.md` | `/youtube-analytics-report-video-15-10-25` |
| `youtube-analytics-report-video-29-09-25.md` | `/youtube-analytics-report-video-29-09-25` |
| `comparative-analysis-summary.md` | `/comparative-analysis-summary` |

## 🐛 Troubleshooting

### Error de compilación con caracteres `<`

Si ves errores como "Unexpected character", escapa el símbolo `<`:
```markdown
# Antes
(meta: <50%)

# Después  
(meta: &lt;50%)
```

### El sitio no carga en GitHub Pages

1. Verifica que `baseUrl` en `docusaurus.config.ts` sea: `/docs-stats-repo/`
2. Confirma que GitHub Actions tenga permisos de escritura en Settings > Actions
3. Revisa los logs en la pestaña Actions del repositorio

## 📚 Documentación

- [Guía de Deployment](./DEPLOYMENT.md)
- [Docusaurus Docs](https://docusaurus.io/)

## 🛠️ Tecnologías

- Docusaurus 3.9.2
- React + TypeScript
- html2pdf.js
- @easyops-cn/docusaurus-search-local

---

**Ubicación**: `/e/dev/proyectos/daniel-muvdi/docs-stats-repo/`
**Reportes fuente**: `/e/dev/proyectos/daniel-muvdi/reports-youtube/`
