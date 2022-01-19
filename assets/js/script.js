
var buttonEl = document.querySelector("#save-task"); // points button
var tasksToDoEl = document.querySelector("#tasks-to-do"); //points to ul

var createTaskHandler = function () {  
  var listItemEl = document.createElement("li"); // creates an li(html) element
  listItemEl.className = "task-item"; // associates a class to new li element
  listItemEl.textContent = "This is a new task."; // adds text to new li element
  tasksToDoEl.appendChild(listItemEl); //appends the new li as a child  element to a variable previously declared.
}

buttonEl.addEventListener("click", createTaskHandler); // as click happens, runs function