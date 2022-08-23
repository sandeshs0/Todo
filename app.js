// Selectors
const input = document.querySelector(".input");
const todobtn = document.querySelector(".submitbtn");
const todolist = document.querySelector(".list");
const filterOpt = document.querySelector(".filter-todos");

//Event listeners
todobtn.addEventListener("click", addTodo);
todolist.addEventListener("click", delCheck);
filterOpt.addEventListener("click", filterTodo);
//Functions
function addTodo(event) {
  event.preventDefault(); //prevents form from submiting

  // creating todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = input.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Adding to Local Storage
  saveLocalTodos(input.value);
  // Check btn
  const compBtn = document.createElement("button");
  compBtn.innerHTML = '<i class = "fas fa-check"></i>';
  compBtn.classList.add("comp-btn");
  todoDiv.appendChild(compBtn);
  //Trash
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class = "fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  // Append to the list
  todolist.appendChild(todoDiv);

  //clear value
  input.value = "";
}
function delCheck(e) {
  const item = e.target;
  //Delete
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] == "comp-btn") {
    const todo = item.parentElement;
    //animationd
    todo.classList.toggle("comp");
    todo.classList.toggle("move");
  }
}

function filterTodo(e) {
  const todos = todolist.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "done":
        if (todo.classList.contains("comp")) {
          todo.style.display = "flex";
          todo.classList.toggle("move");
        } else {
          todo.style.display = "none";
        }
        break;
      case "left":
        if (!todo.classList.contains("comp")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Checking for repeatation
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
