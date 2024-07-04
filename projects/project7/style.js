const BASE_URL =
  " https://v6.exchangerate-api.com/v6/243d8e1efe35953ca301f331/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption); //adding select options(countries)
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
// country flag update with their country code
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

window.addEventListener("load", () => {
  getExchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // preventing form from submitting
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".dropdown i");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurr.value; //temporary currency code of FROM dropdown
  fromCurr.value = toCurr.value; //passing TO currency code to FROM currency code
  toCurr.value = tempCode; // passing temporary currrmcy code to TO currency code
  updateFlag(fromCurr); //calling updateFlag with passing element (fromCurr) of FROM
  updateFlag(toCurr); //calling updateFlag with passing element (toCurr) of TO
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  var exchangeRateTxt = document.querySelector(".msg");
  let amountVal = amount.value;
  // if user don't enter any value or enter value less than 1 then by default it set 1
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = ` https://v6.exchangerate-api.com/v6/243d8e1efe35953ca301f331/latest/${fromCurr.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurr.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
    })
    .catch(() => {
      // if user is offline or any other error occured while fetching data
      exchangeRateTxt.innerText = "Something went wrong";
    });
}
