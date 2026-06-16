const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

async function loadTasks() {

    const response = await fetch("/tasks");

    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.title}
            </span>

            <div>
                <button onclick="toggleTask(${task.id}, ${task.completed})">
                    ✓
                </button>

                <button onclick="deleteTask(${task.id})">
                    X
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

async function addTask() {

    const title = taskInput.value;

    if (!title) return;

    await fetch("/tasks", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title
        })
    });

    taskInput.value = "";

    loadTasks();
}

async function toggleTask(id, completed) {

    await fetch(`/tasks/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            completed: !completed
        })
    });

    loadTasks();
}

async function deleteTask(id) {

    await fetch(`/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

addBtn.addEventListener("click", addTask);

loadTasks();