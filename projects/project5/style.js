// Variables to select elements from the HTML
const addTask = document.getElementById("add-task"); // Button to add tasks
const taskContainer = document.getElementById("task-container"); // Container where tasks will be added
const inputTask = document.getElementById("input-task"); // Input field to enter task

// Event listener for the "Add Task" button
addTask.addEventListener("click", function () {
  // Create a new task element (a div with class "task")
  let task = document.createElement("div");
  task.classList.add("task");

  // Create a list item (li) to display the task text
  let li = document.createElement("li");
  li.innerText = `${inputTask.value}`; // Set the text of the list item to the input value
  task.appendChild(li); // Append the list item to the task div

  // Create a check button (button with check icon)
  let checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>'; // Insert a check icon using Font Awesome
  checkButton.classList.add("checkTask"); // Add class "checkTask" to the button
  task.appendChild(checkButton); // Append the check button to the task div

  // Create a delete button (button with trash icon)
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Insert a trash icon using Font Awesome
  deleteButton.classList.add("deleteTask"); // Add class "deleteTask" to the button
  task.appendChild(deleteButton); // Append the delete button to the task div

  // Check if the input field is empty
  if (inputTask.value === "") {
    alert("Please Enter a task"); // Show an alert if input field is empty
  } else {
    taskContainer.appendChild(task); // Append the created task div to the task container
  }

  inputTask.value = ""; // Clear the input field after adding the task

  // Event listener for the check button (mark task as completed)
  checkButton.addEventListener("click", function () {
    checkButton.parentElement.style.textDecoration = "line-through"; // Add a line-through style to the task text
  });

  // Event listener for the delete button (remove task)
  deleteButton.addEventListener("click", function (e) {
    let target = e.target; // Get the button element that triggered the event
    target.parentElement.parentElement.remove(); // Remove the entire task div when delete button is clicked
  });
});
