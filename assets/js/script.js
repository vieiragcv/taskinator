var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var tasksToDoEl = document.querySelector("#tasks-to-do"); //points to ul
var formEl = document.querySelector("#task-form");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [];


var completeEditTask = function(taskName, taskType, taskId) {

  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };

  saveTasks();

  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

var taskFormHandler = function(event) {

  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if(!taskNameInput || !taskTypeInput){
    alert("You need to fill out the task form!");
  }
  else {
    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 

    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
      };
    }
  createTaskEl(taskDataObj);
  }
  formEl.reset();
}

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  var taskActionsEl = createTaskActions(taskIdCounter);

  tasksToDoEl.appendChild(listItemEl);
  listItemEl.appendChild(taskInfoEl);
  listItemEl.appendChild(taskActionsEl);
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  saveTasks();
 
  taskIdCounter++;
}

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = 'Edit';
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  
  actionContainerEl.appendChild(editButtonEl);

  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}

var taskStatusChangeHandler = function(event) {
  event.target.getAttribute("data-task-id");

  var taskId = event.target.getAttribute("data-task-id");
  var statusValue = event.target.value.toLowerCase();
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};

var taskButtonHandler = function(event) {
  var targetEl = event.target;
  
  if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
  else if(targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
  var updatedTaskArr = [];
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  tasks = updatedTaskArr;
  saveTasks();
};

var editTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
}

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
  var taskOnLocalStorage = localStorage.getItem("tasks");
  if(taskOnLocalStorage === null) {
    tasks = [];
    return false;
  }
  tasks = JSON.parse(taskOnLocalStorage);
  for (i = 0; i < tasks.length; i++) {
    var listItemEl = document.createElement("li");
    console.log(listItemEl);
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", i);
   
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks.name + "</h3><span class='task-type'>" + tasks.type + "</span>";
    
    var taskActionsEl = createTaskActions(i);

    tasksToDoEl.appendChild(listItemEl);
    listItemEl.appendChild(taskInfoEl);
    listItemEl.appendChild(taskActionsEl);
    tasks.id = i;
    tasks.push(tasks);
    console.log(tasks);
    taskIdCounter++;
    break;
    }

}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();
