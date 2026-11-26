# Entre líneas

Blog personal minimalista creado con Jekyll y compatible con GitHub Pages.

## Personalizar

Edita `_config.yml` para cambiar el título, la descripción y la dirección del sitio. Sustituye `hola@ejemplo.com` en `_layouts/default.html` y `sobre-mi.html`, y adapta la página de presentación. Los artículos de `_posts` son ejemplos: edítalos o elimínalos.

Para publicar un artículo, crea un archivo en `_posts` con el formato `AAAA-MM-DD-titulo.md` y este encabezado:

```yaml
---
layout: post
title: "Título del artículo"
description: "Una breve introducción."
category: NOTAS
---

Escribe aquí en Markdown.
```

Para añadir una imagen de portada, guarda el archivo en `assets/media/` y agrega estas líneas al encabezado del artículo (antes del segundo `---`):

```yaml
cover: /assets/media/mi-imagen.jpg
cover_alt: "Una descripción breve de la imagen"
```

La portada es opcional; sin `cover`, el artículo se muestra normalmente.

## Vista local

Necesitas Ruby y Bundler. Ejecuta `bundle install` y después `bundle exec jekyll serve`; abre la dirección que indique la terminal.

## Publicar en GitHub Pages

1. Sube estos archivos a un repositorio de GitHub.
2. En `_config.yml`, establece `url` como `https://TU-USUARIO.github.io`. Si el repositorio es `TU-USUARIO.github.io`, deja `baseurl: ""`; si es un repositorio de proyecto, usa `baseurl: "/NOMBRE-DEL-REPOSITORIO"`.
3. En **Settings → Pages**, elige **Deploy from a branch**, la rama principal y la carpeta `/ (root)`; guarda los cambios.
4. Espera a que GitHub Pages construya el sitio. La dirección aparecerá en la misma sección de configuración.

El feed Atom está disponible en `/feed.xml` (precedido por el `baseurl` si corresponde).
