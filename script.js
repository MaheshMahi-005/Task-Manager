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
  if (taskArray.length === 0) {
    taskList.style.display = "none";
    return;
  }
  taskList.style.display = "flex";

  taskArray.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-card" + (task.completed ? " completed" : " pending");
    div.innerHTML = `
    <div>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due :${task.dueDate}</p>
    </div>
    <div class="task-actions">
    ${
      !task.completed
        ? `<button class="done" onclick="toggleTask(${task.id})">✔️</button>`
        : ""
    }
      <button class="delete" onclick="deleteTask(${task.id})">❌</button>
    </div> 
`;
    taskList.appendChild(div);
  });
  updateDashBoard();
}

function deleteTask(id) {
  const card = document
    .querySelector(`.task-card button.delete[onclick="deleteTask(${id})"]`)
    ?.closest(".task-card");

  if (card) {
    card.classList.add("deleting");
  }

  alert("Task deleted");

  setTimeout(() => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    displayTasks(tasks);
  }, 300);
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
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

function updateDashBoard() {
  const all = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = all - completed;

  document.getElementById("aCount").innerText = all;
  document.getElementById("pCount").innerHTML = pending;
  document.getElementById("cCount").innerHTML = completed;
}
