let input = document.querySelector("input");
let button = document.querySelector("button");
let todoItems = document.querySelector(".todoItems");
let error = document.querySelector(".error");
let isEditTodo = false;
const todoArray = JSON.parse(localStorage.getItem("todoItem")) || [];
button.addEventListener("click", () => {
  if (isEditTodo) {
    saveTodo();
  } else {
    createItem();
  }
});
function createItem() {
  let todoItem = input.value;
  if (todoItem == "") {
    error.innerText = "Please enter todo.";
  } else {
    todoArray.push(todoItem);
    localStorage.setItem("todoItem", JSON.stringify(todoArray));
    input.value = "";
    todoItems.innerHTML = "";
    showTodo();
    error.innerText = "";
  }
}
// show todo ...........
function showTodo() {
  todoArray.forEach((todo, index) => {
    let items = document.createElement("div");
    items.innerHTML = ` <div class="flex gap-3 justify-between mt-3">
                <div class="flex-1  ml-3 max-w-52 break-words "><p>${todo}</p></div>
                <div>
                <button class="bg-green-500 hover:bg-green-600 text-white py-1.5 px-5 rounded" onClick="editTodo(${index})">
                  Edit
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white py-1.5 px-5 mx-1 rounded" onClick="deleteTodo(${index})">
                  Delete
                </button>
                </div>
              </div>`;
    todoItems.appendChild(items);
  });
}
// delete todo function .............
function deleteTodo(index) {
  todoItems.innerHTML = "";
  todoArray.splice(index, 1);
  localStorage.setItem("todoItem", JSON.stringify(todoArray));
  showTodo();
}
let editTodoindex;
// edit todo function ...............
function editTodo(index) {
  if (isEditTodo == false) {
    isEditTodo = true;
    input.value = todoArray[index];
    todoItems.children[index].style.pointerEvents = "none";
    todoItems.children[index].style.opacity = "0.5";
    button.innerText = "Save";
    editTodoindex = index;
    error.innerText = "";
  } else {
    error.innerText = "Please save todo";
  }

  console.log(isEditTodo);
}
// save  todo function ..............
function saveTodo() {
  if (input.value == "") {
    error.innerText = "Please enter todo.";
  } else {
    todoItems.innerHTML = "";
    todoArray[editTodoindex] = input.value;
    localStorage.setItem("todoItem", JSON.stringify(todoArray));
    showTodo();
    input.value = "";
    isEditTodo = false;
    button.innerText = "Add";
    error.innerText = "";
  }
}
// call function to show todo on load the page
showTodo();
