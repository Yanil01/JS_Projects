// Variables for DOM elements
let openBtn = document.getElementById("open-btn"); // Button that opens the modal
let modalContainer = document.getElementById("modal-container"); // Container for the modal
let closeBtn = document.getElementById("close-btn"); // Close button inside the modal

// Event listener for clicking the open button
openBtn.addEventListener("click", function () {
  modalContainer.style.display = "block"; // Display the modal container when button is clicked
});

// Event listener for clicking outside the modal (to close it)
window.addEventListener("click", function (e) {
  if (e.target === modalContainer) {
    // Check if the click is on the modal container itself
    modalContainer.style.display = "none"; // Hide the modal container
  }
});
