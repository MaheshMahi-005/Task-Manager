// {
//     id:12345;
//     title:"Study JS",
//     description:"Finish Arrays",
//     dueDate:"2026-01-30",
//     completed:false
// }
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  if (!title || !dueDate) {
    alert("Title and Due Date are required");
    return;
  }
  const task = {
    id: Date.now(),
    title,
    description,
    dueDate,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  displayTasks(tasks);
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(taskArray) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  taskArray.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task" + (task.completed ? " completed" : "");
    div.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due :${task.dueDate}</p>
    <button onclick="toggleTask(${task.id})">✔️</button>
    <button onclick="deleteTask(${task.id})">❌</button>
`;
    taskList.appendChild(div);
  });
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  displayTasks(tasks);
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  saveTasks();
  displayTasks(tasks);
}

function checkReminders() {
  const today = new Date().toISOString().split("T")[0];
  tasks.forEach((task) => {
    if (task.dueDate === today && !task.completed) {
      alert(`Reminder:"${task.title}"is due today!`);
    }
  });
}

displayTasks(tasks);
checkReminders();

function setFilter(type, btn) {
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.remove("active");
  });
  btn.classList.add("active");
  if (type === "completed") {
    displayTasks(tasks.filter((t) => t.completed));
  } else if (type === "pending") {
    displayTasks(tasks.filter((t) => !t.completed));
  } else {
    displayTasks(tasks);
  }
}
