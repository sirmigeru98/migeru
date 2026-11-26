---
layout: post
title: "Una entrada para verlo todo"
description: "Un recorrido de prueba entre imágenes, sonidos y escenas que caben en este espacio."
category: GUÍA VISUAL
---
A veces una imagen me hace imaginar el aire de un lugar; otras, un sonido cambia por completo la escena que tenía en la cabeza. Creé esta entrada para probar cómo puedo guardar aquí esas distintas formas de contar algo. Todavía es una prueba, pero quería que también se sintiera parte de este espacio.

## Imágenes

Me gusta cómo una imagen puede detener un momento. En esta, las montañas y el agua parecen compartir los mismos colores, como si el paisaje continuara debajo de la superficie.

<figure>
  <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&amp;fit=crop&amp;w=1400&amp;q=85" alt="Un paisaje de montaña reflejado en un lago" loading="lazy">
  <figcaption>Montañas reflejadas en el agua. Imagen de ejemplo de Unsplash.</figcaption>
</figure>

## Vídeo

Hay detalles que cambian cuando los vemos en movimiento. Aquí dejo un vídeo de prueba: una escena pequeña para mirar con calma.

<video controls playsinline preload="metadata" width="720">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  Tu navegador no puede reproducir este vídeo. <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">Descargar vídeo</a>.
</video>

## Audio

El sonido también puede transformar una escena. Este audio de prueba es menos tranquilo de lo que parece; puedes reproducirlo cuando quieras.

<audio controls preload="metadata">
  <source src="{{ '/assets/media/audio-ejemplo.mp3' | relative_url }}" type="audio/mpeg">
  Tu navegador no puede reproducir este audio. <a href="{{ '/assets/media/audio-ejemplo.mp3' | relative_url }}">Descargar audio</a>.
</audio>

## Texto y enlaces

También estoy probando cómo conviven las palabras: **una idea que quiero destacar**, *otra que pasa más suave* y un [enlace](https://jekyllrb.com/) para quien quiera mirar un poco más. Hay cosas que prefiero guardar en una lista:

- Una idea para recordar.
- Una imagen que cuenta una historia.
- Una canción para acompañar la lectura.

> A veces, mirar un poco más cambia la forma en que recuerdo algo.

## Código

Entre imágenes y palabras también puede aparecer un fragmento de código. Este es solo un saludo de prueba:

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

Algunos ejemplos de esta entrada vienen de otros sitios y necesitan conexión a internet.

## Imagen animada

De las piedras hasta las estrellas: aquí dejo girar, por un momento, el lugar desde donde miramos todo lo demás.

<figure>
  <img src="{{ '/assets/media/tierra.gif' | relative_url }}" alt="Animación del planeta Tierra girando" loading="lazy">
  <figcaption>La Tierra girando. Imagen de <a href="https://commons.wikimedia.org/wiki/File:Rotating_earth_(large).gif">Wikimedia Commons</a>.</figcaption>
</figure>

## Galería de imágenes

Tres paisajes con luces distintas. Me gusta pensar en cómo cambia la sensación de una escena cuando cambian sus colores.

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
  <figcaption>Tres círculos azules, como una forma sencilla de jugar con el color.</figcaption>
</figure>

## Vídeo incrustado

También puedo traer hasta aquí historias que viven en otros lugares. Esta animación es una de ellas.

<div class="media-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ" title="Vídeo de ejemplo: Big Buck Bunny" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Mapa interactivo

Un mapa también guarda historias. Este es un pequeño vistazo a Bogotá, entre calles y montañas.

<div class="media-embed media-map">
  <iframe title="Mapa interactivo de Bogotá" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.095%2C4.595%2C-74.065%2C4.615&amp;layer=mapnik&amp;marker=4.605%2C-74.08"></iframe>
</div>
<p class="media-caption"><a href="https://www.openstreetmap.org/?mlat=4.605&amp;mlon=-74.08#map=15/4.605/-74.08">Ver mapa completo en OpenStreetMap</a></p>

## Documento PDF incrustado

Algunas ideas necesitan más de una página. Aquí pruebo cómo se vería un documento dentro de una entrada.

<div class="media-document">
  <iframe title="Documento PDF de ejemplo" loading="lazy" src="{{ '/assets/media/ejemplo.pdf' | relative_url }}"></iframe>
</div>
<p class="media-caption"><a href="{{ '/assets/media/ejemplo.pdf' | relative_url }}">Abrir el PDF en otra pestaña</a></p>

## Contenido de otra web

Más adelante también podría compartir música, pódcast u otras cosas que encuentre fuera de este espacio. Cada servicio los muestra a su manera.

Algunos contenidos vienen de servicios externos, así que pueden cambiar o dejar de estar disponibles con el tiempo.