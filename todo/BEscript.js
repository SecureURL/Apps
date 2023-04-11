var API_URL = "https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec";

// https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec
// Select * Query-
// https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec?getFullData=true
var NewTaskID = "";
function getNewTaskID(TaskTitle, TaskCategory, TaskDescription, TaskUserID)
{
    // generate unique ID-
    // https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec?generatedID=5
    fetch(API_URL + '?generatedID=5')
        .then(response => response.json())
        .then(data => {
            NewTaskID = data;
            console.log("New Task ID- " + NewTaskID);
            ToDoList.push([NewTaskID, TaskTitle, TaskCategory, TaskDescription, TaskUserID, "incomplete"]);
            LoadList(); //Loading After inserting a Task
            setNewTask(NewTaskID, TaskTitle, TaskCategory, TaskDescription, TaskUserID);
        })
}

function setNewTask(TaskID, TaskTitle, TaskCategory, TaskDescription, TaskUserID)
{
    var setNewTask_report = "";
    // Insert Query -
    // https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec?addRowData=true&dt1=Data1&dt2=Data2&dt3=Data3&dt4=Data4&dt5=Data5
    
    console.log("New Task Added with Task ID- " + Task_ID);
    fetch(API_URL + `?addRowData=true&dt1=${TaskID}&dt2=${TaskTitle}&dt3=${TaskCategory}&dt4=${TaskDescription}&dt5=${TaskUserID}`)
        .then(response => response.json())
        .then(data => {
            InsertDataResponse = data.Data;
            setNewTask_report = InsertDataResponse;
            console.log(setNewTask_report);
        })
    return setNewTask_report;
}

function getAllUserTasks(userID)
{
    // Select * where user [Data]
    // https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec?getUserData=Bishal
    fetch(API_URL + `?getUserData=${userID}`)
        .then(response => response.json())
        .then(data => {
            AllData = Object.values(data.Data);
            console.log(ToDoList);
            try {
                if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
                }
            } catch (error) {
                ToDoList = AllData;
            }
            LoadList(); // Loading Data at the begining
            
        })
}

function setTaskUpdatedData(TaskID, Data1, Data2, Data3)
{
    // Update Task Data- 
    // https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec?updateRowData=TaskID2&dt1=Task%20Title&dt2=Task%20Categ&dt3=Task%20Description
    var setTaskUpdate_report = "";
    
    fetch(API_URL + `?updateRowData=${TaskID}&dt1=${Data1}&dt2=${Data2}&dt3=${Data3}`)
        .then(response => response.json())
        .then(data => {
            AllData = Object.values(data.Data);
            setTaskUpdate_report = AllData;
        })
    return setTaskUpdate_report;
}

function setTaskAsCompleted(TaskID)
{
    // Update Task as Completed-
    // https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec?setComplete=TaskID3
    var setTaskCompleted_report = "";
    fetch(API_URL + `?setComplete=${TaskID}`)
        .then(response => response.json())
        .then(data => {
            AllData = data.Data;
            setTaskCompleted_report = AllData;
            console.log(setTaskCompleted_report);
        })
    return setTaskCompleted_report;
}

function deleteTask(TaskID)
{
    // Delete a task
    // https://script.google.com/macros/s/AKfycbySm3l9vcWJ5CN1fjfi0uPHHSEMmyR4AMdVnH5ZAMITTsBCVW0Z1x8JvkhFMLrbug7mwg/exec?deleteRowData=TaskID
    var setTaskCompleted_report = "";
    fetch(API_URL + `?deleteRowData=${TaskID}`)
        .then(response => response.json())
        .then(data => {
            AllData = data.Data;
            setTaskCompleted_report = AllData;
            console.log(setTaskCompleted_report);
        })
    return setTaskCompleted_report;
}
