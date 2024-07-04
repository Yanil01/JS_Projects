// Selecting DOM elements
let boxes = document.querySelectorAll(".box"); // Selects all elements with class "box"
let resetBtn = document.querySelector("#reset-btn"); // Selects the reset button by its ID
let newGameBtn = document.querySelector("#new-btn"); // Selects the new game button by its ID
let msgContainer = document.querySelector(".msg-container"); // Selects the message container by its class
let msg = document.querySelector("#msg"); // Selects the message element by its ID

let turnO = true; // Flag to track whose turn it is (true for player O, false for player X)

// Winning patterns for Tic-Tac-Toe
const winPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Top-left to bottom-right diagonal
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Top-right to bottom-left diagonal
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

// Function to reset the game
const resetGame = () => {
  turnO = true; // Resets the turn to player O
  enableBoxes(); // Enables all boxes for the new game
  msgContainer.classList.add("hide"); // Hides the message container
};

// Adding click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O's turn
      box.innerText = "O"; // Marks the box with "O"
      turnO = false; // Switches turn to player X
    } else {
      // Player X's turn
      box.innerText = "X"; // Marks the box with "X"
      turnO = true; // Switches turn to player O
    }
    box.disabled = true; // Disables the clicked box from further clicks

    checkWinner(); // Checks if there's a winner after each move
  });
});

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true; // Disables each box
  }
};

// Function to enable all boxes and clear their text
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Enables each box
    box.innerText = ""; // Clears the text inside each box
  }
};

// Function to display the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`; // Sets the message text
  msgContainer.classList.remove("hide"); // Displays the message container
  disableBoxes(); // Disables all boxes after a winner is found
};

// Function to check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText; // Value of box at position 1 in the current pattern
    let pos2Val = boxes[pattern[1]].innerText; // Value of box at position 2 in the current pattern
    let pos3Val = boxes[pattern[2]].innerText; // Value of box at position 3 in the current pattern

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      // If all positions are not empty
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // If all positions have the same value
        showWinner(pos1Val); // Display the winner based on the value
      }
    }
  }
};

// Event listeners for the new game and reset buttons
newGameBtn.addEventListener("click", resetGame); // Resets the game when new game button is clicked
resetBtn.addEventListener("click", resetGame); // Resets the game when reset button is clicked
