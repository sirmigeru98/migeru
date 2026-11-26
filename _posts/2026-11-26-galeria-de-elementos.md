---
layout: post
title: "Una entrada para verlo todo"
description: "Una pequeña galería para probar imágenes, vídeo, audio y los elementos de una publicación."
category: GUÍA VISUAL
---
Creé esta entrada para probar cómo se ven las imágenes, los vídeos y otros formatos que puedo compartir aquí. Es una pequeña muestra de lo que podrás encontrar en el blog.

## Imágenes

Una imagen con texto alternativo y un pie de foto:

<figure>
  <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&amp;fit=crop&amp;w=1400&amp;q=85" alt="Un paisaje de montaña reflejado en un lago" loading="lazy">
  <figcaption>Un momento de calma. Imagen de ejemplo de Unsplash.</figcaption>
</figure>

## Vídeo

Un vídeo con controles nativos del navegador:

<video controls playsinline preload="metadata" width="720">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  Tu navegador no puede reproducir este vídeo. <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">Descargar vídeo</a>.
</video>

## Audio

Un reproductor sencillo para escuchar una grabación:

<audio controls preload="metadata">
  <source src="{{ '/assets/media/audio-ejemplo.mp3' | relative_url }}" type="audio/mpeg">
  Tu navegador no puede reproducir este audio. <a href="{{ '/assets/media/audio-ejemplo.mp3' | relative_url }}">Descargar audio</a>.
</audio>

## Texto y enlaces

Puedes combinar **texto en negrita**, *texto en cursiva* y [enlaces](https://jekyllrb.com/) dentro de un párrafo. También hay espacio para listas:

- Una idea para recordar.
- Una imagen que cuenta una historia.
- Una canción para acompañar la lectura.

> La atención es una forma de cuidar lo que nos rodea.

## Código

Para compartir un pequeño fragmento de código:

```javascript
const mensaje = "Hola, mundo";
console.log(mensaje);
```

## Una tabla sencilla

| Formato | Ejemplo |
| --- | --- |
| Imagen | Fotografía con pie de foto |
| Vídeo | Reproductor con controles |
| Audio | Grabación con controles |

Algunos ejemplos de esta entrada se cargan desde servicios externos y necesitan conexión a internet.
## Imagen animada

<figure>
  <img src="{{ '/assets/media/tierra.gif' | relative_url }}" alt="Animación del planeta Tierra girando" loading="lazy">
  <figcaption>La Tierra girando. Imagen de <a href="https://commons.wikimedia.org/wiki/File:Rotating_earth_(large).gif">Wikimedia Commons</a>.</figcaption>
</figure>

## Galería de imágenes

<div class="media-gallery">
  <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Paisaje de montaña al amanecer" loading="lazy">
  <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Niebla sobre un paisaje al amanecer" loading="lazy">
  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Luz atravesando un bosque" loading="lazy">
</div>

## Gráfico vectorial SVG

<figure>
  <svg class="media-illustration" viewBox="0 0 720 240" role="img" aria-labelledby="svg-title" xmlns="http://www.w3.org/2000/svg">
    <title id="svg-title">Ilustración abstracta de círculos y líneas</title>
    <rect width="720" height="240" rx="18" fill="#f0f2f6"/>
    <circle cx="270" cy="120" r="68" fill="#d9e6f8"/>
    <circle cx="360" cy="120" r="68" fill="#c4d8f4" fill-opacity=".8"/>
    <circle cx="450" cy="120" r="68" fill="#a9c8ee" fill-opacity=".75"/>
  </svg>
  <figcaption>Un gráfico vectorial se adapta a cualquier tamaño sin perder nitidez.</figcaption>
</figure>

## Vídeo incrustado

<div class="media-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ" title="Vídeo de ejemplo: Big Buck Bunny" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Mapa interactivo

<div class="media-embed media-map">
  <iframe title="Mapa interactivo de Bogotá" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.095%2C4.595%2C-74.065%2C4.615&amp;layer=mapnik&amp;marker=4.605%2C-74.08"></iframe>
</div>
<p class="media-caption"><a href="https://www.openstreetmap.org/?mlat=4.605&amp;mlon=-74.08#map=15/4.605/-74.08">Ver mapa completo en OpenStreetMap</a></p>

## Documento PDF incrustado

<div class="media-document">
  <iframe title="Documento PDF de ejemplo" loading="lazy" src="{{ '/assets/media/ejemplo.pdf' | relative_url }}"></iframe>
</div>
<p class="media-caption"><a href="{{ '/assets/media/ejemplo.pdf' | relative_url }}">Abrir el PDF en otra pestaña</a></p>

## Contenido de otra web

Los reproductores de música, pódcast y publicaciones de redes sociales también suelen insertarse con un iframe o con el código proporcionado por la plataforma. Cada servicio tiene su propio diseño, controles y políticas de visualización.

Los recursos incrustados anteriores dependen de servicios externos. Su disponibilidad y los controles de privacidad pueden variar.