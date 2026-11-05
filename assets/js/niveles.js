/*
 * Contenido de los cinco niveles.
 *
 * Para cambiar un video, editá solamente el objeto "video" de cada nivel:
 *   id      → el código que aparece después de "watch?v=" en la URL de YouTube
 *   titulo  → título visible debajo del reproductor
 *   canal   → canal que publicó el video
 *   busqueda→ texto alternativo por si el video deja de estar disponible
 */
window.NIVELES = [
  {
    numero: 1,
    nombre: "Fisiología",
    color: "#1B3A57",
    resumen: "El cuerpo pide lo mínimo para seguir funcionando: aire, agua, comida, descanso y salud.",
    incluye: ["Aire y agua", "Comida", "Sueño y descanso", "Salud y movimiento", "Refugio y temperatura"],
    porque: "Son las necesidades que el cuerpo reclama primero. Cuando faltan, ocupan toda la atención: con hambre, frío o dolor cuesta pensar en otra cosa.",
    falta: "Saltarse comidas, dormir mal, postergar dolores o vivir en un espacio incómodo. No es falta de voluntad: es el cuerpo pidiendo prioridad.",
    video: {
      id: "krRY_JKxDO4",
      titulo: "Pirámide de Maslow: jerarquía de necesidades humanas",
      canal: "Marketing Digital y Redes Sociales",
      busqueda: "pirámide de Maslow necesidades fisiológicas"
    }
  },
  {
    numero: 2,
    nombre: "Seguridad",
    color: "#2A6360",
    resumen: "Necesitamos sentir que mañana no se desarma: ingresos, vivienda, salud y previsibilidad.",
    incluye: ["Trabajo e ingresos", "Vivienda estable", "Seguridad física", "Ahorro y previsión", "Rutinas y orden"],
    porque: "Después de lo inmediato aparece la necesidad de estabilidad. Saber que vas a tener con qué vivir reduce el alerta constante y libera energía para lo demás.",
    falta: "Incertidumbre económica, miedo al futuro o cambios que no podés anticipar. El cuerpo queda en modo alerta y cuesta proyectar.",
    video: {
      id: "GGlE37bSdCg",
      titulo: "Pirámide de Maslow: jerarquía de las necesidades humanas",
      canal: "Economía Desde Casa",
      busqueda: "pirámide de Maslow seguridad empleo vivienda"
    }
  },
  {
    numero: 3,
    nombre: "Pertenencia y amor",
    color: "#4C6E33",
    resumen: "El afecto y la pertenencia: familia, amistades, pareja y comunidades donde te sentís parte.",
    incluye: ["Vínculos cercanos", "Amistad y pareja", "Familia", "Pertenencia a grupos", "Cuidar y ser cuidado"],
    porque: "Somos seres sociales. Sentirse parte de alguien o de algo sostiene la salud emocional tanto como dormir o comer bien.",
    falta: "Soledad, aislamiento o relaciones que desgastan. La falta de vínculo duele y también se nota en el cuerpo.",
    video: {
      id: "x8jkpEZZQys",
      titulo: "¿Qué es la pirámide de Maslow? Explicado fácil",
      canal: "Economipedia",
      busqueda: "pirámide de Maslow pertenencia y amor"
    }
  },
  {
    numero: 4,
    nombre: "Estima",
    color: "#D9A441",
    resumen: "La necesidad de valer: reconocimiento, logros, respeto y una imagen sana de uno mismo.",
    incluye: ["Autoestima", "Reconocimiento", "Logros y competencia", "Autonomía", "Respeto de los demás"],
    porque: "Necesitamos sentir que lo que hacemos importa. La estima sana combina el respeto propio con el de los demás, sin depender solo del aplauso externo.",
    falta: "Autoexigencia, comparación constante o necesidad de aprobación. También puede verse como exceso de confianza que tapa inseguridad.",
    video: {
      id: "caqDn_T-ezc",
      titulo: "Pirámide de Maslow: todo lo que necesitas saber",
      canal: "Aprendamos Psicología",
      busqueda: "pirámide de Maslow necesidades de estima"
    }
  },
  {
    numero: 5,
    nombre: "Autorrealización",
    color: "#D96245",
    resumen: "Desplegar el propio potencial: propósito, creatividad, aprendizaje y contribución.",
    incluye: ["Propósito", "Creatividad", "Aprendizaje", "Autenticidad", "Contribuir a algo mayor"],
    porque: "Es la necesidad de convertirte en lo que podés llegar a ser. No es un destino de perfección: es la sensación de estar creciendo en la dirección correcta.",
    falta: "Sensación de estancamiento, vivir en piloto automático o hacer solo lo que se espera de vos. No es una urgencia: es una invitación.",
    video: {
      id: "RtnSnkMHrK0",
      titulo: "Pirámide de Maslow: la jerarquía de las necesidades humanas",
      canal: "Psicología Animada",
      busqueda: "pirámide de Maslow autorrealización"
    }
  }
];
