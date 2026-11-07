(function () {
  "use strict";

  var PRESUPUESTO = 25000;
  var IMPREVISTO = 1800;

  var NIVELES = [
    { n: 1, nombre: "Fisiología", color: "#1B3A57", tinta: "#1B3A57", peso: 0.30 },
    { n: 2, nombre: "Seguridad", color: "#2A6360", tinta: "#2A6360", peso: 0.26 },
    { n: 3, nombre: "Pertenencia", color: "#4C6E33", tinta: "#3B5528", peso: 0.16 },
    { n: 4, nombre: "Estima", color: "#D9A441", tinta: "#8A6410", peso: 0.12 },
    { n: 5, nombre: "Autorrealización", color: "#D96245", tinta: "#AC4029", peso: 0.16 }
  ];

  var GASTOS = [
    { id: "comida", nombre: "Comida", nivel: 1, sugerido: 7000 },
    { id: "agua", nombre: "Agua", nivel: 1, sugerido: 700 },
    { id: "luz", nombre: "Luz y servicios", nivel: 1, sugerido: 1300 },
    { id: "alquiler", nombre: "Alquiler", nivel: 2, sugerido: 8000 },
    { id: "salud", nombre: "Salud", nivel: 2, sugerido: 1800 },
    { id: "transporte", nombre: "Transporte", nivel: 2, sugerido: 1800 },
    { id: "ahorro", nombre: "Ahorro para imprevistos", nivel: 2, sugerido: 2000 },
    { id: "internet", nombre: "Internet y teléfono", nivel: 3, sugerido: 1200 },
    { id: "salidas", nombre: "Salidas con amigos", nivel: 3, sugerido: 1800 },
    { id: "cuidado", nombre: "Cuidado personal", nivel: 4, sugerido: 1000 },
    { id: "ropa", nombre: "Ropa y calzado", nivel: 4, sugerido: 1200 },
    { id: "curso", nombre: "Curso o taller", nivel: 5, sugerido: 1500 },
    { id: "libros", nombre: "Libros y materiales", nivel: 5, sugerido: 800 }
  ];

  var grupos = document.getElementById("juego-grupos");
  var dialogo = document.getElementById("dialogo-resultado");
  if (!grupos || !dialogo) return;

  var refs = {
    asignado: document.getElementById("juego-asignado"),
    restante: document.getElementById("juego-restante"),
    barra: document.getElementById("juego-barra"),
    guardar: document.getElementById("juego-guardar"),
    cerrarMes: document.getElementById("juego-cerrar"),
    reiniciar: document.getElementById("juego-reiniciar"),
    basico: document.getElementById("juego-basico"),
    error: document.getElementById("juego-error"),
    estado: document.getElementById("juego-estado"),
    puntaje: document.getElementById("resultado-puntaje"),
    etiqueta: document.getElementById("resultado-etiqueta"),
    resumen: document.getElementById("resultado-resumen"),
    meta: document.getElementById("resultado-meta"),
    niveles: document.getElementById("resultado-niveles"),
    evento: document.getElementById("resultado-evento"),
    consejos: document.getElementById("resultado-consejos"),
    anuncio: document.getElementById("resultado-anuncio"),
    cerrar: dialogo.querySelector(".dialog-close"),
    reintentar: document.getElementById("resultado-reintentar"),
    reiniciarResultado: document.getElementById("resultado-reiniciar")
  };

  var montos = {};
  var inputs = {};
  var salidas = {};
  var totalesNivel = {};

  GASTOS.forEach(function (gasto) {
    montos[gasto.id] = 0;
  });

  function plata(n) {
    return "$" + Math.round(n).toLocaleString("es-UY");
  }

  function suma() {
    return GASTOS.reduce(function (total, gasto) {
      return total + montos[gasto.id];
    }, 0);
  }

  function nivelDe(n) {
    return NIVELES.filter(function (nivel) {
      return nivel.n === n;
    })[0];
  }

  function gastosDeNivel(n) {
    return GASTOS.filter(function (gasto) {
      return gasto.nivel === n;
    });
  }

  function crearGrupo(nivel) {
    var items = gastosDeNivel(nivel.n);
    var grupo = document.createElement("section");
    grupo.className = "game-group" + (nivel.n === 5 ? " game-group--wide" : "");
    grupo.setAttribute("data-nivel", nivel.n);
    grupo.setAttribute("aria-labelledby", "grupo-" + nivel.n);
    grupo.style.setProperty("--tone", nivel.color);
    grupo.style.setProperty("--tone-ink", nivel.tinta);

    var filas = items.map(function (gasto) {
      var id = "gasto-" + gasto.id;
      return '' +
        '<div class="gasto">' +
          '<div class="gasto-head">' +
            "<div>" +
              '<label for="' + id + '">' + gasto.nombre + "</label>" +
              '<p class="gasto-hint" id="' + id + '-hint">Sugerido: ' + plata(gasto.sugerido) + "</p>" +
            "</div>" +
            '<output class="gasto-monto" id="' + id + '-monto" for="' + id + '">$0</output>' +
          "</div>" +
          '<input class="gasto-range" type="range" id="' + id + '" data-id="' + gasto.id + '"' +
            ' min="0" max="' + PRESUPUESTO + '" step="100" value="0"' +
            ' aria-describedby="' + id + '-hint">' +
        "</div>";
    }).join("");

    grupo.innerHTML = '' +
      '<div class="group-head">' +
        '<span class="group-num" aria-hidden="true">' + nivel.n + "</span>" +
        '<h3 class="group-name" id="grupo-' + nivel.n + '">' + nivel.nombre + "</h3>" +
        '<span class="group-total" data-total="' + nivel.n + '">Asignado: $0</span>' +
      "</div>" +
      '<div class="gasto-list">' + filas + "</div>";

    return grupo;
  }

  NIVELES.forEach(function (nivel) {
    grupos.appendChild(crearGrupo(nivel));
    totalesNivel[nivel.n] = grupos.querySelector('[data-total="' + nivel.n + '"]');
  });

  GASTOS.forEach(function (gasto) {
    var input = document.getElementById("gasto-" + gasto.id);
    if (!input) return;
    inputs[gasto.id] = input;
    salidas[gasto.id] = document.getElementById("gasto-" + gasto.id + "-monto");
  });

  function pintarFila(gasto) {
    var input = inputs[gasto.id];
    var monto = montos[gasto.id];
    if (!input) return;

    input.max = String(Math.min(PRESUPUESTO, monto + (PRESUPUESTO - suma())));
    input.value = String(monto);
    input.setAttribute("aria-valuetext", plata(monto));
    input.style.setProperty("--fill", (monto / (Number(input.max) || 1)) * 100 + "%");

    if (salidas[gasto.id]) salidas[gasto.id].textContent = plata(monto);
  }

  function actualizar() {
    var total = suma();
    var restante = PRESUPUESTO - total;

    if (total > 0 && !refs.error.hidden) refs.error.hidden = true;

    refs.asignado.textContent = plata(total);
    refs.restante.textContent = plata(restante);
    refs.barra.style.width = (total / PRESUPUESTO) * 100 + "%";

    GASTOS.forEach(pintarFila);

    NIVELES.forEach(function (nivel) {
      var asignado = gastosDeNivel(nivel.n).reduce(function (acc, gasto) {
        return acc + montos[gasto.id];
      }, 0);
      if (totalesNivel[nivel.n]) {
        totalesNivel[nivel.n].textContent = "Asignado: " + plata(asignado);
      }
    });

    if (restante > 0) {
      refs.guardar.disabled = false;
      refs.guardar.textContent = "Guardar " + plata(restante);
    } else {
      refs.guardar.disabled = true;
      refs.guardar.textContent = "Todo asignado";
    }
  }

  function anunciar(texto) {
    refs.estado.textContent = "";
    window.setTimeout(function () {
      refs.estado.textContent = texto;
    }, 40);
  }

  function borrar() {
    GASTOS.forEach(function (gasto) {
      montos[gasto.id] = 0;
    });
    actualizar();
  }

  function cubrirBasico() {
    GASTOS.forEach(function (gasto) {
      montos[gasto.id] = gasto.nivel <= 2 ? gasto.sugerido : 0;
    });
    actualizar();
    anunciar("Cubriste los niveles 1 y 2. Quedan " + plata(PRESUPUESTO - suma()) + " para el resto.");
  }

  function guardarResto() {
    var restante = PRESUPUESTO - suma();
    if (restante <= 0) return;
    montos.ahorro += restante;
    actualizar();
    anunciar("Guardaste " + plata(restante) + " en ahorro para imprevistos.");
  }

  function coberturaNivel(nivel) {
    var items = gastosDeNivel(nivel.n);
    var acumulado = items.reduce(function (acc, gasto) {
      return acc + Math.min(1, montos[gasto.id] / gasto.sugerido);
    }, 0);
    return items.length ? acumulado / items.length : 0;
  }

  function calcular() {
    var total = suma();
    var restante = PRESUPUESTO - total;
    var niveles = NIVELES.map(function (nivel) {
      return {
        nivel: nivel,
        cobertura: coberturaNivel(nivel),
        asignado: gastosDeNivel(nivel.n).reduce(function (acc, gasto) {
          return acc + montos[gasto.id];
        }, 0),
        sugerido: gastosDeNivel(nivel.n).reduce(function (acc, gasto) {
          return acc + gasto.sugerido;
        }, 0)
      };
    });

    var base = niveles.reduce(function (acc, fila) {
      return acc + fila.cobertura * fila.nivel.peso * 100;
    }, 0);

    var fondo = montos.salud + montos.ahorro + restante;
    var falta = Math.max(0, IMPREVISTO - fondo);
    var penal = Math.round((falta / IMPREVISTO) * 12);
    var puntaje = Math.max(0, Math.min(100, Math.round(base - penal)));

    return {
      total: total,
      restante: restante,
      niveles: niveles,
      base: base,
      fondo: fondo,
      falta: falta,
      penal: penal,
      puntaje: puntaje
    };
  }

  function etiqueta(puntaje) {
    if (puntaje >= 75) return "Un mes bien armado";
    if (puntaje >= 60) return "Un mes equilibrado";
    if (puntaje >= 45) return "Un mes justo";
    if (puntaje >= 30) return "Un mes frágil";
    return "Un mes al límite";
  }

  function resumen(puntaje) {
    if (puntaje >= 75) {
      return "Cubriste la base y todavía quedó margen para lo social y lo personal. Es el tipo de mes que sostiene sin ahogar.";
    }
    if (puntaje >= 60) {
      return "La base está casi entera, pero algunas cosas quedaron flojas. Revisá qué priorizaste y qué podrías mover.";
    }
    if (puntaje >= 45) {
      return "El mes se sostiene, aunque con tensiones. Hay necesidades importantes compitiendo por el mismo dinero.";
    }
    if (puntaje >= 30) {
      return "Faltó cubrir partes de la base. Cuando eso pasa, todo lo demás cuesta el doble.";
    }
    return "El presupuesto quedó muy lejos de lo esencial. No es un fracaso personal: es lo que pasa cuando el ingreso no alcanza.";
  }

  function estadoNivel(nivel, cobertura) {
    var alto = cobertura >= 0.9;
    var medio = cobertura >= 0.6;

    if (nivel.n === 1) {
      if (alto) return "Comida, agua y servicios cubiertos.";
      if (medio) return "Lo esencial quedó justo.";
      return "Faltó parte de lo más básico.";
    }
    if (nivel.n === 2) {
      if (alto) return "Vivienda, salud y un colchón para imprevistos.";
      if (medio) return "La seguridad quedó inestable.";
      return "Sin red para lo que puede salir mal.";
    }
    if (nivel.n === 3) {
      if (alto) return "Contacto y vínculos sostenidos.";
      if (medio) return "Poco espacio para estar con otros.";
      return "Los vínculos quedaron postergados.";
    }
    if (nivel.n === 4) {
      if (alto) return "Cuidado personal y presencia.";
      if (medio) return "Lo justo para no descuidarte.";
      return "La autoestima también se sostiene con tiempo y cuidado.";
    }
    if (alto) return "Lugar para aprender y proyectar.";
    if (medio) return "Crecimiento a medias.";
    return "Todo para sobrevivir, nada para proyectar.";
  }

  function consejos(resultado) {
    var lista = [];
    var nivel1 = resultado.niveles[0];
    var nivel3 = resultado.niveles[2];
    var nivel4 = resultado.niveles[3];
    var nivel5 = resultado.niveles[4];
    var sinAsignar = resultado.restante;

    if (nivel1.cobertura < 0.8) {
      lista.push("Antes de sumar gustos, asegurá comida, agua y luz: sin esa base, cualquier otro gasto se vuelve más caro.");
    }

    if (montos.salud + montos.ahorro < IMPREVISTO) {
      lista.push("Un imprevisto de " + plata(IMPREVISTO) + " te hubiera dejado sin colchón. La salud y el ahorro también son parte de la seguridad.");
    }

    if (sinAsignar > 1500) {
      lista.push("Te quedaron " + plata(sinAsignar) + " sin asignar. Podés guardarlos como colchón o cubrir algo que quedó flojo.");
    }

    if (nivel3.asignado + nivel4.asignado + nivel5.asignado === 0) {
      lista.push("Un mes solo de obligaciones también desgasta: los vínculos, el cuidado personal y aprender algo nuevo sostienen.");
    }

    var excedido = GASTOS.filter(function (gasto) {
      return montos[gasto.id] > gasto.sugerido * 1.3;
    })[0];

    if (excedido) {
      lista.push("Asignaste " + plata(montos[excedido.id]) + " a " + excedido.nombre.toLowerCase() + ", más que lo sugerido. Ese excedente podía cubrir otra necesidad.");
    }

    if (!lista.length) {
      lista.push("Cubriste la base y repartiste con criterio. Probá otra distribución para ver qué cambia y qué se sostiene.");
    }

    return lista.slice(0, 3);
  }

  function pintarResultado(resultado) {
    refs.puntaje.textContent = String(resultado.puntaje);
    refs.etiqueta.textContent = etiqueta(resultado.puntaje);
    refs.resumen.textContent = resumen(resultado.puntaje);

    var meta = "Asignaste " + plata(resultado.total) + " de " + plata(PRESUPUESTO);
    if (resultado.restante > 0) {
      meta += " · Quedaron " + plata(resultado.restante) + " sin asignar";
    }
    if (resultado.penal > 0) {
      meta += " · El imprevisto restó " + resultado.penal + " puntos";
    }
    refs.meta.textContent = meta;

    var tono = resultado.puntaje >= 75 ? "#4C6E33" : resultado.puntaje >= 45 ? "#8A6410" : "#AC4029";
    dialogo.style.setProperty("--score-tone", tono);

    refs.niveles.replaceChildren();
    resultado.niveles.forEach(function (fila) {
      var item = document.createElement("div");
      item.className = "result-level";
      item.style.setProperty("--tone", fila.nivel.color);
      item.style.setProperty("--tone-ink", fila.nivel.tinta);

      var porcentaje = Math.round(fila.cobertura * 100);
      item.innerHTML = '' +
        '<p class="result-level-name"><span class="result-level-dot" aria-hidden="true"></span>' +
          fila.nivel.n + ". " + fila.nivel.nombre + "</p>" +
        '<p class="result-level-pct">' + porcentaje + "%</p>" +
        '<div class="result-meter" aria-hidden="true"><span></span></div>' +
        '<p class="result-level-state">' + estadoNivel(fila.nivel, fila.cobertura) + "</p>";

      var barra = item.querySelector(".result-meter span");
      barra.style.width = porcentaje + "%";
      refs.niveles.appendChild(item);
    });

    if (resultado.falta === 0) {
      refs.evento.textContent = "Una fiebre te obliga a gastar " + plata(IMPREVISTO) +
        " en consulta y remedios. Lo cubriste con lo destinado a salud, ahorro o el dinero que quedó sin asignar. El mes cierra sin deudas.";
    } else {
      refs.evento.textContent = "Una fiebre te obliga a gastar " + plata(IMPREVISTO) +
        " en consulta y remedios. Te faltaron " + plata(resultado.falta) +
        ": tuviste que pedir prestado y el mes cierra en deuda.";
    }

    refs.consejos.replaceChildren();
    consejos(resultado).forEach(function (texto) {
      var li = document.createElement("li");
      li.textContent = texto;
      refs.consejos.appendChild(li);
    });

    refs.anuncio.textContent = "Resultado del mes: " + resultado.puntaje + " de 100. " + etiqueta(resultado.puntaje) + ".";
  }

  function cerrarResultado() {
    if (dialogo.open) dialogo.close();
  }

  function abrirResultado() {
    if (suma() <= 0) {
      refs.error.hidden = false;
      refs.error.textContent = "Asigná al menos una parte del presupuesto antes de cerrar el mes.";
      if (inputs.comida) inputs.comida.focus();
      return;
    }

    refs.error.hidden = true;
    var resultado = calcular();
    pintarResultado(resultado);

    if (!dialogo.open) {
      dialogo.showModal();
      document.body.classList.add("dialogo-abierto");
      if (refs.cerrar) refs.cerrar.focus();
    }
  }

  grupos.addEventListener("input", function (evento) {
    var input = evento.target.closest('input[type="range"]');
    if (!input) return;
    var id = input.getAttribute("data-id");
    if (!(id in montos)) return;
    montos[id] = Number(input.value);
    actualizar();
  });

  refs.guardar.addEventListener("click", guardarResto);
  refs.basico.addEventListener("click", cubrirBasico);
  refs.reiniciar.addEventListener("click", function () {
    borrar();
    anunciar("Presupuesto reiniciado.");
  });
  refs.cerrarMes.addEventListener("click", abrirResultado);

  refs.reintentar.addEventListener("click", cerrarResultado);
  refs.reiniciarResultado.addEventListener("click", function () {
    borrar();
    cerrarResultado();
    anunciar("Presupuesto reiniciado.");
  });

  if (refs.cerrar) refs.cerrar.addEventListener("click", cerrarResultado);

  dialogo.addEventListener("click", function (evento) {
    if (evento.target === dialogo) cerrarResultado();
  });

  dialogo.addEventListener("cancel", function (evento) {
    evento.preventDefault();
    cerrarResultado();
  });

  dialogo.addEventListener("close", function () {
    document.body.classList.remove("dialogo-abierto");
  });

  actualizar();
})();
