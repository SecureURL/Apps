var Task_ID = "";
        //Input Form Button Action 
BtnInput.addEventListener("click", () => {
    var Value_TodoTask = document.getElementById("TodoList_Task").value;
    var Value_TodoCategory = document.getElementById("TodoList_Category").value;
    var Value_TodoDescription = document.getElementById("TodoList_Description").value;

    if (Value_TodoTask == "")
        alert("Please Enter your task Title.");
    else if (BtnInput.innerText == "Add Task") {
        //ID = (ToDoList.length + 1);
        
        //Generate new ID
        
        getNewTaskID(Value_TodoTask, Value_TodoCategory, Value_TodoDescription, User);
        Trigger_inputModal();
        document.getElementById("TodoList_Task").value = "";
        document.getElementById("TodoList_Category").value = "";
        document.getElementById("TodoList_Description").value = "";
    }
    else {
        for (i = 0; i < ToDoList.length; i++) {
            if (ToDoList[i][0] == TempID) {
                ToDoList[i][1] = document.getElementById("TodoList_Task").value;
                ToDoList[i][2] = document.getElementById("TodoList_Category").value;
                ToDoList[i][3] = document.getElementById("TodoList_Description").value;

                setTaskUpdatedData(TempID, ToDoList[i][1], ToDoList[i][2], ToDoList[i][3]);

                alert("Task Details Updated");
                break;
            }
        }
        LoadList();//Loading After Updating a Task
        Trigger_inputModal();
    }
})

//Input Form Close button Action 
BtnCloseInputHolder.addEventListener("click", () => {
    document.getElementById("TodoList_Task").value = "";
    document.getElementById("TodoList_Category").value = "";
    document.getElementById("TodoList_Description").value = "";
    Trigger_inputModal();
})

document.getElementById("ShowComp").addEventListener("click", () => {
    if (document.getElementById("tasksHolder_Comp").style.display != "flex") { 
        document.getElementById("ShowComp").children[1].innerText = "Hide Completed Tasks";
        document.getElementById("tasksHolder_Comp").style.display = "flex";
    }
    else
    {
        document.getElementById("ShowComp").children[1].innerText = "Completed Tasks";
        document.getElementById("tasksHolder_Comp").style.display = "none";
    }
    
})
//Bottom Menu Add new button Action 

BtnAddNewTask.addEventListener("click", () => {
    document.querySelector(".inputHolder h1").textContent = "Add To Do List";
    document.querySelector(".inputHolder button").innerText = "Add Task";
    Trigger_inputModal();
})

function LoadList() {
    DivTodoListContainer.innerHTML = "";
    var noTaskContent = `<div class="noData">
                    <h1>Hi, ${User}</h1>
                    <h2>There is no task for you to do.</h2>
                    <h2>To add a new Task in the To Do List use the + icon below.</h2>
                </div>`;
    

    //#region Pending Tasks
    var TaskElement = "";

    for (i = 0; i < ToDoList.length; i++) {
        if (ToDoList[i][5].toLowerCase() == "incomplete".toLowerCase()) {
            TaskElement += `
            <div class="task" id="${ToDoList[i][0]}" pos="${i}">
                <i class="far fa-check-circle"></i>
                <span class="details">
                    <h2>${ToDoList[i][1]}</h2>`;

            if (ToDoList[i][2] == "")
                TaskElement += `<h3>uncategorized</h3>`;
            else
                TaskElement += `<h3>${ToDoList[i][2]}</h3>`;
            //<h4>${ToDoList[i][2]}</h4>
            TaskElement += `
                </span>
                <div class="action">
                    <i class="fas fa-pencil-alt"></i>
                    <i class="fas fa-trash"></i>
                </div>
            </div>
            `;
        }
    }
    if (TaskElement != "") {
        DivTodoListContainer.innerHTML = "";
        DivTodoListContainer.innerHTML = `<h2>Pending Tasks</h2>` + TaskElement + DivTodoListContainer.innerHTML;
        document.getElementById("SearchBox").style.display = "initial";
        
        
    }
    else
    {
        DivTodoListContainer.innerHTML = noTaskContent;
        document.getElementById("SearchBox").style.display = "none";
    }
    //#endregion
    
    //#region Completed Task
    var TaskElement_comp = "";

    for (i = 0; i < ToDoList.length; i++) {
        if (ToDoList[i][5].toLowerCase() != "incomplete".toLowerCase()) {
            TaskElement_comp += `
            <div class="task" id="${ToDoList[i][0]}">
                <i class="far fa-times-circle"></i>
                <span class="details">
                    <h2>${ToDoList[i][1]}</h2>`;

            if (ToDoList[i][2] == "")
                TaskElement_comp += `<h3>uncategorized</h3>`;
            else
                TaskElement_comp += `<h3>${ToDoList[i][2]}</h3>`;
            //<h4>${ToDoList[i][2]}</h4>
            TaskElement_comp += `
                </span>
                <div class="action">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
            `;
        }
    }
    DivTodoListContainer_Comp.innerHTML = "";
    if (TaskElement_comp != "")
    {
        DivTodoListContainer_Comp.innerHTML = `<h2>Completed Tasks</h2>` + TaskElement_comp + DivTodoListContainer_Comp.innerHTML;
        document.getElementById("ShowComp").style.display = "block"
    }
    //#endregion

    SingleTask = document.querySelectorAll(".Todo_wrapper .task");
    DeleteTask = document.querySelectorAll(".Todo_wrapper .task .action .fa-trash");
    ComplteTask = document.querySelectorAll(".Todo_wrapper .task .fa-check-circle");
    deleteActionToTask();
    completeActionToTask();
    addActionToTask();
}

function Trigger_inputModal() {
    if (DivTodo_container.style.filter == "" || DivTodo_container.style.filter == "none") {
        DivTodo_container.style.filter = "blur(1.5px)";
        DivTodoInput_container.style.display = "flex";
    }
    else {
        DivTodo_container.style.filter = "none";
        DivTodoInput_container.style.display = "none";
    }
}

function addActionToTask() {
    if (ToDoList.length > 0) {
        SingleTask.forEach(Task => {
            Task.addEventListener("click", () => {

                document.querySelector(".inputHolder h1").textContent = "Task Overview";

                for (i = 0; i < ToDoList.length; i++) {
                    if (ToDoList[i][0] == Task.getAttribute("id")) {
                        document.getElementById("TodoList_Task").value = ToDoList[i][1];
                        document.getElementById("TodoList_Category").value = ToDoList[i][2];
                        document.getElementById("TodoList_Description").value = ToDoList[i][3];
                        document.querySelector(".inputHolder button").innerText = "Update";
                        TempID = Task.getAttribute("id");
                        break;
                    }
                }
                Trigger_inputModal();
            })
        });
    }
}

function deleteActionToTask() {
    console.log("Delete Action confirmed");
    DeleteTask.forEach(DeleteBtn => {
        //event.stopImmediatePropagation();
        DeleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            //e.stopImmediatePropagation();
            console.log(DeleteBtn.parentElement.parentElement.getAttribute("id"));
            DeleteBtn.parentElement.parentElement.classList.add("delete");
            setTimeout(function () { DeleteBtn.parentElement.parentElement.remove(); }, 2000);
            for (i = 0; i < ToDoList.length; i++)
                if (ToDoList[i][0] == DeleteBtn.parentElement.parentElement.getAttribute("id"))
                {
                    ToDoList.splice(i, 1) ;
                    console.log("Deleting at -" + i);
                }
            deleteTask(DeleteBtn.parentElement.parentElement.getAttribute("id"));
            LoadList(); // Loading after a task is deleted
        })
    });
}

function completeActionToTask() {
    ComplteTask.forEach(CheckBtn => {
        CheckBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            //e.stopImmediatePropagation();
            console.log("Completed Task ID- "+CheckBtn.parentElement.getAttribute("id"));
            CheckBtn.parentElement.classList.add("comp");
            setTimeout(function () { CheckBtn.parentElement.remove(); }, 2000);
            
            for (i = 0; i < ToDoList.length; i++) {
                if (ToDoList[i][0] == CheckBtn.parentElement.getAttribute("id")) {
                    ToDoList[i][5] = "complete";
                    setTaskAsCompleted(CheckBtn.parentElement.getAttribute("id"));
                    break;
                }
            }
            LoadList(); // Loading after a task is completed 
        })
    });
}
getAllUserTasks(User);

//document.querySelectorAll("#tasksHolder .task .details h3")
