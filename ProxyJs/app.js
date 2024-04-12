import { addNewTodo, deleteItem, storeProxy, updateTodo } from "./store.js";
import render from "./render.js";

window.addEventListener("storeChange", () => {
  render();
});

// start with render
const getDataFromLocal = JSON.parse(localStorage.getItem("store"));

if (getDataFromLocal?.todos.length > 0) {
  storeProxy.todos = getDataFromLocal.todos;
} else {
  localStorage.setItem("store", JSON.stringify(storeProxy));
  render();
}

//// todo logic start here
const form = document.querySelector("#form");
const inputBox = document.querySelector("#input_box");

let edit_id = null;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let taskValue = inputBox.value;
  let todoData = [];
  if (taskValue.length) {
    if (edit_id !== null) {
      updateTodo(edit_id, {task : inputBox.value})
      edit_id=null
    } else {
      todoData = [
        {
          id: crypto.randomUUID(),
          task: taskValue,
        },
      ];
      addNewTodo(todoData);
    }
  }
  inputBox.value = "";
});

// button event
const listItem = document.querySelector(".items");
listItem.addEventListener("click", (event) => {
  let elementId = event.target.closest(".item").dataset.id;
  if (event.target.classList.contains("delete")) {
    deleteItem(elementId);
  } else if (event.target.classList.contains("done")) {
    const element = event.target.closest(".item");
    element.style.backgroundColor = "green";
  } else {
    edit_id = elementId;
    const editdata = storeProxy.todos.find((val) => val.id === edit_id);
    inputBox.value = editdata.task;
  }
});
