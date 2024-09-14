
const preguntasN = [2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45, 47, 50, 52, 55, 57];
const preguntasE = [1, 3, 5, 8, 10, 13, 15, 17, 20, 22, 25, 27, 29, 32, 34, 37, 39, 41, 44, 46, 49, 51, 53, 56];
const preguntasL = [6, 12, 18, 24, 30, 36, 42, 48, 54];

// Preguntas donde la respuesta correcta es "Sí"
const respuestasSi = [1,2,3,4,6,7,8,9,10,11,13,14,16,17,19,21,22,23,24,25,26,27,28,31,33,35,36,38,39,40,43,44,45,46,47,49,50,52,53,55,56,57];

// Preguntas donde la respuesta correcta es "No"
const respuestasNo = [5,12,15,18,20,29,30,32,34,37,41,42,48,51,54,];

// Función para determinar el tipo de personalidad
function determinarPersonalidad(N, E) {
    let resultado = "Usted, apreciado colaborador de Psicoinnovate tiene un tipo de personalidad ";

    // Definimos las interpretaciones detalladas
    const interpretaciones = {
        "Altamente Colérico": "Son personas sensibles, intranquilas, agresivas, excitables, inconstantes, impulsivas, optimistas y activas. Tienen dificultad para dormir, pero mucha facilidad para despertarse. Los coléricos son de respuestas enérgicas y rápidas.",
        "Altamente Melancólico": "Son personas profundas, reservadas, meticulosas y perfeccionistas. Tienden a ser muy reflexivas, introvertidas y pueden ser propensas a la tristeza o a la preocupación excesiva. Suelen ser muy cuidadosos y organizados.",
        "Altamente Sanguíneo": "Son personas extrovertidas, entusiastas, sociables y optimistas. Les gusta estar rodeadas de gente y son muy comunicativas. Suelen ser espontáneas y pueden tener una gran energía y entusiasmo por la vida.",
        "Altamente Flemático": "Son personas tranquilas, pacientes, constantes y armoniosas. Prefieren la estabilidad y la paz. Suelen ser buenos oyentes y mediadores, y pueden ser percibidos como reservados o poco expresivos.",
        "Colérico": "Son personas enérgicas, decididas y a veces impacientes. Les gusta tomar el control y pueden ser muy ambiciosas y motivadas. A menudo son directos y pueden tener una actitud dominante.",
        "Melancólico": "Son personas analíticas, detallistas y perfeccionistas. Pueden ser reservadas y tienden a ser introspectivas. A menudo tienen un alto estándar para sí mismas y para los demás.",
        "Sanguíneo": "Son personas alegres, sociables y enérgicas. Disfrutan de la compañía de otros y son muy expresivas. Pueden ser impulsivas y tienen una visión optimista de la vida.",
        "Flemático": "Son personas calmadas, confiables y equilibradas. Prefieren la rutina y suelen evitar conflictos. Son buenos para mantener la paz y pueden ser vistos como pacientes y metódicos."
    };

    // Definimos los límites para cada tipo de personalidad basado en N y E
    let tipoPersonalidad = "";

    if (N >= 16) {
        if (E >= 16) {
            tipoPersonalidad = "Altamente Colérico";
        } else if (E <= 10) {
            tipoPersonalidad = "Altamente Melancólico";
        } else {
            tipoPersonalidad = "Colérico";
        }
    } else if (N <= 7) {
        if (E >= 16) {
            tipoPersonalidad = "Altamente Sanguíneo";
        } else if (E <= 10) {
            tipoPersonalidad = "Altamente Flemático";
        } else {
            tipoPersonalidad = "Sanguíneo";
        }
    } else {
        if (E >= 16) {
            tipoPersonalidad = "Colérico";
        } else if (E <= 10) {
            tipoPersonalidad = "Melancólico";
        } else {
            // Definimos el rango intermedio
            if (N < 11) { // Rango intermedio para N
                if (E <= 12) {
                    tipoPersonalidad = "Melancólico";
                } else if (E <= 14) {
                    tipoPersonalidad = "Flemático";
                } else {
                    tipoPersonalidad = "Colérico";
                }
            } else { // Rango intermedio para E
                if (E <= 12) {
                    tipoPersonalidad = "Sanguíneo";
                } else if (E <= 14) {
                    tipoPersonalidad = "Flemático";
                } else {
                    tipoPersonalidad = "Colérico";
                }
            }
        }
    }

    resultado += tipoPersonalidad + ". " + interpretaciones[tipoPersonalidad];

    return resultado;
}

// Función para manejar el evento de clic del botón
function calcularPersonalidad(event) {
    // Evita que el formulario se envíe y recargue la página
    event.preventDefault();

    let respuestasN = 0;
    let respuestasE = 0;
    let respuestasL = 0;

    // Recorre todas las preguntas y cuenta las respuestas para cada categoría
    for (let i = 1; i <= 57; i++) {
        const respuesta = document.querySelector(`input[name="q${i}"]:checked`);
        if (respuesta) {
            // Validar si la respuesta es correcta
            if ((respuestasSi.includes(i) && respuesta.value === 'yes') || 
                (respuestasNo.includes(i) && respuesta.value === 'no')) {
                
                if (preguntasN.includes(i)) {
                    respuestasN++;
                } else if (preguntasE.includes(i)) {
                    respuestasE++;
                } else if (preguntasL.includes(i)) {
                    respuestasL++;
                }
            }
        }
    }

    const resultadoPersonalidad = determinarPersonalidad(respuestasN, respuestasE);

    // Verificar sinceridad
    let sinceridad = '';
    if (respuestasL >= 4) {
        sinceridad = 'Ha respondido sinceramente.';
    } else {
        sinceridad = 'Parece que no ha sido completamente sincero.';
    }

    // Mostrar el resultado y ocultar el formulario
    const resultado = `${resultadoPersonalidad} Ha respondido correctamente: ${respuestasN} preguntas en N, ${respuestasE} preguntas en E, y ${respuestasL} preguntas en L. ${sinceridad}`;

    // Crear un nuevo elemento para el resultado
    const resultadoDiv = document.createElement('div');
    resultadoDiv.id = 'resultado';
    resultadoDiv.textContent = resultado;

    // Insertar el resultado al principio del formulario y ocultar las preguntas
    const formulario = document.getElementById('personalidadForm');
    formulario.innerHTML = '';
    formulario.appendChild(resultadoDiv);

    // Guardar el resultado en localStorage para mostrar en otra página
    localStorage.setItem('resultadoTest', resultado);

    // Agregar el botón para reiniciar el formulario
    const botonReiniciar = document.createElement('button');
    botonReiniciar.textContent = 'Volver a empezar';
    botonReiniciar.addEventListener('click', function() {
        location.reload();
    });
    formulario.appendChild(botonReiniciar);
}
