// Referencias al DOM
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Cargar tareas desde localStorage o array vacío
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Función para guardar en localStorage y renderizar
function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Función para obtener color de badge según categoría
function getThemeBadge(tema) {
    switch (tema) {
        case "Salud": return "bg-success bg-opacity-25 text-success";
        case "Estudio": return "bg-info bg-opacity-25 text-info";
        case "Comida": return "bg-warning bg-opacity-25 text-warning";
        case "Trabajo": return "bg-primary bg-opacity-25 text-primary";
        case "Personal": return "bg-purple bg-opacity-25 text-purple" || "bg-secondary bg-opacity-25 text-light";
        default: return "bg-secondary bg-opacity-25 text-light";
    }
}

// Función para obtener color de badge según dificultad
function getDifficultyBadge(dificultad) {
    switch (dificultad) {
        case "Baja": return "bg-success text-white";
        case "Media": return "bg-warning text-dark";
        case "Alta": return "bg-danger text-white";
        default: return "bg-secondary text-white";
    }
}

// Función para renderizar las tareas en pantalla
function renderTasks() {
    taskList.innerHTML = "";
    
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="text-muted mb-2"><i class="bi bi-clipboard-x display-4"></i></div>
                <p class="text-muted mb-0">No hay tareas pendientes. ¡Agrega una nueva arriba!</p>
            </div>
        `;
        taskCount.innerText = "0 tareas";
        return;
    }

    taskCount.innerText = `${tasks.length} ${tasks.length === 1 ? 'tarea' : 'tareas'}`;

    tasks.forEach((task, index) => {
        const col = document.createElement("div");
        col.className = "col-12";

        col.innerHTML = `
            <div class="card bg-secondary bg-opacity-10 border-0 rounded-4 p-3 shadow-sm ${task.completada ? 'task-completed' : ''}">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div class="d-flex align-items-start gap-3">
                        <div class="form-check mt-1">
                            <input class="form-check-input rounded-circle fs-5 shadow-none" type="checkbox" ${task.completada ? 'checked' : ''} onchange="toggleTask(${index})">
                        </div>
                        <div>
                            <h5 class="text-light fw-semibold mb-1 ${task.completada ? 'text-decoration-line-through text-muted' : ''}">${escapeHTML(task.asunto)}</h5>
                            <div class="d-flex flex-wrap gap-2 align-items-center mt-2">
                                <span class="badge ${getThemeBadge(task.tema)} rounded-pill px-2.5 py-1 small">${escapeHTML(task.tema)}</span>
                                <span class="badge ${getDifficultyBadge(task.dificultad)} rounded-pill px-2.5 py-1 small">Dificultad: ${escapeHTML(task.dificultad)}</span>
                                <span class="text-muted small"><i class="bi bi-calendar-event me-1"></i>Plazo: ${escapeHTML(task.plazo)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 align-self-end align-self-md-center">
                        <button class="btn btn-outline-danger btn-sm rounded-3 px-3 py-1.5" onclick="deleteTask(${index})" title="Eliminar tarea">
                            <i class="bi bi-trash"></i> <span class="d-none d-md-inline">Eliminar</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        taskList.append(col);
    });
}

// Función para cambiar estado completado
window.toggleTask = function(index) {
    tasks[index].completada = !tasks[index].completada;
    saveAndRender();
};

// Función para eliminar tarea
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveAndRender();
};

// Utilidad para prevenir XSS básico
function str(val) {
    return val;
}
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Manejador del formulario
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const asunto = document.getElementById("asunto").value.trim();
    const tema = document.getElementById("tema").value;
    const dificultad = document.getElementById("dificultad").value;
    const plazo = document.getElementById("plazo").value;

    if (!asunto || !tema || !dificultad || !plazo) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const newTask = {
        asunto,
        tema,
        dificultad,
        plazo,
        completada: false
    };

    tasks.push(newTask);
    saveAndRender();
    taskForm.reset();
});

// Render inicial al cargar la página
renderTasks();
