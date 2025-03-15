// Select elements
const taskInput = document.getElementById('task');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const categoryLinks = document.querySelectorAll("#myDropdown a");
const deleteAllBtn = document.getElementById('deleteAllBtn')

let selectedCategory = null;

//Category notes
categoryLinks.forEach(link =>{
    link.addEventListener('click', (event) => {
        event.preventDefault();
        selectedCategory = link.textContent.trim(); // Store the category
        document.querySelector('.dropbtn').textContent = `Category: ${selectedCategory}`; // Update button text
    });
});
//Delete all Feature
deleteAllBtn.addEventListener('click', ()=>{
    taskList.innerHTML = `<p><i>Items deleted</p></i>`
    setTimeout(() => {
        taskList.innerHTML = '';
    }, 4000) 

})

// Add task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Please enter a text");
        return; 
        // taskInput.value = '';
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
 const createTask = (text, category) => { //addded category
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text} - <strong>${category}</strong></span> 
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;//added the class task-text but later removed it
    taskList.appendChild(li);
     addTaskEventListeners(li, category);//added category
}

// Add event listeners for Edit and Delete buttons
const addTaskEventListeners = (taskItem, category) => {
    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const taskText = taskItem.querySelector('span');


     editBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = "text";
        input.value = taskText.textContent.split(" - ")[0]; // Get only task text (without category)
        taskText.replaceWith(input);
        input.focus();

        // Save on Enter or when clicking outside
        const saveEdit = () => {
            taskText.innerHTML = `${input.value} - <strong>${category}</strong>`;
            input.replaceWith(taskText);
        };

        input.addEventListener('blur', saveEdit); // Save when clicking outside
        input.addEventListener('keydown', (event) => {
            if (event.key === "Enter") saveEdit(); // Save on Enter
        });
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

//   Features included so far
// Categorize Notes
// Edit inline
//Delete all Feature
