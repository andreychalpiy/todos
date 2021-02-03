document.addEventListener('DOMContentLoaded', function(){
    let addTodo = document.querySelector(".add-todo");
        addMessage = document.getElementById("taskInput");
        todoBox = document.querySelector("#todoBox");
       
    let todoList = [];
        count = 0;
    todoCount();
    if(localStorage.getItem('todoJson')) {
        todoList = JSON.parse(localStorage.getItem('todoJson'));
        displayMessages();
    };
    addTodo.addEventListener("click", newTask);
    addMessage.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            addTodo.click(newTask);
        }
    });
    function displayMessages() {
        let displayMessage = '';
        if(todoList.length === 0) {
            todoBox.innerHTML = '';
           
        };
        
        todoList.forEach(function(item, i) {
            count = item.id = i + 1;
            displayMessage += `
            <li class="task-item ${item.checked}" ${item.hidden ? "hidden" : ''}>
                <input id="item_${item.id}" name="task"  class="checkbox" type="checkbox" ${item.checked ? "checked" : ''}>
                <label for="item_${item.id}" class="todos">${item.title}</label>
            </li>
            `;
            todoBox.innerHTML = displayMessage;
        });
        todoCount();
    };
    todoBox.addEventListener("change", function(event) {
        let idInput = event.target.getAttribute('id');
        let forLabel = todoBox.querySelector('[for=' + idInput + ']');
        let valueLabel = forLabel.innerHTML;
        todoList.forEach(function(item) {
            if(item.title === valueLabel) {
                item.checked = !item.checked;
            };
            saveData();
            displayMessages();
        });
    });
    let btnRemove = document.getElementById("btnRemove");
        btnAll = document.querySelector("#btnAll");
        btnCompleted = document.querySelector("#btnCompleted");
        btnActive = document.querySelector('#btnActive');

    btnAll.addEventListener('click', function() {
        todoList.forEach(function(item) {
            if(item.hidden) {
                item.hidden = false;
            }
            displayMessages();
        })
    });
    btnCompleted.addEventListener('click', function() {
        todoList.forEach((item) => {
            item.hidden = false;
            if(!item.checked) {
                item.hidden = true;
            }
            displayMessages();
        });   
    });
    btnActive.addEventListener('click', function() {
        todoList.forEach((item) => {
            item.hidden = false;
            if(item.checked) {
                item.hidden = true;
            }
            displayMessages();
        });
    });
    btnRemove.addEventListener('click', function() {
        for(let i = 0; i < todoList.length; i++) {
            while(todoList[i].checked == true) {
                todoList.splice(i, 1);
            }
        }
        count = 0;
        todoCount();
        saveData();
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

    function newTask() {
        if(!addMessage.value || addMessage.value == addMessage.value.trim().length) {
            return addMessage.value = '';
           };        
       let newTodo = {
           id: '',
           title: addMessage.value,
           checked: false
       };
       todoList.unshift(newTodo);
       saveData();
       displayMessages();
       addMessage.value = ''; 
    }

    function saveData() {
        localStorage.setItem('todoJson', JSON.stringify(todoList));
    }
    function todoCount() {
        document.querySelector('#todoCount').innerText = count + ' ' + 'item left';
    }
});