// Select elements
const taskInput = document.getElementById('task');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const dropdown = document.getElementsByClassName('dropdown');
const categoryLinks = document.querySelectorAll("#myDropdown a");


let selectedCategory = null;

//Category notes
categoryLinks.forEach(link =>{
    link.addEventListener('click', (event) => {
        event.preventDefault();
        selectedCategory = link.textContent.trim(); // Store the category
        document.querySelector('.dropbtn').textContent = `Category: ${selectedCategory}`; // Update button text
    });
});

// Add task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        alert("Please enter a text");
        return; 
        taskInput.value = '';
    }
    if (!selectedCategory) {
        alert("Please select a category!");
        return; 
    }
    createTask(taskText, selectedCategory);
    taskInput.value = '';
    selectedCategory = null;
    document.querySelector('.dropbtn').textContent = "Category"
});

// Create task
 const createTask = (text, category) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text} - <strong>${category}</strong></span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
     addTaskEventListeners(li);
}

// Add event listeners for Edit and Delete buttons
const addTaskEventListeners = (taskItem) => {
    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const taskText = taskItem.querySelector('span');

    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit task:', taskText.textContent);
        if (newText !== null) {
            taskText.textContent = newText;
        }
    });

    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });

    taskText.addEventListener('click', () => {
        taskText.classList.toggle('completed');
    });
}

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
