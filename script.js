// Selections for tabs
const tabAll = document.querySelector(".allBtn");
const tabActive = document.querySelector(".activeBtn");
const tabcomp = document.querySelector(".compBtn");
// Selections for tab button
const forAll = document.querySelector(".tab1");
const forActive = document.querySelector(".tab2");
const forcomp = document.querySelector(".tab3");
// Selections for input element and add button
const userInput = document.querySelector(".inputEl");
const addTaskBTN = document.querySelector(".addBTN");
// Selections for clearing tasksArray, importing and Export
const taskClear = document.querySelector(".clearBTN");
const importTask = document.querySelector(".importBTN");
const exportTask = document.querySelector(".exportBTN");
const lightDark = document.querySelector(".lightDark");
const tasknumber = document.querySelector(".tasknumber");
const totaltasks = document.querySelector(".totaltasks");
const completedDone = document.querySelector(".completedDone");

let tasksArray = [];
let activeTaskArray = [];
let completedTasksArray = [];

forAll.classList.add("showTab");

function updateState() {
  tasknumber.textContent = activeTaskArray.length;
  totaltasks.textContent = tasksArray.length;
  completedDone.textContent = completedTasksArray.length;
}
updateState();
tabAll.addEventListener("click", function () {
  forAll.classList.add("showTab");
  forActive.classList.remove("showTab");
  forcomp.classList.remove("showTab");
});
tabActive.addEventListener("click", function () {
  forAll.classList.remove("showTab");
  forActive.classList.add("showTab");
  forcomp.classList.remove("showTab");
});
tabcomp.addEventListener("click", function () {
  forAll.classList.remove("showTab");
  forActive.classList.remove("showTab");
  forcomp.classList.add("showTab");
});
function renderTasks(usertask, id, tab = forAll) {
  if (usertask.length < 1) {
    return;
  }
  if (tasksArray.length < 1) {
    forAll.innerHTML = `<div class="taskparent">
        <P>No Task Available at The Moment!!</P>
      </div>`;
    return;
  }

  if (usertask === "") {
    return;
  }
  //Create Task Left Side
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onclick = markAsCompleted;
  let pElement = document.createElement("p");
  pElement.textContent = usertask;
  let taskElement = document.createElement("div");
  taskElement.classList.add("taskleftside");

  taskElement.appendChild(checkBox);
  taskElement.appendChild(pElement);

  // Create Task Right Side
  let taskButton = document.createElement("button");
  taskButton.classList.add("editbutton");
  taskButton.classList.add("deletebutton");
  taskButton.textContent = "🗑";
  taskButton.onclick = deleteTask;
  let taskButton2 = document.createElement("button");
  taskButton2.classList.add("deletebutton");
  taskButton2.classList.add("editbutton");
  taskButton2.textContent = "✎";
  taskButton2.onclick = editTask;

  let taskElement2 = document.createElement("div");
  taskElement2.classList.add("taskrightside");
  taskElement2.appendChild(taskButton);
  taskElement2.appendChild(taskButton2);
  // TASK CHILD DIV
  let taskChildDiv = document.createElement("div");
  taskChildDiv.classList.add("taskchild");
  taskChildDiv.appendChild(taskElement);
  taskChildDiv.appendChild(taskElement2);
  taskChildDiv.id = id;
  tab.appendChild(taskChildDiv);
}

function addTask(tab, array, tabType) {
  let userInputValue = userInput.value.trim();
  let finalArray;
  if (tabType === "completed") {
    finalArray = array;
  } else {
    array.push(userInputValue);
    finalArray = array  
  }
  //Clearing Existing HTML
  tab.innerHTML = "";
  console.log(finalArray)
  for (let i = 0; i < finalArray.length; i++) {
    renderTasks(finalArray[i], i, tab);
  }
  userInput.value = "";
  updateState();
}

addTaskBTN.addEventListener("click", function () {
  addTask(forAll, tasksArray);
});
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask(forAll, tasksArray);
  }
});

taskClear.addEventListener("click", function () {
  tasksArray = [];
  renderTasks(forAll, tasksArray);
  console.log(array);

  alert();
});

// function formode() {
//   if (lightDark.textContent === "🌙") {
//     lightDark.textContent = "☀️";
//   } else if (lightDark.textContent === "☀️") {
//     lightDark.textContent = "🌙";
//   }
// }
function lightDarkControl() {
  if (lightDark.textContent === "☀️") {
    lightDark.textContent = "🌙";
    document.body.classList.add("dark");
    lightDark.classList.add("dark");
    ClearBTN.classList.add("dark");
    exportBTN.classList.add("dark");
    importBTN.classList.add("dark");
    inputEl.classList.add("dark");
  } else {
    lightDark.textContent === "🌙";
    lightDark.textContent = "☀️";
    document.body.classList.remove("dark");
    lightDark.classList.remove("dark");
    ClearBTN.classList.remove("dark");
    exportBTN.classList.remove("dark");
    importBTN.classList.remove("dark");
    inputEl.classList.remove("dark");
  }
}
lightDark.addEventListener("click", lightDarkControl);

function tester() {
  alert("Testing");
}

function editTask(e) {
  let editbutton = e.target;
  let taskChild1 = editbutton.parentElement;
  let taskChild = taskChild1.parentElement;
  const taskleftside = taskChild.querySelector(".taskleftside");
  const textElement = taskleftside.querySelector("p");
  const oldText = textElement.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;
  input.classList.add("editInput");
  taskleftside.replaceChild(input, textElement);
  input.focus();
  const taskIndex = tasksArray.indexOf(oldText);

  function saveEdit() {
    const newText = input.value.trim();
    if (newText === "") {
      tasksArray[taskIndex] = oldText;
    } else {
      tasksArray[taskIndex] = newText;
    }
    const newP = document.createElement("p");
    newP.textContent = tasksArray[taskIndex];
    taskleftside.replaceChild(newP, input);
  }
  input.addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      saveEdit();
    }
  });

  input.addEventListener("blur", saveEdit);
}
function deleteTask(e) {
  //  console.log(e.target)
  let deletebutton = e.target;
  let taskleftside = deletebutton.parentElement;
  let taskchild = taskleftside.parentElement;
  let id = taskchild.id;
  tasksArray.splice(id, 1);
  addTask(forAll, tasksArray);
}

function markAsCompleted(e) {
  const checkbox = e.target;
  const checkboxP = checkbox.parentElement;
  const taskChild = checkboxP.parentElement;
  const taskid = Number(taskChild.id);
  const PEL = checkboxP.querySelector("p");
  const usertask = PEL.textContent;
  let temporalArray = tasksArray.splice(taskid, 1);
  completedTasksArray.push(usertask);
  addTask(forcomp, completedTasksArray, "completed");
  addTask(forAll, tasksArray);
  updateState();
}
