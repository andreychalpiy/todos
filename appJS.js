$(document).ready(function(){
    let addTodo = $(".add-todo");
    let addMessage = $("#taskInput");
    let todoBox = $("#todoBox");
    let btnRemove = $("#btnRemove");
    let currentFilter = 'all';  
    let todoList = [];
    let count = 0;
    let countComplet= 0;
    todoCount();
    countCompleted();
    if(localStorage.getItem('todoJson')) {
        todoList = JSON.parse(localStorage.getItem('todoJson'));
        displayMessages();
    };
    addTodo.on("click", newTask);
    addMessage.keypress(function(event) {
        if (event.keyCode == '13') {
            newTask();
        }
    });
    function newTask() {
        if(addMessage.val().trim() == '') {
            return addMessage.val('');
           };        
       let newTodo = {
           id: todoList.length + 1,
           title: addMessage.val(),
           checked: false
       };
       todoList.unshift(newTodo);
       saveData();
       displayMessages();
       addMessage.val(''); 
    }
    function displayMessages() {
        let displayMessage = '';
        count = todoList.filter(function(todoItem) {
            return !todoItem.checked;
        }).length;
        countComplet = todoList.filter(function(todoItem) {
            return todoItem.checked;
        }).length;
        $.each(todoList, function(i, item) {
            let hidden = false;
            if(currentFilter == 'active' && item.checked) {
                hidden = true;
            }else if(currentFilter == 'completed' && !item.checked) {
                hidden = true;
            }
            displayMessage += `
            <li data-id="${item.id}" class="task-item ${item.checked ? "line-through" : ''} ${hidden ? "hidden" : ''}">
                <input id="item_${item.id}" name="task"  class="checkbox" type="checkbox" ${item.checked ? "checked" : ''}>
                <label for="item_${item.id}" class="todos">${item.title}</label>
            </li>
            `;
        });
        todoBox.html(displayMessage);
        todoCount();
        countCompleted();
    };
    $('#todoBox').on("click", '.task-item', function() {
        let id = $(this).attr('data-id');
        let i = todoList.findIndex(function(todoItem) {
            return todoItem.id == id;
        })
        todoList[i].checked = !todoList[i].checked;
        saveData();
        displayMessages();
    })
    $('.toggle-filter').on("click", function(event) {
        event.preventDefault();
        $(this).toggleClass('selected');
        currentFilter = $(this).attr('data-filter');
        displayMessages();
    })
    btnRemove.on('click', function() {
        todoList = todoList.filter(function(todoItem) {
            return !todoItem.checked;
        })
        saveData();
        displayMessages();
    });
    function saveData() {
        localStorage.setItem('todoJson', JSON.stringify(todoList));
    };
    function todoCount() {
        $('#todoCount').text(`${count} item left`);
    };
    function countCompleted() {
        btnRemove.text(`Clear completed (${countComplet})`)    
    };
});