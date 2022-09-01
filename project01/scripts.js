

/*DOM Elements: */
const $d = document;
const $task_add_input = $d.getElementById("task_add_container");
const $task_add_button = $d.getElementById("task_add_btn");
//const $tasks = $d.getElementById("tasks");
/*DOM Elements: */


/*CONSTANTS */
let tasksQuantity = 0;
let taskNumberId = 0;
const 
TASK_QUANTITY_MAX = 10,
ID_MESSAGE_LABEL = 'message',
DELAY_TIME_INIT = 10000,
DELAY_TIME_NORMAL = 4000,
//ENGLISH = 0 SPANISH = 1
LANGUAGE = 1,
MESSAGES = [
            ['You can insert a new task', 'The field [task] can´t be empty.', 'Maximum task limit reached', 'Are you sure you want to delete the following task?', 'Task Deleted', 'To Do list Project', 'Insert a task'],
            ['Puede ingresar una nueva tarea', 'El campo [Tarea] NO puede estar vacio.', 'Limite de tareas maximas alcanzado', 'Esta seguro de borrar la siguiente tarea?', 'Tarea eliminada', 'Proyecto lista de tareas', 'Ingrese una tarea']                
            ];
/*CONSTANTS */

       
/*EVENTS HANDLERS*/
$d.addEventListener("DOMContentLoaded", function() {    
    showMessage(ID_MESSAGE_LABEL, MESSAGES[LANGUAGE][0], DELAY_TIME_NORMAL);
    writeTitle(MESSAGES[LANGUAGE][5]);
  });
$task_add_button.addEventListener("click", () => {
    //console.log("Add Task Button");
    addTask($task_add_input.value, taskNumberId);
});
$task_add_input.addEventListener("keyup", (e) => {
    //console.log(e.key);
    if (e.key == "Enter"){
        //console.log("agregar tarea por enter en input");
        addTask($task_add_input.value, taskNumberId);
    }
});
/*EVENTS HANDLERS*/


/***************  FUNCTIONS TO MANAGE THE TASK ELEMENTS  ********************/
const createTask = (idTaskContainer, taskText, taskNumber)  =>{
    //tasks container DOM element
    const $tasks = $d.getElementById(idTaskContainer);
    //task list container
    const $divContenedorTareas = $d.createElement("div");    
    $divContenedorTareas.classList.add("task_list_container");
    $divContenedorTareas.setAttribute("id", "task_number_" + taskNumber);
    //paragraph
    const $parrafoTarea = $d.createElement("p");
    $parrafoTarea.classList.add("task");
    $parrafoTarea.innerHTML = taskText;
    $parrafoTarea.setAttribute("onclick", `crossoutTask("task_number_${taskNumber}")`);
    //task done button
    const $botonHecha = $d.createElement("button");    
    $botonHecha.classList.add("done");
    $botonHecha.setAttribute("onclick", `crossoutTask("task_number_${taskNumber}")`);
    //task done icon
    const $iconoChequeado = $d.createElement("i");
    $iconoChequeado.classList.add("fa-solid");
    $iconoChequeado.classList.add("fa-check");
    //delete task button
    const $botonEliminar = $d.createElement("button");    
    $botonEliminar.classList.add("delete");    
    $botonEliminar.setAttribute("onclick", `createShowModal("task_number_${taskNumber}")`); 
     //delete task icon, the trash can
     const $iconoEliminar = $d.createElement("i");
     $iconoEliminar.classList.add("fa-solid");
     $iconoEliminar.classList.add("fa-trash-can");
     //add the icons as a button's child
     $botonHecha.appendChild($iconoChequeado);
     $botonEliminar.appendChild($iconoEliminar);     
     //add the children of the div container
     $divContenedorTareas.appendChild($parrafoTarea);
     $divContenedorTareas.appendChild($botonHecha);
     $divContenedorTareas.appendChild($botonEliminar);
     //add all to the tasks div
     $tasks.insertAdjacentElement('afterbegin', $divContenedorTareas);
}
const addTask = (taskText, taskNumber) => {    
    if (taskText == ""){                
        showMessage(ID_MESSAGE_LABEL, MESSAGES[LANGUAGE][1], DELAY_TIME_NORMAL);
        return;
    }
    if (tasksQuantity >= TASK_QUANTITY_MAX){        
        showMessage(ID_MESSAGE_LABEL, MESSAGES[LANGUAGE][2], DELAY_TIME_NORMAL);
        return;
    }
    $task_add_input.value = "";
    createTask('tasks', taskText, taskNumber);
    tasksQuantity += 1;
    taskNumberId += 1;
};
const deleteTask = (taskId) => {
    hideModal();    
    const $taskToDelete = $d.getElementById(taskId);    
    $taskToDelete.remove();
    tasksQuantity -= 1;
    showMessage(ID_MESSAGE_LABEL, MESSAGES[LANGUAGE][4], DELAY_TIME_NORMAL);    
}
const crossoutTask = (taskId) => {
    $taskParagraph = $d.getElementById(taskId).firstElementChild;    
    $taskParagraph.classList.toggle("through");
}
/***************  FUNCTIONS TO MANAGE THE TASK ELEMENTS  ********************/


/***********FUNCTIONS TO MANAGE THE MODAL CONFIRMATION*********************/
const createShowModal = (taskId) => {   
   //Si ya existe un modal, lo elimino para tener uno nuevo con el id de tarea correcto
   const $modalBuscado = $d.querySelector(".modal");
    if ( $modalBuscado != null){ 
        $modalBuscado.remove();        
    } 
    //Si no existe un modal, lo creo y lo muestro
    else {
        //consigo el texto de la tarea
        let taskText = $d.getElementById(taskId).firstElementChild.innerHTML;        
        //creo el modal que es un div
        const $modal = $d.createElement("div");
        $modal.classList.add("modal");
        //creo el modal que es un div
        const $window = $d.createElement("div");
        $window.classList.add("window");
        //creo el parrafo del mensaje del modal
        const $mensajeModal = $d.createElement("p");
        $mensajeModal.innerHTML = `${MESSAGES[LANGUAGE][3]}: <br> "${taskText}"`;
        //creo el contenedor de los botones
        const $botonesContenedor = $d.createElement("div");
        $botonesContenedor.setAttribute("id", "botones_confirmacion");
        //creo los botones de confirmacion y le asigno las acciones del evento onclick
        const $botonSi = $d.createElement("button");
        $botonSi.setAttribute("onclick", `deleteTask('${taskId}')`);
        $botonSi.innerHTML = "YES";
        const $botonNo = $d.createElement("button");
        $botonNo.setAttribute("onclick", "hideModal();");
        $botonNo.innerHTML = "NO";
        $botonesContenedor.appendChild($botonSi);
        $botonesContenedor.appendChild($botonNo);
        $window.appendChild($mensajeModal);
        $window.appendChild($botonesContenedor);
        $modal.appendChild($window);
        $d.body.appendChild($modal); 
    }
}
const hideModal = () => {
    const $modal = $d.querySelector(".modal");    
    $modal.remove();    
}
/***********FUNCTIONS TO MANAGE THE MODAL CONFIRMATION*********************/


/*showMessage function */
const showMessage = (idMessageLabel, messageShow, timeShow) => {
    const $message = $d.getElementById(idMessageLabel);
    $message.innerHTML = "";
    $message.innerHTML = messageShow;
    let showedMessageInterval;
    if (!showedMessageInterval) {
        showedMessageInterval = setInterval(() => {
            $message.innerHTML = "";  
            clearInterval(showedMessageInterval);
            showedMessageInterval = null;          
        }, timeShow);
    } 
}

const writeTitle = (text) => {
    $d.getElementById('header_title').innerHTML = "";
    $d.getElementById('header_title').innerHTML = text;
    $d.getElementById('task_add_container').setAttribute('placeholder', MESSAGES[LANGUAGE][6]);    
};