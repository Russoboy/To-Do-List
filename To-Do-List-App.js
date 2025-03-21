// Select elements
const taskInput = document.getElementById('task');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const categoryLinks = document.querySelectorAll("#myDropdown a");
const deleteAllBtn = document.getElementById('deleteAllBtn');
const taskTimeInput = document.getElementById('task-time');
const switchToDarkBtn = document.getElementById('switchToDarkBtn');
const searchBtn = document.getElementById('searchBtn');

let selectedCategory = null;
deleteAllBtn.style.display = 'none'
searchBtn.style.display = 'none'
// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

// Category selection
categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        selectedCategory = link.textContent.trim();
        document.querySelector('.dropbtn').textContent = `Category: ${selectedCategory}`;
    });
});

// Toggle Dark Mode
switchToDarkBtn.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode");
});

// Delete all tasks
deleteAllBtn.addEventListener('click', () => {
    taskList.innerHTML = `<p><i>Items deleted</i></p>`;
    localStorage.removeItem('tasks'); // Remove from storage
    setTimeout(() => {
        taskList.innerHTML = '';
    }, 4000);
});

// Request notification permission
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}



searchBtn.addEventListener('click', ()=>{
    let filter = taskInput.value.toLowerCase();
    let tasks = taskList.children;

    for(let li of tasks) {
        let text = li.textContent.toLowerCase();
        li.style.display = text.includes(filter) ? "block" : "none";
     } 
    });


// Add task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskTime = taskTimeInput ? taskTimeInput.value : null;

    if (!taskText) {
        alert("Please enter a task!");
        deleteAllBtn.style.display = 'none'
        searchBtn.style.display = 'none'
        return;
    }
    if (!selectedCategory) {
        alert("Please select a category!");
        deleteAllBtn.style.display = 'none'
        searchBtn.style.display = 'none'
        return;
    }
    searchBtn.style.display = 'inline-block'
    deleteAllBtn.style.display = 'inline-block'
    createTask(taskText, selectedCategory, taskTime);
    saveTaskToStorage(taskText, selectedCategory, taskTime);
    taskInput.value = '';
    taskTimeInput.value = '';
    selectedCategory = null;
    document.querySelector('.dropbtn').textContent = "Category";
});

// Create a new task with an optional timer
const createTask = (text, category, time) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text} - <strong>${category}</strong></span> 
        ${time ? `<span class="task-time">📅 ${time}</span>` : ''}
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        ${time ? `<button class="cancel-timer">Cancel Timer</button>` : ''}
    `;
    
    taskList.appendChild(li);
    addTaskEventListeners(li, category, text, time);
    
    if (time) {
        scheduleNotification(text, time);
    }
};

// Schedule a notification
const scheduleNotification = (task, time) => {
    const reminderTime = new Date(time).getTime();
    const now = new Date().getTime();
    const delay = reminderTime - now;

    if (delay > 0) {
        setTimeout(() => {
            showNotification(task);
        }, delay);
    }
};

// Show the reminder notification
const showNotification = (task) => {
    if (Notification.permission === "granted") {
        new Notification("⏰ Task Reminder", {
            body: `Don't forget: ${task}!`,
            icon: "https://cdn-icons-png.flaticon.com/512/477/477770.png"
        });
    } else {
        alert(`Reminder: ${task}`);
    }
};

// Add event listeners for Edit and Delete buttons
const addTaskEventListeners = (taskItem, category, text, time) => {
    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const cancelTimerBtn = taskItem.querySelector('.cancel-timer');
    const taskText = taskItem.querySelector('span');

    // Inline editing
    editBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = "text";
        input.value = text;
        taskText.replaceWith(input);
        input.focus();

        input.addEventListener('blur', () => {
            taskText.innerHTML = `${input.value} - <strong>${category}</strong>`;
            input.replaceWith(taskText);
            updateTaskInStorage(text, input.value);
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                taskText.innerHTML = `${input.value} - <strong>${category}</strong>`;
                input.replaceWith(taskText);
                updateTaskInStorage(text, input.value);
            }
        });
    });

    // Delete task
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        removeTaskFromStorage(text);
    });

    // Cancel timer
    if (cancelTimerBtn) {
        cancelTimerBtn.addEventListener('click', () => {
            taskItem.querySelector('.task-time').remove();
            cancelTimerBtn.remove();
        });
    }
};

// Save task to localStorage
function saveTaskToStorage(taskText, category, time) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ taskText, category, time });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
function loadTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ taskText, category, time }) => {
        createTask(taskText, category, time);
    });
}

// Remove task from localStorage
function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.taskText !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in localStorage
function updateTaskInStorage(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.taskText === oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex].taskText = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Add task on pressing Enter
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});

// Dropdown toggle
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};



// FEATURES INCLUDED SO FAR
// Dropdown Feature && Categorize Notes
// Edit inline
// Delete all Feature
// Timer Notification feature
// Toggle Switch Feature
// Permanent Storage Feature when browser is reloaded
// Search notes in the list
// Persist data to local Storage
