

//console.log("from Jscript");

//DOM Elements: 
const $d = document;
const $task_add_input = $d.getElementById("task_add_container");
const $task_add_button = $d.getElementById("task_add_btn");
const $tasks = $d.getElementById("tasks");
const $message = $d.getElementById("message");

//console.log($task_add_input);
//console.log($task_add_button);

let tasksQuantity = 0, TASK_QUANTITY_MAX = 10;
let taskNumberId = 0;
//texto del mensaje por default
$message.innerHTML = "Insert a task, then thick it or deleted it";

$task_add_button.addEventListener("click", () => {
    //console.log("agregar tarea boton");
    agregarTarea($task_add_input.value, taskNumberId);
});

$task_add_input.addEventListener("keyup", (e) => {
    //console.log(e.key);
    if (e.key == "Enter"){
        //console.log("agregar tarea por enter en input");
        agregarTarea($task_add_input.value, taskNumberId);
    }
});
/*   TEMPLATE FOR ONE TASK
<div class = "task_list_container" id = "task_number_1">
    <p class="task">Collect Shopping Collect Shopping</p>
    <button class = "done"  onclick="tacharTarea('tarea_numero_1')"><i class="fa-solid fa-check"></i></button>
    <button class = "delete" onclick="eliminarTarea('tarea_numero_1')"><i class="fa-solid fa-trash-can"></i></button>
</div>   
*/
const agregarTarea = (textoTarea, tareaNumero) => {
    
    if (textoTarea == ""){        
        mostrarMensaje("El campo [Tarea] NO puede estar vacio.", 2000);
        return;
    }
    if (tasksQuantity >= TASK_QUANTITY_MAX){
        mostrarMensaje(`Limite de tareas maximas alcanzado = ${TASK_QUANTITY_MAX}`, 2000);
        return;
    }
    $task_add_input.value = "";

    //lista_tareas_contenedor
    const $divContenedorTareas = $d.createElement("div");    
    $divContenedorTareas.classList.add("task_list_container");
    $divContenedorTareas.setAttribute("id", "task_number_" + tareaNumero);

    //parrafo
    const $parrafoTarea = $d.createElement("p");
    $parrafoTarea.classList.add("task");
    $parrafoTarea.innerHTML = textoTarea;
    $parrafoTarea.setAttribute("onclick", `tacharTarea("task_number_${tareaNumero}")`);

    //boton de tarea hecha
    const $botonHecha = $d.createElement("button");    
    $botonHecha.classList.add("done");
    $botonHecha.setAttribute("onclick", `tacharTarea("task_number_${tareaNumero}")`);

    //icono de tarea hecha, el tilde o check
    const $iconoChequeado = $d.createElement("i");
    $iconoChequeado.classList.add("fa-solid");
    $iconoChequeado.classList.add("fa-check");

    //Boton de eliminar tarea
    const $botonEliminar = $d.createElement("button");    
    $botonEliminar.classList.add("delete");
    //$botonEliminar.setAttribute("onclick", `mostrar("tarea_numero_${tareaNumero}")`); 
    $botonEliminar.setAttribute("onclick", `generarYmostrarModal("task_number_${tareaNumero}")`); 

     //icono de eliminar 1tarea, el tachito de basura
     const $iconoEliminar = $d.createElement("i");
     $iconoEliminar.classList.add("fa-solid");
     $iconoEliminar.classList.add("fa-trash-can");

     //agrego los hijos de los botones, los iconos
     $botonHecha.appendChild($iconoChequeado);
     $botonEliminar.appendChild($iconoEliminar);
     
     //agrego los hijos del div contenedor
     $divContenedorTareas.appendChild($parrafoTarea);
     $divContenedorTareas.appendChild($botonHecha);
     $divContenedorTareas.appendChild($botonEliminar);

     //agrego al div tareas, originalmente en el HTML
     $tasks.insertAdjacentElement('afterbegin', $divContenedorTareas);

     tasksQuantity += 1;
     taskNumberId += 1;
};
//agregarTarea("primer tarea", 1);
//agregarTarea("otra tarea", 2);


const eliminarTarea = (idTarea) => {
    ocultarModal();    
    const $tareaAeliminar = $d.getElementById(idTarea);    
    $tareaAeliminar.remove();
    tasksQuantity -= 1;
    mostrarMensaje("SE ELIMINO LA TAREA", 2000);
    //console.log("eliminando tarea ", $tareaAeliminar);
    
}
//eliminarTarea("tarea_numero_1");

const tacharTarea = (idTarea) => {
    $parrafoTarea = $d.getElementById(idTarea).firstElementChild;
    //console.log($parrafoTarea);
    $parrafoTarea.classList.toggle("through");
}

const generarYmostrarModal = (idTarea) => {
    /*
    <div class="modal">
        <p>Mensaje del modal</p>
        <div id="botones_confirmacion"> 
            <button onclick = "eliminarTarea('tarea_numero_1')">si</button>
            <button onclick = "ocultarModal()">no</button>
        </div>        
    </div>
    */

    $d.querySelector(".screen_block").setAttribute("style", "display:block;");
   //Si ya existe un modal, lo elimino para tener uno nuevo con el id de tarea correcto
   const $modalBuscado = $d.querySelector(".modal");
    if ( $modalBuscado != null){ 
        $modalBuscado.remove();        
    } 
    //Si no existe un modal, lo creo y lo muestro
    else {
        //consigo el texto de la tarea
        let textoTarea = $d.getElementById(idTarea).firstElementChild.innerHTML;
        //console.log("este es el mensaje: ", textoTarea);

        //creo el modal que es un div
        const $modal = $d.createElement("div");
        $modal.classList.add("modal");

        //creo el parrafo del mensaje del modal
        const $mensajeModal = $d.createElement("p");
        $mensajeModal.innerHTML = `Are you sure you want to delete the following task?: <br> "${textoTarea}"`;

        //creo el contenedor de los botones
        const $botonesContenedor = $d.createElement("div");
        $botonesContenedor.setAttribute("id", "botones_confirmacion");

        //creo los botones de confirmacion y le asigno las acciones del evento onclick
        const $botonSi = $d.createElement("button");
        $botonSi.setAttribute("onclick", `eliminarTarea('${idTarea}')`);
        $botonSi.innerHTML = "YES";

        const $botonNo = $d.createElement("button");
        $botonNo.setAttribute("onclick", "ocultarModal();");
        $botonNo.innerHTML = "NO";

        $botonesContenedor.appendChild($botonSi);
        $botonesContenedor.appendChild($botonNo);

        $modal.appendChild($mensajeModal);
        $modal.appendChild($botonesContenedor);

        $d.body.appendChild($modal);
        //$d.body.appendChild(modalText);
        
    }
}


const ocultarModal = () => {
    const $modal = $d.querySelector(".modal");
    //console.log($modal);
    $modal.remove();
    $d.querySelector(".screen_block").setAttribute("style", "display:none;");
}


//mostrarMensaje("SE ELIMINO LA TAREA", 2000);
const mostrarMensaje = (mensajeAmostrar, tiempoAmostrar) => {
    let mensajeAnterior = $message.innerHTML;
    $message.innerHTML = mensajeAmostrar;
    setInterval(() => {
        $message.innerHTML =  mensajeAnterior;
    }, tiempoAmostrar);
}




