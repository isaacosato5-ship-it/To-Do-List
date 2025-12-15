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
forAll.classList.add("showTab");

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
function renderTasks(usertask) {
  //Create Task Left Side
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  let pElement = document.createElement("p");
  pElement.textContent = usertask;
  let taskElement = document.createElement("div");
  taskElement.classList.add("taskleftside");

  taskElement.appendChild(checkBox);
  taskElement.appendChild(pElement);
  console.log(taskElement);

  // Create Task Right Side
  let taskButton = document.createElement("button");
  taskButton.classList.add("editbutton");
  taskButton.classList.add("deletebutton");
  taskButton.textContent = "🗑"

  let taskButton2 = document.createElement("button");
  taskButton2.classList.add("deletebutton");
  taskButton2.classList.add("editbutton");
   taskButton2.textContent = "✎"

  let taskElement2 = document.createElement("div");
  taskElement2.classList.add("taskrightside");
  taskElement2.appendChild(taskButton);
  taskElement2.appendChild(taskButton2);
  console.log(taskElement2);

  // TASK CHILD DIV
  let taskChildDiv = document.createElement("div");
  taskChildDiv.classList.add("taskchild");
  taskChildDiv.appendChild(taskElement)
  taskChildDiv.appendChild(taskElement2)
   forAll.appendChild(taskChildDiv)

}

let tasksArray = [];

function addTask() {
  let userInputValue = userInput.value;
  tasksArray.push(userInputValue);
  userInput.value = "";
  console.log(tasksArray);
   forAll.innerHTML = ""
  for (let i = 0; i < tasksArray.length; i++) {
    renderTasks(tasksArray[i])
  }
}

addTaskBTN.addEventListener("click", function () {
  addTask();
});
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask()
  }
});

