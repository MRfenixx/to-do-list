# Mi Lista de Tareas (To-Do List)

¡Hola! Esta es una aplicación sencilla de lista de tareas hecha para practicar lo básico de **HTML**, **CSS (Bootstrap)** y **JavaScript**. 

Sirve para anotar cosas que tienes que hacer, organizarlas por temas y dificultad, ponerles fecha y tacharlas cuando las termines. ¡Y lo mejor es que no se borran aunque recargues la página!

---

## ¿Cómo funciona el código de JavaScript (`aprender.js`) en cristiano?

Como estás empezando a aprender, te explico paso a paso qué hace cada pedacito de código:

### 1. `let tasks = JSON.parse(localStorage.getItem("tasks")) || []`
Aquí cargamos las tareas que ya teníamos guardadas antes en el navegador. Si no hay nada guardado, arrancamos con una lista vacía `[]`.

### 2. `saveAndRender()`
Esta función hace dos cosas juntas cada vez que agregas, borras o tachas una tarea:
- Guarda la lista actualizada en la memoria del navegador (`localStorage`).
- Vuelve a dibujar todas las tarjetas en la pantalla con `renderTasks()`.

### 3. `renderTasks()`
Es la encargada de limpiar la pantalla y pintar de nuevo todas tus tareas en formato de tarjetas. Si la lista está vacía, te muestra un mensaje que dice que no hay tareas.

### 4. `toggleTask(index)`
Cuando marcas o desmarcas el botoncito (checkbox) de una tarea, esta función cambia su estado (de pendiente a completada o viceversa) y actualiza la pantalla.

### 5. `deleteTask(index)`
Si le das al botón de "Eliminar", esta función busca la tarea en la posición exacta (`index`) y la borra de la lista.

### 6. El formulario (`taskForm.addEventListener("submit", ...)`)
Cuando llenas los datos y haces clic en "Agregar Tarea":
1. Evita que la página se recargue sola.
2. Revisa que no hayas dejado ningún campo vacío.
3. Crea un objeto con tu nueva tarea y lo mete al arreglo.
4. Guarda y actualiza la pantalla.
