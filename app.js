//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("change", filterTodo);


//Functions
function addTodo(event) {
	//Prevent event from submitting
	event.preventDefault();
	//Create Todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Creat LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	//CHECKED BUTTON
	const checkButton = document.createElement("button");
	checkButton.innerHTML = '<i class="fas fa-check"></i>';
	checkButton.classList.add("check-btn");
	todoDiv.appendChild(checkButton);
	//TRASH BUTTON
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//APPEND TO LIST
	todoList.appendChild(todoDiv);
	//ADD TODO TO LOCALSTORAGE
	addLocalTodo(newTodo.innerText);
	//CLEAR TODO INPUT VALUE
	todoInput.value = "";
}

function deleteAndCheck(e) {
	const item = e.target;
	const todoItem = item.parentElement;
	//DELETE TODO
	if (item.classList[0] === "trash-btn") {
		//ANIMATION
		todoItem.classList.add("fall");
		todoItem.addEventListener("transitionend", function () {
			todoItem.remove();
		});
		//REMOVE LOCAL TODO AS WELL
		removeLocalTodo(todoItem);
	}
	//CHECK TODO
	if (item.classList[0] === "check-btn") {
		todoItem.classList.toggle("checked");
	}
}

function filterTodo(e) {
	console.log(1);
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("checked")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (todo.classList.contains("checked")) {
					todo.style.display = "none";
				} else {
					todo.style.display = "flex";
				}
				break;
		}
	});
}

function checkLocalStorage() {
	//CHECK FOR EXISTING LOCAL TODO
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
  return todos;
}

function addLocalTodo(todo) {
	let todos = checkLocalStorage();
	todos.push([todo, "uncompleted"]);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodo(todo) {
	let todos = checkLocalStorage();
	todos.forEach(function (todo) {
		//Create Todo DIV
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//Creat LI
		const newTodo = document.createElement("li");
		newTodo.innerText = todo[0];
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		//CHECKED BUTTON
		const checkButton = document.createElement("button");
		checkButton.innerHTML = '<i class="fas fa-check"></i>';
		checkButton.classList.add("check-btn");
		todoDiv.appendChild(checkButton);

		//TRASH BUTTON
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);

		//APPEND TO LIST
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodo(todo) {
	let todos = checkLocalStorage();
	const todoIndex = todos.indexOf(todo.childNodes[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));

}
