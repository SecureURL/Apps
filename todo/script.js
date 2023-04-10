let taskList = document.getElementById("taskList");
let newTaskInput = document.getElementById("newTaskInput");

function addTask() {
  if (newTaskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }
  
  let task = document.createElement("li");
  let taskText = document.createElement("span");
  taskText.innerText = newTaskInput.value;
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.onclick = function() {
    task.remove();
  };
  task.appendChild(taskText);
  task.appendChild(deleteButton);
  taskList.appendChild(task);
  newTaskInput.value = "";
}
