
var buttonEl = document.querySelector("#save-task"); // points to ul
var tasksToDoEl = document.querySelector("#tasks-to-do"); //point to li

var createTaskHandler = function () {   //creates 
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener("click", createTaskHandler); // as click happens, runs function