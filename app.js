$(document).ready(function() {
    // todoResponse();
    
    // $('#allChecked').click(function() {
    //     let checks =$('#taskList');
    //     $('input').each(function(i, item){
    //         if(item !== "checked") {
    //             $(".checkbox").attr("checked", "checked");
    //         }else {
    //             $(".checkbox").removeAttr("checked", "checked");
    //         }
    //     })
    // })
    
    let addTask = $('#taskAdd');
        addMessage = $('#taskInput');
        todoTask = $('#taskList');
        removeTodo = $('#clearCompleted');
        
    let todoList = [];

    if(localStorage.getItem('todoJson')){
        todoList = JSON.parse(localStorage.getItem('todoJson'));
        displayMessages()
    }

    addTask.click(function() {
        if(addMessage.val('')) return;
        let newTodo = {
            title: addMessage.val(),
            checked: false
        }
        
        todoList.unshift(newTodo)
        displayMessages()
        localStorage.setItem('todoJson', JSON.stringify(todoList))
        addMessage.val('');
    })

    todoTask.on('change', function(event) {
      let idInput = event.target.getAttribute('id')
      let forLabel = $('[for='+ idInput +']');
      console.log(forLabel)
    //   let valueLabel = forLabel.html();
    })

    removeTodo.click(function() {
        todoList.forEach(function(item, i) {
            if(item.checked == true) {
                todoList = todoTask.html('')
            }
            displayMessages()
            localStorage.setItem('todoJson', JSON.stringify(todoList))
        })
    })

    // todoTask.change(function(event) {
    //    let idInput = event.target.getAttribute("id");
    //    let forLabel = $('.todo').attr('for', idInput)
    //    console.log(forLabel)
    // })
    function displayMessages() {
        let displayMessage = '';
        todoList.forEach(function(item, i) {
            displayMessage += `
            <li class="enter-block">
                <input id="item_${i}" name="task"  class="checkbox" type="checkbox" ${item.checked ? "checked" : ''}>
                <label for="item_${i}" class="todos">${item.title}</label>
            </li>
            `
            todoTask.html(displayMessage);
        })
    }
})



function todoCount() {
    let count = 0;
        displayCount();
        $('.checkbox').click(function() {
            if (this.checked) {
                count++;
            } else if(count <= 0) {
                count = 0;
            }else {
                count--;
            }
            displayCount();
        });
    function displayCount() {
        $('#todoCount').text(count + ' ' + 'item left');
    }
}

function todoResponse() {
   fetch('https://raw.githubusercontent.com/andreychalpiy/test/master/todos.json')
    .then(response => response.json())
    .then(todos => {
        todos = todos.slice(0, 10);
        for(let todo of todos) {
            $('#enterBlock').tmpl(todo).appendTo('#taskList');
        }        
    })
}
