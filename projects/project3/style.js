// variables

const accordain = document.getElementsByClassName("content-container");
for (i = 0; i < accordain.length; i++) {
  accordain[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}
