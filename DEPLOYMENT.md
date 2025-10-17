# Guía de Deployment a GitHub Pages

## Pasos Rápidos para Desplegar

### 1. Reemplazar Variables de Configuración

Antes de hacer el deploy, reemplaza `YOUR_GITHUB_USERNAME` en:

**`docusaurus.config.ts`** (líneas 18, 25, 78, 101):
```typescript
url: 'https://TU_USUARIO_GITHUB.github.io',
organizationName: 'TU_USUARIO_GITHUB',
href: 'https://github.com/TU_USUARIO_GITHUB/docs-stats-repo',
```

### 2. Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `docs-stats-repo`
3. Público o Privado (tu elección)
4. NO inicialices con README (ya existe localmente)
5. Click en "Create repository"

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral izquierdo, click en **Pages**
4. En "Build and deployment":
   - **Source**: GitHub Actions (selecciona esta opción)
5. Guarda los cambios

### 4. Push del Código

Ejecuta estos comandos en la carpeta `docs-stats-repo`:

```bash
# Inicializar git (si no está inicializado)
git init

# Añadir todos los archivos
git add .

# Crear commit inicial
git commit -m "Initial commit: Stats Reports Documentation"

# Crear rama main
git branch -M main

# Agregar repositorio remoto (REEMPLAZA TU_USUARIO_GITHUB)
git remote add origin https://github.com/TU_USUARIO_GITHUB/docs-stats-repo.git

# Push al repositorio
git push -u origin main
```

### 5. Verificar Deploy Automático

1. Ve a la pestaña **Actions** en tu repositorio de GitHub
2. Deberías ver un workflow ejecutándose
3. Espera a que termine (toma ~2-3 minutos)
4. Una vez completado, tu sitio estará disponible en:
   ```
   https://TU_USUARIO_GITHUB.github.io/docs-stats-repo/
   ```

## Agregar Nuevos Reportes

Para agregar un nuevo reporte después del deploy inicial:

1. Crea un archivo `.md` en `docs/reports/`:
   ```bash
   touch docs/reports/nuevo-reporte.md
   ```

2. Agrega el contenido:
   ```markdown
   ---
   sidebar_position: 5
   ---

   # Nuevo Reporte

   import PDFExport from '@site/src/components/PDFExport';

   <PDFExport />

   ## Contenido

   Tu contenido aquí...
   ```

3. Commit y push:
   ```bash
   git add docs/reports/nuevo-reporte.md
   git commit -m "Add nuevo-reporte"
   git push
   ```

4. GitHub Actions automáticamente reconstruirá y desplegará el sitio

## Rutas de los Reportes

El routing es automático basado en el nombre del archivo:

| Archivo | URL |
|---------|-----|
| `docs/reports/intro.md` | `/` (página principal) |
| `docs/reports/example-report-1.md` | `/example-report-1` |
| `docs/reports/example-report-2.md` | `/example-report-2` |
| `docs/reports/2025/enero.md` | `/2025/enero` |

## Troubleshooting

### El sitio no despliega

**Problema**: GitHub Actions falla o no se ejecuta

**Solución**:
1. Ve a Settings > Actions > General
2. En "Workflow permissions":
   - Selecciona "Read and write permissions"
   - Marca "Allow GitHub Actions to create and approve pull requests"
3. Guarda los cambios
4. Re-ejecuta el workflow en la pestaña Actions

### Error 404 en el sitio

**Problema**: El sitio muestra 404 al visitarlo

**Solución**:
1. Verifica que `baseUrl` en `docusaurus.config.ts` sea:
   ```typescript
   baseUrl: '/docs-stats-repo/',
   ```
2. Asegúrate de que el nombre del repo coincida exactamente
3. Verifica en Settings > Pages que la fuente sea "GitHub Actions"

### Los enlaces no funcionan

**Problema**: Links internos muestran 404

**Solución**:
- Usa rutas relativas en tus archivos .md
- Verifica que el archivo exista en la ubicación correcta
- Asegúrate de que `routeBasePath` esté configurado como `'reports'` en `docusaurus.config.ts`

### Búsqueda no funciona

**Problema**: La búsqueda no muestra resultados

**Solución**:
- La búsqueda solo funciona después del build
- El índice se genera automáticamente durante el deploy
- Espera unos segundos después de que se cargue la página para que el índice se inicialice

## Cambiar el Nombre del Repositorio

Si decides cambiar el nombre del repositorio:

1. Cambia `baseUrl` y `projectName` en `docusaurus.config.ts`:
   ```typescript
   baseUrl: '/NUEVO-NOMBRE/',
   projectName: 'NUEVO-NOMBRE',
   ```

2. Actualiza el remote de git:
   ```bash
   git remote set-url origin https://github.com/TU_USUARIO/NUEVO-NOMBRE.git
   ```

3. Push los cambios:
   ```bash
   git add docusaurus.config.ts
   git commit -m "Update repository name"
   git push
   ```

## URL Final

Una vez desplegado, tu sitio estará disponible en:

```
https://TU_USUARIO_GITHUB.github.io/docs-stats-repo/
```

Los reportes individuales estarán en:

```
https://TU_USUARIO_GITHUB.github.io/docs-stats-repo/example-report-1
https://TU_USUARIO_GITHUB.github.io/docs-stats-repo/example-report-2
```

## Dominio Personalizado (Opcional)

Para usar un dominio personalizado:

1. En Settings > Pages, agrega tu dominio en "Custom domain"
2. Configura los DNS de tu dominio:
   - CNAME record: `TU_USUARIO_GITHUB.github.io`
3. Actualiza `url` en `docusaurus.config.ts`:
   ```typescript
   url: 'https://tu-dominio.com',
   baseUrl: '/',
   ```

## Mantenimiento

- Los archivos `.md` se pueden editar directamente en GitHub
- Cada commit a la rama `main` dispara un nuevo deploy
- El build toma aproximadamente 2-3 minutos
- No necesitas ejecutar comandos adicionales, todo es automático
