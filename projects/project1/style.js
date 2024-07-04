// Selecting elements from the HTML
let btn = document.querySelector("#new-quote"); // Selecting the button with id "new-quote"
let quote = document.querySelector(".quote"); // Selecting the element with class "quote" (where the quote will appear)
let person = document.querySelector(".person"); // Selecting the element with class "person" (where the person's name will appear)

// Array of quote objects, each containing a quote and its author
const quotes = [
  {
    quote:
      '"The best way to find yourself is to lose yourself in the service of others."',
    person: "Mahatma Gandhi",
  },
  {
    quote:
      '"If you want to live a happy life, tie it to a goal, not to people or things."',
    person: "Albert Einstein",
  },
  {
    quote:
      '"At his best, man is the noblest of all animals; separated from law and justice he is the worst."',
    person: "Aristotle",
  },
  {
    quote:
      '"Your time is limited, so don`t waste it living someone else`s life."',
    person: "Steve Jobs",
  },
  {
    quote:
      '"Tell me and I forget. Teach me and I remember. Involve me and I learn."',
    person: "Benjamin Franklin",
  },
];

// Adding an event listener to the button for generating a new quote
btn.addEventListener("click", function () {
  // Generate a random index within the quotes array length
  let random = Math.floor(Math.random() * quotes.length);

  // Update the text content of quote and person elements with the randomly selected quote
  quote.innerText = quotes[random].quote;
  person.innerText = quotes[random].person;
});
