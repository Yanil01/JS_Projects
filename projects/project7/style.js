// Base URL for the exchange rate API
const BASE_URL =
  "https://v6.exchangerate-api.com/v6/243d8e1efe35953ca301f331/latest/USD";

// Selecting all dropdown select elements
const dropdowns = document.querySelectorAll(".dropdown select");

// Selecting the form button
const btn = document.querySelector("form button");

// Selecting the 'From' and 'To' select elements
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Looping through each dropdown select element
for (select of dropdowns) {
  // Looping through each currency code in countryList
  for (currCode in countryList) {
    // Creating a new <option> element for each currency code
    let newOption = document.createElement("option");
    newOption.innerText = currCode; // Setting the inner text to the currency code
    newOption.value = currCode; // Setting the value attribute to the currency code

    // Setting the selected attribute based on the dropdown's name and currency code
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }

    select.append(newOption); // Adding the new <option> to the select element
  }

  // Adding change event listener to each select element
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); // Calling updateFlag function when select value changes
  });
}

// Function to update flag based on currency code
const updateFlag = (element) => {
  let currCode = element.value; // Getting the selected currency code
  let countryCode = countryList[currCode]; // Getting the country code from countryList
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Generating flag image source
  let img = element.parentElement.querySelector("img"); // Selecting the img element
  img.src = newSrc; // Setting the new source for the flag image
};

// Event listener when window is loaded, calls getExchangeRate function
window.addEventListener("load", () => {
  getExchangeRate();
});

// Event listener for form button click, prevents form submission and calls getExchangeRate function
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // Preventing form submission
  getExchangeRate();
});

// Selecting the exchange icon element
const exchangeIcon = document.querySelector(".dropdown i");

// Event listener for exchange icon click
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurr.value; // Storing the current 'From' currency code temporarily
  fromCurr.value = toCurr.value; // Setting 'To' currency code to 'From' dropdown
  toCurr.value = tempCode; // Setting temporary code to 'To' dropdown
  updateFlag(fromCurr); // Updating flag for 'From' dropdown
  updateFlag(toCurr); // Updating flag for 'To' dropdown
  getExchangeRate(); // Calling getExchangeRate function after updating currencies
});

// Function to fetch exchange rate from API
function getExchangeRate() {
  const amount = document.querySelector(".amount input"); // Selecting amount input element
  var exchangeRateTxt = document.querySelector(".msg"); // Selecting message element
  let amountVal = amount.value; // Getting amount value from input

  // If user doesn't enter any value or enters value less than 1, set it to 1
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }

  exchangeRateTxt.innerText = "Getting exchange rate..."; // Displaying loading message

  // Constructing API URL with 'From' currency value
  let url = `https://v6.exchangerate-api.com/v6/243d8e1efe35953ca301f331/latest/${fromCurr.value}`;

  // Fetching data from API
  fetch(url)
    .then((response) => response.json()) // Converting response to JSON
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurr.value]; // Getting exchange rate for 'To' currency
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2); // Calculating total exchange rate
      exchangeRateTxt.innerText = `${amountVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`; // Displaying result
    })
    .catch(() => {
      // Error handling if API request fails
      exchangeRateTxt.innerText = "Something went wrong"; // Displaying error message
    });
}
