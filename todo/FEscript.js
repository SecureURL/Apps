var Task_ID = "";
var strDescription = "", CategoriesBtns, CategoriesBtnsFa;

searchTextBx.addEventListener("keyup", () => { 
    SearchTask(searchTextBx.value);
});
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
    }
    else {
        for (i = 0; i < ToDoList.length; i++) {
            if (ToDoList[i][0] == TempID) {
                strDescription = document.getElementById("TodoList_Description").value;
                ToDoList[i][1] = document.getElementById("TodoList_Task").value;
                ToDoList[i][2] = document.getElementById("TodoList_Category").value;
                strDescription = strDescription.replaceAll("\n", "[newLine]");
                
                ToDoList[i][3] = strDescription;

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
    InComplteTask = document.querySelectorAll(".Todo_wrapper .task .fa-times-circle");
    deleteActionToTask();
    completeActionToTask();
    IncompleteActionToTask();
    addActionToTask();
    createCategories();
}

function Trigger_inputModal() {
    if (DivTodo_container.style.filter == "" || DivTodo_container.style.filter == "none") {
        DivTodo_container.style.filter = "blur(1.5px)";
        DivTodoInput_container.style.display = "flex";
    }
    else {
        DivTodo_container.style.filter = "none";
        DivTodoInput_container.style.display = "none";
        document.getElementById("TodoList_Task").value = "";
        document.getElementById("TodoList_Category").value = "";
        document.getElementById("TodoList_Description").value = "";
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
                        ToDoList[i][3] = ToDoList[i][3].replaceAll("[newLine]", "\n");
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

function IncompleteActionToTask() {
    InComplteTask.forEach(CheckBtn => {
        CheckBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            //e.stopImmediatePropagation();
            console.log("InCompleted Task ID- "+CheckBtn.parentElement.getAttribute("id"));
            CheckBtn.parentElement.classList.add("comp");
            setTimeout(function () { CheckBtn.parentElement.remove(); }, 2000);
            
            for (i = 0; i < ToDoList.length; i++) {
                if (ToDoList[i][0] == CheckBtn.parentElement.getAttribute("id")) {
                    ToDoList[i][5] = "Incomplete";
                    setTaskAsInCompleted(CheckBtn.parentElement.getAttribute("id"));
                    break;
                }
            }
            LoadList(); // Loading after a task is completed 
        })
    });
}

function createCategories() {
    allCategoriesEle = document.querySelectorAll("#tasksHolder .task .details h3");
    var allCategoriesList = new Array();
    document.getElementById("categContainer").innerHTML = "";
    document.getElementById("Category-list").innerHTML = "";
    allCategoriesEle.forEach(element => {
        if (allCategoriesList.includes(element.textContent) == false)
        {
            allCategoriesList.push(element.textContent);
            document.getElementById("Category-list").innerHTML += `<option>${element.textContent}</option>`;
            document.getElementById("categContainer").insertAdjacentHTML("beforeend", `<span class="categs active"><i class="far fa-check-circle"></i>${element.textContent}</span>`);
        }
    });

    // if (allCategoriesList.length > 1) { 
    //     document.getElementById("categContainer").insertAdjacentHTML("afterbegin", `<span class="categs active"><i class="far fa-check-circle"></i>Show All</span>`);
    // }

    CategoriesBtnsFa = document.querySelectorAll("#categContainer .categs .fa-check-circle");
    CategoriesBtns = document.querySelectorAll("#categContainer .categs");
    CategoryBtnsAction();
}

function CategoryBtnsAction()
{
    CategoriesBtnsFa.forEach(categsSpans => {
        categsSpans.addEventListener("click", (e) => {
            e.stopPropagation();
            if (categsSpans.classList.contains("fa-check-circle")) //Category is Checked
            {
                allCategoriesEle.forEach(element => {
                    if (element.innerText == categsSpans.parentElement.innerText)
                        element.parentElement.parentElement.classList.add("hide");
                });
                categsSpans.parentElement.classList.remove("active");
                categsSpans.classList.remove("fa-check-circle");
                categsSpans.classList.add("fa-times-circle");
            }
            else                                                              //Category is UnChecked
            {
                allCategoriesEle.forEach(element => {
                    if (element.innerText == categsSpans.parentElement.innerText)
                        element.parentElement.parentElement.classList.remove("hide");
                });
                categsSpans.parentElement.classList.add("active");
                categsSpans.classList.add("fa-check-circle");
                categsSpans.classList.remove("fa-times-circle");
            }
        })
    });

    CategoriesBtns.forEach(CategSpans => {
        CategSpans.addEventListener("click", () => { 
            for (i = 0; i < CategoriesBtns.length; i++) {
                if (CategoriesBtns[i] != CategSpans)
                {
                    CategoriesBtns[i].classList.remove("active");
                    CategoriesBtns[i].children[0].classList.remove("fa-check-circle");
                    CategoriesBtns[i].children[0].classList.add("fa-times-circle");
                }

                else
                {
                    CategoriesBtns[i].classList.add("active");
                    CategoriesBtns[i].children[0].classList.add("fa-check-circle");
                    CategoriesBtns[i].children[0].classList.remove("fa-times-circle");
                }
            }

            allCategoriesEle.forEach(element => {
                if (element.innerText == CategSpans.innerText)
                    element.parentElement.parentElement.classList.remove("hide");
                else
                    element.parentElement.parentElement.classList.add("hide");
            });
        })
    });
}

function SearchTask(searchQuery) { 
    allTasksTitle = document.querySelectorAll("#tasksHolder .task .details h2");
    allCategoriesEle = document.querySelectorAll("#tasksHolder .task .details h3");
    console.log(searchQuery);
    allTasksTitle.forEach(TaskTitles => {
        if (TaskTitles.innerText.toLowerCase().includes(searchQuery.toLowerCase()) == false)
            TaskTitles.parentElement.parentElement.classList.add("hide");
        else
            TaskTitles.parentElement.parentElement.classList.remove("hide");
    });

    allCategoriesEle.forEach(TaskCategory => {
        if (TaskCategory.innerText.toLowerCase().includes(searchQuery.toLowerCase()) == true)
            TaskCategory.parentElement.parentElement.classList.remove("hide");
    });
}

getAllUserTasks(User);

