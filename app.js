let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/*==============
MENU LATERAL
================*/
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

/*==============
AGREGAR TAREAS 
================*/
function addTask() {
    const text = document.getElementById("taskInput").value;
    const category = document.getElementById("categorySelect").value;
    const deadline = document.getElementById("deadlineInput").value;

    if (text === "" || deadline === "") {
        document.getElementById("message").textContent = "Completa todos los campos";
        document.getElementById("message").style.color = "red";
        return;
    }

    const task = {
        id: Date.now(),
        text,
        category,
        deadline,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("message").textContent = "Tarea agregada correctamente";
    document.getElementById("message").style.color = "green";
    //LIMPIAR CAMPOS

    document.getElementById("taskInput").value = "";
    document.getElementById("deadlineInput").value = "";

/*=====================
    MOSTRAR TAREAS URGENTES
=======================*/
function showUrgentTasks(){
    const urgentContainer=document.getElementById("urgentTasks");
    urgentContainer.innerHTML ="";

    const now = new Date();

    const urgent=tasks.filter(task =>{
        const deadline=new Date (task.Date);
        const diff=deadline-now;
        const hours=diff/(1000*60*60);

        return hours > 0 && hours<=24&&! task.completed;
    });

if(urgent.length ===0){
urgentContainer.innerHTML=<p>"No hay tareas proximas a vencer"</p>;
return;
}

urgent.forEach(task=> {
    const deadlineDate =new Date(task.deadline);
    const diff =deadlineDate-now;
    const hoursLeft=Math.floor(diff /(1000*60*60));

    const div=document.createElement("div");
    div.style.background="#fee2e2";
    div.style.padding= "10px";
    div.style.marginBottom="10px";
    div.style.borderRadius="8px";

    div.innerHTML=`
    <strong>${task.text}</strong><br>
    <small>Categoria: ${task.category}</small><br>
    <small>Vence: $
    {deadlineDate.toLocalString()}</small><br>
       <small><b>Faltan${hoursLeft} horas</b></small>
    `;

    urgentContainer.appendChild(div);
});
}


document.addEventListener("DOMContentLoaded".
 function(){
    showUrgentTasks();
 });
}