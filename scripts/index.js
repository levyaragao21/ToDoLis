document.getElementById('task-form').addEventListener('submit', addTask);

function removeAccentAndApplyLowerCase(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function addTask(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    const allListItems = document.querySelectorAll('li');

    const allListItemsData = []

    allListItems.forEach((tag) => {
        allListItemsData.push(removeAccentAndApplyLowerCase(tag.textContent))
    })

    if (taskText === '') {
        alert('Por favor adicione uma tarefa');
    } else if (allListItemsData.includes(removeAccentAndApplyLowerCase(`${taskText}X`))) {
        alert('Tarefa já adicionada');
        taskInput.value = '';
        return
    } else {
        addTaskToDOM(taskText);
        taskInput.value = '';
    }
}

function addTaskToDOM(taskText, completed = false) {
    const listItem = document.createElement('li'); // <li></li>
    listItem.textContent = taskText; // <li>taskText</li>

    // if (completed) {
    //     li.classList.add('completed');
    // }

    listItem.addEventListener('click', toggleTaskCompletion);

    // <li onclick="toggleTaskCompletion">taskText</li>

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'X';  
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask);

    listItem.appendChild(deleteButton);

    // <li onclick="toggleTaskCompletion">taskText<button>X</button></li>

    document.getElementById('task-list').appendChild(listItem);

    // <ul id="task-list">
    //     <li onclick="toggleTaskCompletion">taskText<button>X</button></li>
    // </ul>
}

function toggleTaskCompletion(e) {
    e.target.classList.toggle('completed');
}

function deleteTask(e) {
    const li = e.target.parentElement;
    li.remove();
}