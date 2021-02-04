$(document).ready(function(){
    let addTodo = $(".add-todo");
    let addMessage = $("#taskInput");
    let todoBox = $("#todoBox");
    let btnRemove = $("#btnRemove");
    let currentFilter = 'all';  
    let todoList = [];
        count = 0;
    todoCount();
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
        currentFilter = $(this).attr('data-filter');
        displayMessages();
    })
    btnRemove.on('click', function() {
        todoList = todoList.filter(function(todoItem) {
            return !todoItem.checked;
        })
        count = 0;
        todoCount();
        saveData();
        displayMessages();
    });
    document.querySelectorAll('.btn-filter').forEach(function(item) {
        item.addEventListener('click', function() {
            document.querySelectorAll('.btn-filter').forEach(function(item) {
                item.classList.remove('selected');
            });
            item.classList.add('selected');  
        });
    });
    function saveData() {
        localStorage.setItem('todoJson', JSON.stringify(todoList));
    }
    function todoCount() {
        $('#todoCount').text(count + ' ' + 'item left');
    }
});