import storeProxy from "./store.js";
const render = () => {
  const todos = document.querySelector(".items");

  const todoElement = storeProxy.todos.map((todo, index) => {
    return `<li class="item" data-id=${todo.id} >
    <div class="item_wapper">
      <div class="number" data-index=${index + 1}>${index + 1}</div>
      <div class="text">${todo.task}</div>
    </div>
    <div class="action" data-index=${index}>
      <button class="done button">Done</button>
      <button class="delete button">Delete</button>
    </div>
  </li>`;
  });

  todos.innerHTML = todoElement;
};

export default render;
