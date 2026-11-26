# migeru

Blog personal creado con Jekyll para GitHub Pages. El sitio publicado está en https://sirmigeru98.github.io/migeru/.

## Crear una historia

Crea un archivo Markdown en `_posts` con el nombre `AAAA-MM-DD-titulo.md`:

```yaml
---
layout: post
title: "Título de la historia"
description: "Una breve introducción."
category: videojuegos
cover: /assets/media/mi-imagen.jpg
---

Escribe aquí en Markdown.
```

La portada es opcional. Guarda la imagen en `assets/media/` y usa su ruta en `cover`; aparecerá como fondo en la parte superior del artículo. Para ocultar una entrada sin borrarla, añade `published: false` a su encabezado. Los archivos en `_drafts` no se publican de forma predeterminada.

La portada del blog muestra las seis publicaciones más recientes. La página `historias.html` reúne todas, con búsqueda y filtros que se generan a partir de sus categorías. Escribe las categorías de forma consistente para evitar duplicados.

## Vista local

Necesitas Ruby y Bundler. En la carpeta del proyecto ejecuta:

```powershell
bundle install
bundle exec jekyll serve
```

Abre la dirección que muestra la terminal; con la configuración actual suele ser `http://127.0.0.1:4000/migeru/`. Para incluir borradores en la vista local, usa `bundle exec jekyll serve --drafts`. Para comprobar la generación sin iniciar el servidor, usa `bundle exec jekyll build`.

## Archivos principales

- `_config.yml`: título, descripción y dirección de GitHub Pages.
- `_layouts/`: estructura compartida y plantilla de artículos.
- `_posts/`: publicaciones; `_drafts/`: borradores locales.
- `assets/css/migeru.css`: estilos del blog.
- `assets/js/`: navegación, búsqueda y controles multimedia.
- `assets/media/`: imágenes y otros recursos.
- `assets/fonts/`: fuente Inter y su licencia.

## Publicación

GitHub Pages publica desde la rama `main`. Los cambios de una rama de prueba no aparecen en el sitio publicado hasta que se integren en `main` y se suban a GitHub. La configuración actual usa `url: https://sirmigeru98.github.io` y `baseurl: /migeru`.