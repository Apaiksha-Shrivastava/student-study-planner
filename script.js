

const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const filterButtons = document.querySelectorAll(".filter-btn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function displayTasks() {
    taskList.innerHTML = "";

    
    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;


    const progress = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    progressFill.style.width = progress + "%";
    progressText.textContent = progress + "% Completed";

    
    const filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "completed") {
            return task.completed;
        }

        if (currentFilter === "pending") {
            return !task.completed;
        }

        return true;
    });

    
    filteredTasks.forEach(function (task) {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        
        const subjectLabel = document.createElement("small");
        subjectLabel.classList.add("subject-label");
        subjectLabel.textContent =
            "Subject: " + (task.subject || "Not specified");

        
        const completeBtn = document.createElement("button");

        completeBtn.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeBtn.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item !== task;
            });

            saveTasks();
            displayTasks();
        });

        
        li.appendChild(taskText);
        li.appendChild(subjectLabel);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}


addTaskBtn.addEventListener("click", function () {
    const task = taskInput.value.trim();
    const subject = subjectInput.value;

    if (task === "") {
        alert("Please enter a study task!");
        return;
    }

    if (subject === "") {
        alert("Please select a subject!");
        return;
    }

    tasks.push({
        text: task,
        subject: subject,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    subjectInput.value = "";
});


filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    });
});


displayTasks();

const themeToggle = document.getElementById("themeToggle");


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
}


themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    }
});



