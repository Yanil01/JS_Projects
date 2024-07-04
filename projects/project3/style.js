// Selecting all elements with the class "content-container"
const accordain = document.getElementsByClassName("content-container");

// Looping through each "content-container" element
for (let i = 0; i < accordain.length; i++) {
  // Adding a click event listener to each "content-container" element
  accordain[i].addEventListener("click", function () {
    // Toggle the "active" class on the clicked element
    this.classList.toggle("active");
  });
}
