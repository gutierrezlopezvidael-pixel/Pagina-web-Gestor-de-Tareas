function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("hidden");
}

/* =========================
   MATERIAS
========================= */
let materias = JSON.parse(localStorage.getItem("materias")) || [];

function guardarMaterias() {
    localStorage.setItem("materias", JSON.stringify(materias));
}

function mostrarMaterias() {

    const lista = document.getElementById("listaMaterias");
    if(!lista) return;

    lista.innerHTML = "";

    materias.forEach((materia, index) => {

        lista.innerHTML += `
        <div class="item" style="border-left:6px solid ${materia.color}">
        
            📚 <strong>${materia.nombre}</strong>
            <br>👨‍🏫 Profesor: ${materia.profesor}
            <br>🏫 Aula: ${materia.aula}
            <br>📅 Día: ${materia.dia}
            <br>⏰ Hora: ${materia.hora}

            <button onclick="eliminarMateria(${index})">❌</button>

        </div>
        `;
    });
}

function agregarMateria() {

    const nombre = document.getElementById("nombreMateria").value;
    const profesor = document.getElementById("profesorMateria").value;
    const aula = document.getElementById("aulaMateria").value;
    const dia = document.getElementById("diaMateria").value;
    const hora = document.getElementById("horaMateria").value;
    const color = document.getElementById("colorMateria").value;

    if(nombre === "" || profesor === ""){
        alert("Completa los campos principales");
        return;
    }

    materias.push({
        nombre,
        profesor,
        aula,
        dia,
        hora,
        color
    });

    guardarMaterias();
    mostrarMaterias();

    document.getElementById("nombreMateria").value = "";
    document.getElementById("profesorMateria").value = "";
    document.getElementById("aulaMateria").value = "";
}

function eliminarMateria(index){

    materias.splice(index,1);

    guardarMaterias();
    mostrarMaterias();
}

mostrarMaterias();


/* =========================
   TAREAS
========================= */

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {

    const lista = document.getElementById("listaTareas");

    if(!lista) return;

    lista.innerHTML = "";

    tareas.forEach((tarea, index) => {

        lista.innerHTML += `
        <div class="item">

            <strong>📝 ${tarea.nombre}</strong> - ${tarea.materia}

            <p>${tarea.descripcion || ""}</p>

            <p>
            📅 Entrega: ${tarea.fecha}
            ⏰ ${tarea.hora || ""}
            </p>

            <p>
            📌 Tipo: ${tarea.tipo}
            ⚡ Prioridad: ${tarea.prioridad}
            </p>

            <button onclick="eliminarTarea(${index})">❌ Eliminar</button>

        </div>
        `;

    });

}

function agregarTarea() {

    const nombre = document.getElementById("nombreTarea").value;
    const materia = document.getElementById("materiaTarea").value;
    const descripcion = document.getElementById("descripcionTarea").value;
    const fecha = document.getElementById("fechaTarea").value;
    const hora = document.getElementById("horaTarea").value;
    const prioridad = document.getElementById("prioridadTarea").value;
    const tipo = document.getElementById("tipoTarea").value;

    if (nombre === "" || materia === "" || fecha === "") {
        alert("Completa los campos obligatorios");
        return;
    }

    tareas.push({
        nombre,
        materia,
        descripcion,
        fecha,
        hora,
        prioridad,
        tipo
    });

    guardarTareas();
    mostrarTareas();

    document.getElementById("nombreTarea").value = "";
    document.getElementById("materiaTarea").value = "";
    document.getElementById("descripcionTarea").value = "";
    document.getElementById("fechaTarea").value = "";
    document.getElementById("horaTarea").value = "";
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
}

mostrarTareas();



/* =========================
   EXAMENES
========================= */

let examenes = JSON.parse(localStorage.getItem("examenes")) || [];

function guardarExamenes() {
    localStorage.setItem("examenes", JSON.stringify(examenes));
}

function mostrarExamenes() {
    const lista = document.getElementById("listaExamenes");
    if (!lista) return;

    lista.innerHTML = "";

    examenes.forEach((examen, index) => {
        lista.innerHTML += `
            <div class="item">
                📅 <strong>${examen.nombre}</strong> - ${examen.materia}
                <br> 🗓 Fecha: ${examen.fecha}
                <button onclick="eliminarExamen(${index})">❌</button>
            </div>
        `;
    });
}

function agregarExamen() {
    const nombre = document.getElementById("nombreExamen").value;
    const materia = document.getElementById("materiaExamen").value;
    const fecha = document.getElementById("fechaExamen").value;

    if (nombre === "" || materia === "" || fecha === "") {
        alert("Completa todos los campos");
        return;
    }

    examenes.push({ nombre, materia, fecha });
    guardarExamenes();
    mostrarExamenes();

    document.getElementById("nombreExamen").value = "";
    document.getElementById("materiaExamen").value = "";
    document.getElementById("fechaExamen").value = "";
}

function eliminarExamen(index) {
    examenes.splice(index, 1);
    guardarExamenes();
    mostrarExamenes();
}

mostrarExamenes();