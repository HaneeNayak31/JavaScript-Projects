/* =========================================================
   1. SELECTING REQUIRED HTML ELEMENTS
   ========================================================= */

// Input field where user types the task
const taskInput = document.getElementById("task-input-input");

// Button to add a new task
const addTaskBtn = document.getElementById("add-task");

// Filter buttons (All / Pending / Completed)
const filters = document.querySelectorAll(".filters span");

// Button to clear all tasks
const clearBtn = document.getElementById("clear-btn");

// Container where all tasks will be displayed
const taskBox = document.querySelector(".task-box");

/* =========================================================
   2. VARIABLES FOR EDIT MODE
   ========================================================= */

// Stores index of task being edited
let editId;

// Flag to check whether task is being edited
let isEditedTask = false;

/* =========================================================
   3. GET TODOS FROM LOCAL STORAGE SAFELY
   ========================================================= */

// Array to store all tasks
let todos = [];

try {
  // Get tasks from localStorage
  const parsed = JSON.parse(localStorage.getItem("todo-list"));

  // Ensure parsed data is an array
  todos = Array.isArray(parsed) ? parsed : [];
} catch {
  // If JSON parsing fails, keep todos empty
  todos = [];
}

/* =========================================================
   4. FUNCTION TO DISPLAY TASKS
   ========================================================= */

function showTodo(filter) {
  let li = ""; // HTML string to store tasks

  // Loop through each task
  todos.forEach((todo, id) => {
    // Check if task is completed
    let isCompleted = todo.status === "completed" ? "checked" : "";

    // Show task only if it matches the filter
    if (filter === todo.status || filter === "all") {
      li += `
        <li class="task">
          <label for="${id}">
            <input 
              type="checkbox"
              id="${id}"
              onclick="updateStatus(this)"
              ${isCompleted}
            />
            <p class="${isCompleted}">${todo.name}</p>
          </label>

          <div class="settings">
            <i class="fa-solid fa-ellipsis" onclick="showMenu(this)"></i>

            <ul class="task-menu">
              <li onclick="editTask(${id}, '${todo.name}')">
                <i class="fa-solid fa-pen"></i> Edit
              </li>
              <li onclick="deleteTask(${id})">
                <i class="fa-regular fa-trash-can"></i> Delete
              </li>
            </ul>
          </div>
        </li>`;
    }
  });

  // Show message if no tasks exist
  taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}

// Show all tasks when page loads
showTodo("all");

/* =========================================================
   5. CLEAR ALL TASKS
   ========================================================= */

clearBtn.addEventListener("click", () => {
  // Remove all tasks from array
  todos.splice(0, todos.length);

  // Update localStorage
  saveTaks();

  // Refresh UI
  showTodo("all");
});

/* =========================================================
   6. FILTER TASKS (ALL / PENDING / COMPLETED)
   ========================================================= */

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from previous filter
    document.querySelector("span.active").classList.remove("active");

    // Add active class to clicked filter
    btn.classList.add("active");

    // Display tasks based on filter
    showTodo(btn.id);
  });
});

/* =========================================================
   7. EDIT TASK FUNCTION
   ========================================================= */

function editTask(taskId, taskName) {
  // Store task index
  editId = taskId;

  // Enable edit mode
  isEditedTask = true;

  // Put task text back into input box
  taskInput.value = taskName;
}

/* =========================================================
   8. DELETE TASK FUNCTION
   ========================================================= */

function deleteTask(deleteId) {
  // Remove selected task
  todos.splice(deleteId, 1);

  // Update localStorage
  saveTaks();

  // Refresh task list
  showTodo("all");
}

/* =========================================================
   9. SHOW / HIDE TASK MENU
   ========================================================= */

function showMenu(selectedTask) {
  // Get dropdown menu
  let taskMenu = selectedTask.parentElement.lastElementChild;

  // Show menu
  taskMenu.classList.add("show");

  // Hide menu when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target !== selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}

/* =========================================================
   10. UPDATE TASK STATUS (CHECK / UNCHECK)
   ========================================================= */

function updateStatus(selectedTask) {
  // Get task text element
  let taskName = selectedTask.parentElement.lastElementChild;

  if (selectedTask.checked) {
    // Mark task as completed
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    // Mark task as pending
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  // Update localStorage
  saveTaks();
}

/* =========================================================
   11. ADD / UPDATE TASK
   ========================================================= */

addTaskBtn.addEventListener("click", () => {
  // Get trimmed input value
  const userTask = taskInput.value.trim();
  // Prevent empty task
  if (userTask === "") return;
  // Clear input field
  taskInput.value = "";
  if (!isEditedTask) {
    // Create new task object
    let taskInfo = {
      name: userTask,
      status: "pending",
    };

    // Add task to array
    todos.push(taskInfo);
  } else {
    // Update existing task
    isEditedTask = false;
    todos[editId].name = userTask;
  }
  //save tasks
  saveTaks();
  // Refresh UI
  showTodo("all");
});
function saveTaks() {
  // Save to localStorage
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

// document.addEventListener("DOMContentLoaded", () => {
//   const todoInput = document.getElementById("todo-input");
//   const addTaskButton = document.getElementById("add-task-btn");
//   const todoList = document.getElementById("todo-list");

//   let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

//   tasks.forEach((task) => renderTask(task));

//   addTaskButton.addEventListener("click", () => {
//     const taskText = todoInput.value.trim();
//     if (taskText === "") return;
//     const newTask = {
//       id: Date.now(), //assign unique id
//       text: taskText,
//       completed: false,
//     };
//     tasks.push(newTask); //add new task
//     saveTasks();
//     renderTask(newTask);
//     todoInput.value = ""; //clear input
//
//   });

//   //render tasks
//   function renderTask(task) {
//     const li = document.createElement("li");
//     li.setAttribute("data-id", task.id);
//     if (task.completed) li.classList.add("completed");
//     li.innerHTML = `<span>${task.text}</span><button>delete</button>`;
//     li.addEventListener("click", (e) => {
//       if (e.target.tagName === "BUTTON") return;
//       task.completed = !task.completed;
//       li.classList.toggle("completed");
//       saveTasks();
//     });
//     //delete function
//     li.querySelector("button").addEventListener("click", (e) => {
//       e.stopPropagation(); //prevent toggle for firing
//       tasks = tasks.filter((t) => t.id !== task.id);
//       li.remove();
//       saveTasks();
//     });
//     todoList.appendChild(li);
//   }

//   //save tasks
//   function saveTasks() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }
// });
