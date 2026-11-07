# Pirámide de Maslow, piso por piso

Guía interactiva en español sobre la jerarquía de necesidades de Abraham Maslow, hecha como trabajo de 1.º de Administración de la UTU Flor de Maroñas. Cada nivel de la pirámide abre una ficha con qué incluye, por qué importa, qué pasa cuando falta y un video explicativo. Además incluye un juego de presupuesto: hay que repartir $25.000 entre gastos de un mes y ver qué pasa.

![Vista previa de la guía interactiva](assets/img/og.png)

Sitio estático: HTML, CSS y JavaScript, sin dependencias ni build.

## Ver el sitio

- Demo: https://chiauni.github.io/piramide-maslow/
- Repositorio: https://github.com/chiauni/piramide-maslow

Para verlo en tu computadora, abrí `index.html` en el navegador o levantá un servidor local:

```bash
python -m http.server 8000
```

Y entrá a `http://localhost:8000`.

## Cómo cambiar los videos

Todos los contenidos están en `assets/js/niveles.js`. Cada nivel tiene un objeto `video`:

```js
video: {
  id: "krRY_JKxDO4",           // código después de watch?v= en YouTube
  titulo: "Pirámide de Maslow: jerarquía de necesidades humanas",
  canal: "Marketing Digital y Redes Sociales",
  busqueda: "pirámide de Maslow necesidades fisiológicas"
}
```

- `id`: si el video deja de estar disponible o querés reemplazarlo, cambiá solo este valor.
- `titulo` y `canal`: se muestran debajo del reproductor.
- `busqueda`: se usa como enlace alternativo si el nivel no tiene video.

El reproductor usa el dominio `youtube-nocookie.com` y carga el video recién cuando se abre la ficha, para no ralentizar la página.

## Editar los textos

En el mismo archivo `assets/js/niveles.js` podés cambiar:

| Campo | Dónde aparece |
| --- | --- |
| `nombre` | Pirámide y título de la ficha |
| `resumen` | Entradilla de la ficha |
| `incluye` | Etiquetas de "Qué incluye" |
| `porque` | Bloque "Por qué importa" |
| `falta` | Bloque "Cuando falta" |
| `color` | Punto de color y acento de la ficha |

Los nombres visibles en la pirámide están en `index.html`, dentro de `.pyramid`. Si cambiás un nombre en un archivo, actualizalo también en el otro.

## El juego del presupuesto

El juego propone repartir $25.000 entre trece gastos de un mes, agrupados por nivel de la pirámide. Al cerrar el mes calcula un puntaje de 0 a 100 según la cobertura de cada nivel, suma un imprevisto de $1.800 y devuelve consejos sobre las decisiones tomadas.

Los datos están en `assets/js/juego.js`:

| Constante | Para qué sirve |
| --- | --- |
| `PRESUPUESTO` | Dinero disponible para repartir |
| `IMPREVISTO` | Costo del imprevisto que se descuenta al cerrar el mes |
| `NIVELES` | Nombre, color y peso de cada nivel en el puntaje |
| `GASTOS` | Lista de gastos con su nivel y monto sugerido |

Para agregar un gasto, sumá un objeto a `GASTOS` con un `id` nuevo, el `nivel` al que pertenece y un `sugerido` en pesos. La interfaz se genera sola. Si el total sugerido cambia mucho, revisá que el presupuesto siga siendo un desafío.

Los montos son ficticios y están pensados como ejemplo didáctico, no como un presupuesto real.

## Estructura

```
piramide-maslow/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/niveles.js
│   ├── js/app.js
│   ├── js/juego.js
│   └── img/favicon.svg
├── README.md
└── .gitignore
```

## Publicación

El sitio se publica con GitHub Pages desde la rama `main`, carpeta raíz. Para actualizarlo:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

GitHub Pages vuelve a publicar solo en uno o dos minutos.

## Accesibilidad

- Navegación completa con teclado: los niveles son botones, el diálogo usa `<dialog>` nativo y se cierra con `Escape`.
- Flechas izquierda y derecha para pasar de nivel dentro de la ficha.
- El juego usa controles de rango con etiqueta, monto en texto y aviso del dinero disponible.
- Foco visible en todos los controles y retorno del foco al cerrar.
- Textos con contraste AA sobre cada color de la pirámide.
- Respeta `prefers-reduced-motion`.
- Enlace para saltar directo a la pirámide.

## Fuentes

- Maslow, A. H. (1943). [A Theory of Human Motivation](https://doi.org/10.1037/h0054346). *Psychological Review*.
- [Pirámide de Maslow](https://es.wikipedia.org/wiki/Pir%C3%A1mide_de_Maslow), Wikipedia en español.
- [Maslow's Hierarchy of Needs](https://www.simplypsychology.org/maslow.html), Simply Psychology.
- [¿Qué es la pirámide de Maslow?](https://economipedia.com/definiciones/piramide-de-maslow.html), Economipedia.

Contenido divulgativo. No reemplaza la orientación de un profesional de la salud mental.
