
var buttonEl = document.querySelector("#save-task"); // points button
var tasksToDoEl = document.querySelector("#tasks-to-do"); //points to ul
var formEl = document.querySelector("#task-form");

var createTaskHandler = function(event) {

  event.preventDefault();

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};
formEl.addEventListener("submit", createTaskHandler);
buttonEl.addEventListener("click", createTaskHandler); // as click happens, runs function