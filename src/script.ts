const todoForm = document.querySelector(".todo-form") as HTMLFormElement;
const todoInput = document.querySelector(".todo-input") as HTMLInputElement;
const todoItemsList = document.querySelector(".todo-items") as HTMLUListElement;

interface TodoItem {
  id: number;
  name: string;
  completed: boolean;
}

let todos: TodoItem[] = [];

todoForm.addEventListener("submit", function (event: Event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item: string): void {
  if (item !== "") {
    const todo: TodoItem = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = "";
  }
}

function renderTodos(todos: TodoItem[]): void {
  todoItemsList.innerHTML = "";

  todos.forEach(function (item) {
    const checked = item.completed ? "checked" : null;

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id.toString());

    if (item.completed == true) {
      li.classList.add("checked");
    }

    li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>${item.name} <button class="delete-button">X</button>`;

    li.addEventListener("click", function (event) {
      const targetElement = event.target as HTMLInputElement;
     
      if (targetElement.type === "checkbox") {
        toggle(Number(targetElement.parentElement.getAttribute("data-key")));
      }

      if (targetElement.classList.contains("delete-button")) {
        deleteTodo(Number(targetElement.parentElement!.getAttribute("data-key")));
      }
    });

    todoItemsList.append(li);
  });
}

function addToLocalStorage(todos: TodoItem[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage(): void {
  const reference = localStorage.getItem("todos");

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id: number): void {
  todos.forEach(function (item) {
    if (item.id === id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id: number): void {
  todos = todos.filter(function (item) {
    return item.id !== id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener("click", function (event: Event) {
  const targetElement = event.target as Element;
  if ((targetElement as HTMLInputElement).type === "checkbox") {
    toggle(Number((targetElement as HTMLInputElement).parentElement!.getAttribute("data-key")));
  }

  if (targetElement.classList.contains("delete-button")) {
    deleteTodo(Number(targetElement.parentElement!.getAttribute("data-key")));
  }
});

