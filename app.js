// =======================
// MENU
// =======================
function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("hidden");
}


// =======================
// MATERIAS
// =======================
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

    materias.push({ nombre, profesor, aula, dia, hora, color });

    guardarMaterias();
    mostrarMaterias();

    // Actualizar selects
    cargarMateriasEnSelect();
    cargarMateriasEnSelectExamen();

    // Limpiar
    document.getElementById("nombreMateria").value = "";
    document.getElementById("profesorMateria").value = "";
    document.getElementById("aulaMateria").value = "";
}

function eliminarMateria(index){
    materias.splice(index,1);
    guardarMaterias();
    mostrarMaterias();

    cargarMateriasEnSelect();
    cargarMateriasEnSelectExamen();
}


// =======================
// TAREAS
// =======================
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    const lista = document.getElementById("listaTareas");
    if (!lista) return;

    lista.innerHTML = "";

    tareas.forEach((tarea, index) => {

        let clasePrioridad = "";
        if(tarea.prioridad === "Alta") clasePrioridad = "alta";
        if(tarea.prioridad === "Media") clasePrioridad = "media";
        if(tarea.prioridad === "Baja") clasePrioridad = "baja";

        let claseCompletada = tarea.completada ? "completada" : "";

        lista.innerHTML += `
            <div class="item ${clasePrioridad} ${claseCompletada}">
                
                <strong>${tarea.nombre}</strong> - ${tarea.materia}
                
                <br>📄 ${tarea.descripcion || "Sin descripción"}
                <br>📅 ${tarea.fecha} ⏰ ${tarea.hora || "--"}
                <br>🏷 ${tarea.tipo} | ${tarea.prioridad}

                <div class="acciones">
                    <button onclick="toggleCompletada(${index})">
                        ${tarea.completada ? "↩ Desmarcar" : "✔ Completar"}
                    </button>

                    <button onclick="eliminarTarea(${index})">❌</button>
                </div>

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
        tipo,
        completada: false
    });

    guardarTareas();
    mostrarTareas();
    cargarDashboard();

    // Limpiar
    document.getElementById("nombreTarea").value = "";
    document.getElementById("descripcionTarea").value = "";
    document.getElementById("fechaTarea").value = "";
    document.getElementById("horaTarea").value = "";
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
    cargarDashboard();
}

function toggleCompletada(index) {
    tareas[index].completada = !tareas[index].completada;
    guardarTareas();
    mostrarTareas();
    cargarDashboard();
}


// =======================
// EXAMENES
// =======================
let examenes = JSON.parse(localStorage.getItem("examenes")) || [];

function guardarExamenes() {
    localStorage.setItem("examenes", JSON.stringify(examenes));
}

function mostrarExamenes(){

    const lista = document.getElementById("listaExamenes");
    if(!lista) return;

    lista.innerHTML = "";

    examenes.sort((a,b) => new Date(a.fecha) - new Date(b.fecha));

    const hoy = new Date();

    examenes.forEach((examen, index) => {

        const fecha = new Date(examen.fecha);
        const diff = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));

        let alerta = "";

        if(diff === 0){
            alerta = "🔴 Hoy";
        } else if(diff === 1){
            alerta = "🟠 Mañana";
        } else if(diff > 1){
            alerta = `🟡 En ${diff} días`;
        } else {
            alerta = "⚠ Pasado";
        }

        lista.innerHTML += `
            <div class="item">

                <strong>${examen.nombre}</strong> - ${examen.materia}

                <br>📅 ${examen.fecha} ⏰ ${examen.hora || "--"}
                <br>📘 ${examen.tipo}
                <br>📍 ${examen.ubicacion || "Sin ubicación"}
                <br>📚 ${examen.temas || "Sin temas"}

                <br><span class="badge">${alerta}</span>

                <div class="acciones">
                    <button onclick="eliminarExamen(${index})">❌</button>
                </div>

            </div>
        `;
    });
}

function agregarExamen(){

    const nombre = document.getElementById("nombreExamen").value;
    const materia = document.getElementById("materiaExamen").value;
    const fecha = document.getElementById("fechaExamen").value;
    const hora = document.getElementById("horaExamen").value;
    const tipo = document.getElementById("tipoExamen").value;
    const ubicacion = document.getElementById("ubicacionExamen").value;
    const temas = document.getElementById("temasExamen").value;

    if(nombre === "" || materia === "" || fecha === ""){
        alert("Completa los campos obligatorios");
        return;
    }

    examenes.push({ nombre, materia, fecha, hora, tipo, ubicacion, temas });

    guardarExamenes();
    mostrarExamenes();
    cargarDashboard();

    document.getElementById("nombreExamen").value = "";
    document.getElementById("horaExamen").value = "";
    document.getElementById("ubicacionExamen").value = "";
    document.getElementById("temasExamen").value = "";
}

function eliminarExamen(index) {
    examenes.splice(index, 1);
    guardarExamenes();
    mostrarExamenes();
    cargarDashboard();
}


// =======================
// SELECTS DINÁMICOS
// =======================
function cargarMateriasEnSelect(){

    const select = document.getElementById("materiaTarea");
    if(!select) return;

    select.innerHTML = "";

    if(materias.length === 0){
        select.innerHTML = `<option>No hay materias</option>`;
        return;
    }

    materias.forEach(m => {
        select.innerHTML += `<option value="${m.nombre}">${m.nombre}</option>`;
    });
}

function cargarMateriasEnSelectExamen(){

    const select = document.getElementById("materiaExamen");
    if(!select) return;

    select.innerHTML = "";

    if(materias.length === 0){
        select.innerHTML = `<option>No hay materias</option>`;
        return;
    }

    materias.forEach(m => {
        select.innerHTML += `<option value="${m.nombre}">${m.nombre}</option>`;
    });
}


// =======================
// DASHBOARD
// =======================
function cargarDashboard(){

    const materias = JSON.parse(localStorage.getItem("materias")) || [];
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const examenes = JSON.parse(localStorage.getItem("examenes")) || [];

    const totalMaterias = document.getElementById("totalMaterias");
    if(totalMaterias) totalMaterias.textContent = materias.length;

    const pendientes = tareas.filter(t => !t.completada);
    const tareasPendientes = document.getElementById("tareasPendientes");
    if(tareasPendientes) tareasPendientes.textContent = pendientes.length;

    const hoy = new Date();

    const proximas = tareas.filter(t => {
        const fecha = new Date(t.fecha);
        const diff = (fecha - hoy) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 3;
    });

    const proximasTareas = document.getElementById("proximasTareas");
    if(proximasTareas) proximasTareas.textContent = proximas.length;

    const examenesCercanos = examenes.filter(e => {
        const fecha = new Date(e.fecha);
        const diff = (fecha - hoy) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 5;
    });

    const examenesElem = document.getElementById("examenesCercanos");
    if(examenesElem) examenesElem.textContent = examenesCercanos.length;

    const progreso = document.getElementById("barraProgreso");
    if(progreso){
        const total = tareas.length;
        const completadas = tareas.filter(t => t.completada).length;
        const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);

        progreso.style.width = porcentaje + "%";
        progreso.textContent = porcentaje + "%";
    }

    const listaTareas = document.getElementById("listaDashboardTareas");

    if(listaTareas){
        listaTareas.innerHTML = "";

        const tareasOrdenadas = tareas
            .filter(t => !t.completada)
            .sort((a,b) => new Date(a.fecha) - new Date(b.fecha))
            .slice(0,5);

        tareasOrdenadas.forEach(t => {

            const fecha = new Date(t.fecha);
            const diff = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));

            let mensaje = "";
            let clase = "";

            if(diff === 0){
                mensaje = "🔴 Vence hoy";
                clase = "red-badge";
            } 
            else if(diff === 1){
                mensaje = "🟠 Vence mañana";
                clase = "orange-badge";
            } 
            else if(diff > 1){
                mensaje = `🟡 Faltan ${diff} días`;
                clase = "yellow-badge";
            } 
            else {
                mensaje = "⚠ Atrasada";
                clase = "red-badge";
            }

            listaTareas.innerHTML += `
                <div class="task">
                    <span>📝 ${t.nombre}</span>
                    <span class="badge ${clase}">${mensaje}</span>
                </div>
            `;
        });
    }
}


// =======================
// INICIALIZACIÓN GLOBAL
// =======================
document.addEventListener("DOMContentLoaded", () => {
    mostrarMaterias();
    mostrarTareas();
    mostrarExamenes();
    cargarMateriasEnSelect();
    cargarMateriasEnSelectExamen();
    cargarDashboard();
});