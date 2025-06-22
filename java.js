// Load data from localStorage or initialize an empty array
let data = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
    updateTaskList();
};

function addTask() {
    let inPut = document.getElementById('todoapp');
    let task = inPut.value.trim();

    if (task === "") {
        alert("Empty task is not allowed");
        return;
    }

    data.push(task);
    inPut.value = '';
    localStorage.setItem("tasks", JSON.stringify(data));
    updateTaskList();
}

function updateTaskList() {
    let taskList = document.getElementById('taskList');
    let taskCount = document.getElementById('taskcount');
    taskList.innerHTML = '';

    data.forEach((task, index) => {
        let li = document.createElement('li');
        li.textContent = task + " ";

        // Edit Button
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginLeft = '10px';
        editBtn.onclick = function () {
            let newTask = prompt("Edit your task:", task);
            if (newTask !== null && newTask.trim() !== "") {
                data[index] = newTask.trim();
                localStorage.setItem("tasks", JSON.stringify(data));
                updateTaskList();
            }
        };

        // Delete Button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.onclick = function () {
            data.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(data));
            updateTaskList();
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    taskCount.textContent = data.length;
}

function clearAll() {
    data = [];
    localStorage.setItem("tasks", JSON.stringify(data));
    updateTaskList();
}
