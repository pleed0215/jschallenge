const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList"),
  completeList = document.querySelector(".js-completeList");

const TODOS_LS = "todos";
let todos = [];

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);

  if (loadedTodos !== null && loadedTodos.length != 0) {
    todos = JSON.parse(loadedTodos);
    repaint();
  }
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function addTodoList(todo) {
  todos.push(todo);
}

function deleteTodo(event) {
  const btnParentLi = event.target.parentNode;
  console.log(btnParentLi);
  const todo = todos.find((value) => value.id === parseInt(btnParentLi.id));
  const list = todo.isComplete ? completeList : todoList;

  todos = todos.filter(
    (value) => parseInt(btnParentLi.id) != parseInt(value.id)
  );
  list.removeChild(btnParentLi);
  saveTodos();
  repaint();
}

const doneTodo = (event) => {
  const btnParentLi = event.target.parentNode;
  const id = parseInt(btnParentLi.id);

  todo = todos.find((t) => t.id === id);
  console.log(todo);
  todo.isComplete = !todo.isComplete;

  saveTodos();
  repaint();
};

function repaint() {
  todoList.innerHTML = "";
  completeList.innerHTML = "";

  todos.forEach((todo) => {
    const list = todo.isComplete ? completeList : todoList;
    console.log(list);
    const li = document.createElement("li");
    const delBtn = document.createElement("i");
    const doneBtn = document.createElement("i");
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    doneBtn.classList.add(todo.isComplete ? "fas" : "far");
    doneBtn.classList.add(todo.isComplete ? "fa-undo" : "fa-check-circle");

    delBtn.addEventListener("click", deleteTodo);
    doneBtn.addEventListener("click", doneTodo);

    const span = document.createElement("p");
    span.innerText = todo.text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = todo.id;
    list.appendChild(li);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  console.log(currentValue);
  addTodoList({
    text: currentValue,
    isComplete: false,
    id: new Date().getTime(),
  });
  todoInput.value = "";
  saveTodos();
  repaint();
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
