document.addEventListener('DOMContentLoaded', function(){
    let addTask = document.querySelector(".btn-add");
        addMessage = document.getElementById("taskInput");
        todoTask = document.querySelector("#taskList");
        removeBtn = document.getElementById("clearCompleted");
        allCheck = document.querySelector("#allChecked");
        completedBtn = document.querySelector("#completed");
        activeBtn = document.querySelector('#active');
    let  todoList = [];
    document.querySelector('#todoCount').innerText = count = 0 + ' ' + 'item left';
    if(localStorage.getItem('todoJson')) {
        todoList = JSON.parse(localStorage.getItem('todoJson'));
        displayMessages();
    };
    addTask.addEventListener("click", function() {
        if(addMessage.value == ' ' || addMessage.value == '') { 
            return;
        };
        let newTodo = {
            id: '',
            title: addMessage.value,
            checked: false
        };
        todoList.unshift(newTodo);
        displayMessages();
        localStorage.setItem('todoJson', JSON.stringify(todoList));
        addMessage.value = '';       
    });
    function displayMessages() {
        let displayMessage = '';
        if(todoList.length === 0) {
            todoTask.innerHTML = '';
        };
        todoList.forEach(function(item, i) {
            item.id = i + 1;
            displayMessage += `
            <li class="task-item">
                <input id="item_${item.id}" name="task"  class="checkbox" type="checkbox" ${item.checked ? "checked" : ''}>
                <label for="item_${item.id}" class="todos">${item.title}</label>
            </li>
            `;
            todoTask.innerHTML = displayMessage;
            count = item.id;
            document.querySelector('#todoCount').innerText = count + ' ' + 'item left';
        });
    };
    todoTask.addEventListener("change", function(event) {
        let idInput = event.target.getAttribute('id');
        let forLabel = todoTask.querySelector('[for=' + idInput + ']');
        let valueLabel = forLabel.innerHTML;
        todoList.forEach(function(item) {
            if(item.title === valueLabel) {
                item.checked = !item.checked;
                localStorage.setItem('todoJson', JSON.stringify(todoList));
                displayMessages();
            };
        });
    });
    removeBtn.addEventListener('click', function() {
        todoList.forEach((item, i) => {
            if(item.checked) {
                todoList.splice(i, 1);
            };
            localStorage.setItem('todoJson', JSON.stringify(todoList));
            document.querySelector('#todoCount').innerText = count = 0 + ' ' + 'item left';
            displayMessages();
        });
    });
    completedBtn.addEventListener('click', function() {
        todoList.forEach((item, i) => {
            if(!item.checked) {
                todoList.splice(i, 1);
                displayMessages();
            };
        });   
    });
    activeBtn.addEventListener('click', function() {
        todoList.forEach((item, i) => {
            if(item.checked) {
                todoList.splice(i, 1);
                displayMessages();
            };
        });
    });
    allCheck.addEventListener('click', function() {
        todoList = JSON.parse(localStorage.getItem('todoJson'));
        displayMessages();
    });
    let btnFilter = document.querySelectorAll('.btn-filter');
    btnFilter.forEach(function(item) {
        item.addEventListener('click', function() {
            btnFilter.forEach(function(item) {
                item.classList.remove('selected');
            });
            item.classList.add('selected');
            
        });
    });
});