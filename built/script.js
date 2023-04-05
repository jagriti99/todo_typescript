var todoForm = document.querySelector(".todo-form");
var todoInput = document.querySelector(".todo-input");
var todoItemsList = document.querySelector(".todo-items");
var todos = [];
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});
function addTodo(item) {
    if (item !== "") {
        var todo = {
            id: Date.now(),
            name: item,
            completed: false,
        };
        todos.push(todo);
        addToLocalStorage();
        todoInput.value = "";
    }
}
function renderTodos(todos) {
    todoItemsList.innerHTML = "";
    todos.forEach(function (item) {
        var checked = item.completed ? "checked" : null;
        var li = document.createElement("li");
        li.setAttribute("class", "item");
        li.setAttribute("data-key", item.id.toString());
        if (item.completed == true) {
            li.classList.add("checked");
        }
        li.innerHTML = "<input type=\"checkbox\" class=\"checkbox\" ".concat(checked, ">").concat(item.name, " <button class=\"delete-button\">X</button>");
        li.addEventListener("click", function (event) {
            var targetElement = event.target;
            if (targetElement.type === "checkbox") {
                toggle(targetElement.parentElement.getAttribute("data-key"));
            }
            if (targetElement.classList.contains("delete-button")) {
                deleteTodo(targetElement.parentElement.getAttribute("data-key"));
            }
        });
        todoItemsList.append(li);
    });
}
function addToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
}
function getFromLocalStorage() {
    var reference = localStorage.getItem("todos");
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}
function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == parseInt(id)) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage();
}
function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != parseInt(id);
    });
    addToLocalStorage();
}
getFromLocalStorage();
todoItemsList.addEventListener("click", function (event) {
    var targetElement = event.target;
    if (event.target.type === "checkbox") {
        toggle(event.target.parentElement.getAttribute("data-key"));
    }
    if (targetElement.classList.contains("delete-button")) {
        deleteTodo(event.target.parentElement.getAttribute("data-key"));
    }
});
