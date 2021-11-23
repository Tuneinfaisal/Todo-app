// getting all required Elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAll = document.querySelector(".footer button")

//onkeyup event
inputBox.onkeyup = () => {
    let userData = inputBox.value;//getting user entered value
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    }
    else {
        addBtn.classList.remove("active");
    }
}

showTasks();
//if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value;//getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo");//getting localStorage
    if (getLocalStorage == null) { //if localStorage is null
        listArr = []; //creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage);//converting json string into a js object
    }
    // listArr.push(userData); //adding user data
    // const time = new moment();
    // listArr.push(userData + " " + time.getHours() + ":" + time.getMinutes());
    listArr.push(userData + " (" + moment().format("MMM Do YY") + " - " + moment().calendar() + ")");//adding date and relative time with moment.js
    // listArr.push(userData + " (" + moment().format("MMM Do YY") + " - " + moment().startOf('hour').fromNow() + ")");//adding moments.js
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //converting js object into json string
    addBtn.classList.remove("active");
    showTasks();
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");//getting localStorage
    if (getLocalStorage == null) { //if localStorage is null
        listArr = []; //creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage);//converting json string into a js object
    }
    const pendingNumber = document.querySelector(".pending");
    pendingNumber.textContent = listArr.length;

    if (listArr.length > 0) {
        deleteAll.classList.add("active");
    }
    else {
        deleteAll.classList.remove("active");
    }

    let newLiTag = '';
    listArr.forEach((element, todo) => {
        newLiTag += `<li> ${element} <span onclick = "deleteTask(${todo})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = "";
}

// delete task function
function deleteTask(todo) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(todo, 1); //deleting the particular indexed item

    //after deleting the item again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

// deleting all task
deleteAll.onclick = () => {
    listArr = [];

    //after deleting the item again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}