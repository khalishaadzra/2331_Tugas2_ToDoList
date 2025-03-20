let tasks = [];
let editIndex = -1; // Menyimpan indeks yang sedang diedit

function addTask() {
    let taskText = document.getElementById("taskInput").value;
    let taskDate = document.getElementById("dateInput").value;
    let taskPriority = document.getElementById("priorityInput").value;

    if (taskText === "" || taskDate === "") return;

    tasks.push({ text: taskText, date: taskDate, priority: taskPriority, status: "To-Do" });
    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";
    renderTasks();
}

function renderTasks() {
    document.getElementById("taskList").innerHTML = "";
    tasks.forEach((task, index) => {
        let statusIcon = task.status === "To-Do" ? "📝" : task.status === "Doing" ? "🔄" : "✅";
        document.getElementById("taskList").innerHTML += `
            <li class='flex justify-between items-center p-4 bg-gray-50 border rounded-lg text-xl shadow-md w-full'>
                <span>${task.text} - ${task.date} (${task.priority})</span>
                <div class="flex space-x-2">
                    <button onclick='changeStatus(${index})' class='bg-yellow-400 text-white px-4 py-2 rounded-lg text-xl'>${statusIcon}</button>
                    <button onclick='openEditModal(${index})' class='bg-green-400 text-white px-4 py-2 rounded-lg text-xl'>✏️</button>
                    <button onclick='deleteTask(${index})' class='bg-red-400 text-white px-4 py-2 rounded-lg text-xl'>🗑️</button>
                </div>
            </li>`;
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function changeStatus(index) {
    if (tasks[index].status === "To-Do") tasks[index].status = "Doing";
    else if (tasks[index].status === "Doing") tasks[index].status = "Done";
    else tasks[index].status = "To-Do";
    renderTasks();
}

function openEditModal(index) {
    editIndex = index;
    document.getElementById("editTaskText").value = tasks[index].text;
    document.getElementById("editTaskDate").value = tasks[index].date;
    document.getElementById("editTaskPriority").value = tasks[index].priority;
    document.getElementById("editModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
}

function saveEdit() {
    if (editIndex === -1) return;

    tasks[editIndex].text = document.getElementById("editTaskText").value;
    tasks[editIndex].date = document.getElementById("editTaskDate").value;
    tasks[editIndex].priority = document.getElementById("editTaskPriority").value;

    closeModal();
    renderTasks();
}
