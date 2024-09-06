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
  let todoItem = { todo_item: input.value, complete: false };
  if (input.value == "") {
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
    items.innerHTML = `<div class="flex gap-3 justify-between mt-3">  
                     <div class="flex flex-1 items-center justify-start gap-3  max-w-52 break-words "><span  id="checkbox" 
                     class=${
                       todo.complete && "complete"
                     } onClick="competeTodo(${index})" ></span>
                     <p id="todo" class=${todo.complete && "complete"}  >${
      todo.todo_item
    }</p>
                    </div>
                    <div class="flex justify-center gap-6 mr-3">
                      <button class= py-1.5 px-5 " onClick="editTodo(${index})">
                       <i class="fa-solid fa-pen-to-square text-green-500 hover:text-green-600"></i>
                      </button>
                     <button class=" py-1.5  " onClick="deleteTodo(${index})">
                     <i class="fa-solid fa-trash text-red-500 hover:text-red-600"></i>
                     </button>
                    </div>
                </div>`;
    todoItems.appendChild(items);
  });
}
// compete todo function .............
function competeTodo(index) {
  if (todoArray[index].complete == false) {
    todoArray[index].complete = true;
  } else {
    todoArray[index].complete = false;
  }
  localStorage.setItem("todoItem", JSON.stringify(todoArray));
  todoItems.innerHTML = "";
  showTodo();
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
