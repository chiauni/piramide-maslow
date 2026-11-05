(function () {
  "use strict";

  var niveles = Array.isArray(window.NIVELES) ? window.NIVELES : [];
  if (!niveles.length) return;

  var dialogo = document.getElementById("dialogo-nivel");
  if (!dialogo) return;

  var refs = {
    titulo: document.getElementById("dialogo-titulo"),
    resumen: document.getElementById("dialogo-resumen"),
    incluye: document.getElementById("dialogo-incluye"),
    porque: document.getElementById("dialogo-porque"),
    falta: document.getElementById("dialogo-falta"),
    numero: document.getElementById("dialogo-numero"),
    dot: document.getElementById("dialogo-dot"),
    video: document.getElementById("dialogo-video"),
    videoTitulo: document.getElementById("dialogo-video-titulo"),
    videoCanal: document.getElementById("dialogo-video-canal"),
    videoEnlace: document.getElementById("dialogo-video-enlace"),
    anterior: document.getElementById("dialogo-anterior"),
    siguiente: document.getElementById("dialogo-siguiente"),
    anuncio: document.getElementById("dialogo-anuncio"),
    cerrar: dialogo.querySelector(".dialog-close")
  };

  var actual = 1;
  var focoPrevio = null;

  function urlVideo(id) {
    var params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      hl: "es",
      cc_lang_pref: "es"
    });
    return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?" + params.toString();
  }

  function urlBusqueda(texto) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(texto);
  }

  function indiceDe(numero) {
    return niveles.findIndex(function (nivel) {
      return nivel.numero === numero || nivel.numero === Number(numero);
    });
  }

  function vecino(numero, paso) {
    var total = niveles.length;
    return ((numero - 1 + paso + total) % total) + 1;
  }

  function nombreDe(numero) {
    return niveles[indiceDe(numero)].nombre;
  }

  function pintar(numero) {
    var nivel = niveles[indiceDe(numero)];
    if (!nivel) return;

    actual = nivel.numero;

    refs.numero.textContent = "Nivel " + nivel.numero + " de " + niveles.length;
    refs.dot.style.background = nivel.color;
    dialogo.style.setProperty("--dial-accent", nivel.color);
    refs.titulo.textContent = nivel.nombre;
    refs.resumen.textContent = nivel.resumen;
    refs.porque.textContent = nivel.porque;
    refs.falta.textContent = nivel.falta;

    refs.incluye.replaceChildren();
    nivel.incluye.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      refs.incluye.appendChild(li);
    });

    var enlaceVideo = nivel.video && nivel.video.id
      ? "https://www.youtube.com/watch?v=" + encodeURIComponent(nivel.video.id)
      : urlBusqueda(nivel.video ? nivel.video.busqueda : nivel.nombre);

    refs.videoTitulo.textContent = nivel.video ? nivel.video.titulo : "Video explicativo";
    refs.videoCanal.textContent = nivel.video ? nivel.video.canal : "";
    refs.videoEnlace.href = enlaceVideo;
    refs.videoEnlace.firstChild.nodeValue = nivel.video && nivel.video.id
      ? "Abrir el video en YouTube "
      : "Buscar videos sobre este nivel ";

    var previo = vecino(actual, -1);
    var siguiente = vecino(actual, 1);
    refs.anterior.querySelector(".step-name").textContent = nombreDe(previo);
    refs.siguiente.querySelector(".step-name").textContent = nombreDe(siguiente);
    refs.anterior.setAttribute("aria-label", "Ir al nivel " + previo + ": " + nombreDe(previo));
    refs.siguiente.setAttribute("aria-label", "Ir al nivel " + siguiente + ": " + nombreDe(siguiente));

    if (nivel.video && nivel.video.id) {
      refs.video.src = urlVideo(nivel.video.id);
      refs.video.title = nivel.video.titulo + " — " + nivel.video.canal;
    } else {
      refs.video.src = "about:blank";
      refs.video.title = "Video no disponible";
    }

    refs.anuncio.textContent = "Nivel " + nivel.numero + " de " + niveles.length + ": " + nivel.nombre;
  }

  function abrir(numero) {
    var nivel = niveles[indiceDe(numero)];
    if (!nivel) return;

    if (!dialogo.open) {
      focoPrevio = document.activeElement;
      pintar(nivel.numero);
      dialogo.showModal();
      document.body.classList.add("dialogo-abierto");
      if (refs.cerrar) refs.cerrar.focus();
    } else {
      pintar(nivel.numero);
    }
  }

  function cerrar() {
    if (dialogo.open) dialogo.close();
  }

  function limpiar() {
    refs.video.src = "about:blank";
    document.body.classList.remove("dialogo-abierto");
    if (focoPrevio && typeof focoPrevio.focus === "function" && document.contains(focoPrevio)) {
      focoPrevio.focus();
    }
  }

  document.querySelectorAll("[data-nivel]").forEach(function (boton) {
    var nivel = niveles[indiceDe(Number(boton.getAttribute("data-nivel")))];
    if (nivel) {
      boton.setAttribute(
        "aria-label",
        "Nivel " + nivel.numero + ": " + nivel.nombre + ". Abrir ficha y video."
      );
    }

    boton.addEventListener("click", function () {
      abrir(Number(boton.getAttribute("data-nivel")));
    });
  });

  document.querySelectorAll("[data-abrir]").forEach(function (boton) {
    boton.addEventListener("click", function () {
      abrir(Number(boton.getAttribute("data-abrir")));
    });
  });

  if (refs.cerrar) refs.cerrar.addEventListener("click", cerrar);

  refs.anterior.addEventListener("click", function () {
    abrir(vecino(actual, -1));
  });

  refs.siguiente.addEventListener("click", function () {
    abrir(vecino(actual, 1));
  });

  dialogo.addEventListener("click", function (evento) {
    if (evento.target === dialogo) cerrar();
  });

  dialogo.addEventListener("cancel", function (evento) {
    evento.preventDefault();
    cerrar();
  });

  dialogo.addEventListener("close", limpiar);

  dialogo.addEventListener("keydown", function (evento) {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;
    var destino = evento.target;
    if (destino && (destino.tagName === "INPUT" || destino.tagName === "TEXTAREA")) return;
    evento.preventDefault();
    abrir(vecino(actual, evento.key === "ArrowRight" ? 1 : -1));
  });
})();
