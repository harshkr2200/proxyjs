const store = {
  todos: [
    {
      id: "1",
      task: "hello world",
    },
  ],
};

const handlerStore = {
  get(target, property) {
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;

    // custom event
    if (property === "todos") {
      window.dispatchEvent(new Event("storeChange"));
    }
    localStorage.setItem("store", JSON.stringify(store));
    return true;
  },
};

export const storeProxy = new Proxy(store, handlerStore);

const deleteItem = (id) => {
  if (id) {
    const updated = storeProxy.todos.filter((item) => item.id !== id);
    storeProxy.todos = updated;
  }
};

// add todo fun
const addNewTodo = (todo) => {
  if (todo) {
    storeProxy.todos = [...storeProxy.todos, ...todo];
  }
};

const updateTodo = (edit_id, todo) => {
  let todoData = storeProxy.todos?.map((val) => {
    if (val.id === edit_id) {
      const data = todo.task;
      return {
        ...val,
        task: data,
      };
    } else {
      return val;
    }
  });
  storeProxy.todos = [...todoData]
  
}

export { addNewTodo,updateTodo, deleteItem };

export default storeProxy;
