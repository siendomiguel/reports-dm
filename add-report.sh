#!/bin/bash

# Script para agregar nuevos reportes desde la carpeta reports-youtube

if [ -z "$1" ]; then
    echo "Uso: ./add-report.sh <archivo.md>"
    echo "Ejemplo: ./add-report.sh ../reports-youtube/nuevo-reporte.md"
    exit 1
fi

SOURCE_FILE="$1"
BASENAME=$(basename "$SOURCE_FILE")
DEST_FILE="docs/reports/$BASENAME"

if [ ! -f "$SOURCE_FILE" ]; then
    echo "Error: El archivo $SOURCE_FILE no existe"
    exit 1
fi

# Obtener el siguiente número de posición
LAST_POS=$(grep -h "^sidebar_position:" docs/reports/*.md | sed 's/sidebar_position: //' | sort -n | tail -1)
NEXT_POS=$((LAST_POS + 1))

# Crear archivo temporal con frontmatter
cat > "$DEST_FILE" << EOF
---
sidebar_position: $NEXT_POS
---

import PDFExport from '@site/src/components/PDFExport';

<PDFExport />

EOF

# Agregar contenido del archivo original
cat "$SOURCE_FILE" >> "$DEST_FILE"

# Escapar caracteres problemáticos para MDX
sed -i 's/meta: </meta: \&lt;/g' "$DEST_FILE"

echo "✅ Reporte agregado: $DEST_FILE (posición $NEXT_POS)"
echo "Para ver los cambios:"
echo "  npm start"
