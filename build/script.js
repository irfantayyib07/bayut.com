"use strict";

const FILTER_FORM = document.getElementById("filter-form");

document.body.onload = () => {
 FILTER_FORM.reset();
}

// RADIO BUTTONS

const RADIO_BUTTONS_CONTAINER = document.getElementById("RADIO_BUTTONS_CONTAINER");

RADIO_BUTTONS_CONTAINER.addEventListener("click", (e) => {
 if (e.target.tagName !== "LABEL") return;
 for (let elem of RADIO_BUTTONS_CONTAINER.children) elem.classList.remove("checked-radio-label");
 e.target.classList.add("checked-radio-label");
});

// SELECT_FIRST DD (DROPDOWN)

// DD TABS

const SELECT_FIRST_TABS_CONTAINER = document.getElementById("SELECT_FIRST_TABS_CONTAINER");
const SELECT_FIRST_TAB_OPTIONS_CONTAINER = document.getElementById("SELECT_FIRST_TAB_OPTIONS_CONTAINER");

SELECT_FIRST_TABS_CONTAINER.addEventListener("click", (e) => {
 if (e.target.tagName !== "BUTTON") return;
 for (let elem of SELECT_FIRST_TABS_CONTAINER.children) elem.classList.remove("selected-tab");
 e.target.classList.add("selected-tab"); // add the "selected" style to the tab which is clicked

 for (let elem of SELECT_FIRST_TAB_OPTIONS_CONTAINER.children) {
  elem.classList.add("w-0", "h-0", "invisible", "absolute"); // remove all tab options

  if (elem.id === e.target.dataset.controls) {
   elem.classList.remove("w-0", "h-0", "invisible", "absolute"); // show those options that match the tab which has been clicked
  }
 }
});

// the loop below removes (visually) other tab options in the dropdown, while keeping the options for the first tab (runs every time a page reload, it is not an event handler), making the first tab to be selected by default

for (let elem of SELECT_FIRST_TAB_OPTIONS_CONTAINER.children) {
 if (elem.id !== SELECT_FIRST_TABS_CONTAINER.children["SELECT_FIRST_CATEGORY1_TAB"].dataset.controls)
  elem.classList.add("w-0", "h-0", "invisible", "absolute");
}

// DD TABS LOGIC ENDS HERE

const SELECT_FIRST_TOGGLER = document.getElementById("SELECT_FIRST_TOGGLER");
const SELECT_FIRST_LABEL = document.getElementById("SELECT_FIRST_LABEL");
const SELECT_FIRST_CHEVRON = document.getElementById("SELECT_FIRST_CHEVRON");
const SELECT_FIRST_ARROW_UP = document.getElementById("SELECT_FIRST_ARROW_UP");
const SELECT_FIRST_DROPDOWN = document.getElementById("SELECT_FIRST_DROPDOWN");
const SELECT_FIRST = document.getElementById("SELECT_FIRST"); // <select> element to send the data to the server

SELECT_FIRST.options[0].selected = true; // to reset the value of select to empty string upon page reload
// const height = SELECT_FIRST_DROPDOWN.offsetHeight + 12;
// const width = height * 1.75;

SELECT_FIRST_DROPDOWN.addEventListener("click", (e) => {
 if (e.target.closest("#SELECT_FIRST_TAB_OPTIONS_CONTAINER") && e.target.tagName === "SPAN") {
  // SELECT_FIRST_TOGGLER.checked = false;
  SELECT_FIRST_LABEL.childNodes[0].textContent = e.target.textContent;
  for (let option of SELECT_FIRST.options) {
   if (option.textContent === e.target.textContent) option.selected = true;
  }

  for (let div of SELECT_FIRST_TAB_OPTIONS_CONTAINER.children) {
   for (let span of div.children) {
    span.classList.remove("selected-option");
    if (span === e.target) e.target.classList.add("selected-option");
   }
  }
 }

 if (e.target.id === "SELECT_FIRST_DD_DONE_BUTTON") SELECT_FIRST_TOGGLER.checked = false;
 if (e.target.id === "SELECT_FIRST_DD_RESET_BUTTON") {
  SELECT_FIRST.value = null;
  SELECT_FIRST_LABEL.childNodes[0].textContent = "Category1";
  // SELECT_FIRST_TOGGLER.checked = false;

  for (let options of SELECT_FIRST_TAB_OPTIONS_CONTAINER.children) {
   for (let option of options.children) {
    option.classList.remove("selected-option");
   }
  }

  SELECT_FIRST_TABS_CONTAINER.children["SELECT_FIRST_CATEGORY1_TAB"].click();
 }
});

document.addEventListener("click", (e) => {
 // console.log(SELECT_FIRST.value);
 if (!e.target.closest("#SELECT_FIRST_CONTAINER")) SELECT_FIRST_TOGGLER.checked = false;

 if (SELECT_FIRST_TOGGLER.checked) {
  SELECT_FIRST_DROPDOWN.classList.remove("invisible");
  SELECT_FIRST_DROPDOWN.style.paddingBottom = "12px";
  // SELECT_FIRST_DROPDOWN.style.maxHeight = height + "px";
  // SELECT_FIRST_DROPDOWN.style.width = width + "px";
  SELECT_FIRST_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  SELECT_FIRST_DROPDOWN.classList.add("invisible");
  // SELECT_FIRST_DROPDOWN.style.paddingBottom = "";
  // SELECT_FIRST_DROPDOWN.style.maxHeight = 0;
  SELECT_FIRST_CHEVRON.style.transform = "rotateY(360deg)";
 }
});

// DD ORIENTATION CHANGE LOGIC

function flipDropDown() {
 const dropdown = document.querySelector(".dropdown:not(.invisible)");
 let coords = dropdown?.getBoundingClientRect();
 if (coords?.left < 5) {
  dropdown.classList.remove("right-0");
  dropdown.classList.add("left-0");

  dropdown.querySelector(".arrow-up").classList.remove("right-[14px]");
  dropdown.querySelector(".arrow-up").classList.add("left-[14px]");
 }
 if (dropdown?.parentElement.querySelector("label").getBoundingClientRect().right > dropdown?.offsetWidth + 5) {
  dropdown.classList.remove("left-0");
  dropdown.classList.add("right-0");

  dropdown.querySelector(".arrow-up").classList.remove("left-[14px]");
  dropdown.querySelector(".arrow-up").classList.add("right-[14px]");
 }
}

flipDropDown();

window.addEventListener("resize", function (e) {
 flipDropDown();
});

// 







// DD TABS LOGIC ENDS HERE

const SELECT_SECOND_TOGGLER = document.getElementById("SELECT_SECOND_TOGGLER");
const SELECT_SECOND_LABEL = document.getElementById("SELECT_SECOND_LABEL");
const SELECT_SECOND_CHEVRON = document.getElementById("SELECT_SECOND_CHEVRON");
const SELECT_SECOND_ARROW_UP = document.getElementById("SELECT_SECOND_ARROW_UP");
const SELECT_SECOND_DROPDOWN = document.getElementById("SELECT_SECOND_DROPDOWN");

SELECT_SECOND_DROPDOWN.addEventListener("click", (e) => {
 if ((e.target.closest("#BEDS_OPTIONS_CONTAINER") || e.target.closest("#BATHS_OPTIONS_CONTAINER")) && e.target.tagName === "LABEL") {
  e.target.classList.toggle("checked-option");
  e.target.classList.toggle("hover:bg-gray-100");


  if (SELECT_SECOND_DROPDOWN.querySelectorAll(".checked-option").length) {
   const beds = [], baths = [];
   SELECT_SECOND_LABEL.childNodes[0].textContent = "";
   for (let node of BEDS_OPTIONS_CONTAINER.querySelectorAll(".checked-option")) {
    beds.push(node.textContent);
   }
   for (let node of BATHS_OPTIONS_CONTAINER.querySelectorAll(".checked-option")) {
    baths.push(node.textContent);
   }

   let numberOfBeds = beds.map(item => parseInt(item)).filter(item => !isNaN(item)).reduce((total, num) => total + num, 0);
   let numberOfBaths = baths.map(item => parseInt(item)).filter(item => !isNaN(item)).reduce((total, num) => total + num, 0);

   const bedsString = beds.join(", ") + (numberOfBeds ? (numberOfBeds === 1 ? " Bed" : " Beds") : "");
   const bathsString = baths.join(", ") + (numberOfBaths ? (numberOfBaths === 1 ? " Bath" : " Baths") : "");

   SELECT_SECOND_LABEL.childNodes[0].textContent = bedsString + ((!bedsString.length || !bathsString.length) ? "" : " / ") + bathsString;

  } else {
   SELECT_SECOND_LABEL.childNodes[0].textContent = "Beds & Baths";
  }
 }

 if (e.target.id === "SELECT_SECOND_DD_DONE_BUTTON") SELECT_SECOND_TOGGLER.checked = false;
 if (e.target.id === "SELECT_SECOND_DD_RESET_BUTTON") {
  SELECT_SECOND_LABEL.childNodes[0].textContent = "Beds & Baths";

  for (let selected of SELECT_SECOND_DROPDOWN.querySelectorAll(".checked-option")) {
   selected.click();
  }
 }
});

document.addEventListener("click", (e) => {
 if (!e.target.closest("#SELECT_SECOND_CONTAINER")) SELECT_SECOND_TOGGLER.checked = false;

 if (SELECT_SECOND_TOGGLER.checked) {
  SELECT_SECOND_DROPDOWN.classList.remove("invisible");
  SELECT_SECOND_DROPDOWN.style.paddingBottom = "12px";
  // SELECT_SECOND_DROPDOWN.style.maxHeight = height + "px";
  // SELECT_SECOND_DROPDOWN.style.width = width + "px";
  SELECT_SECOND_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  SELECT_SECOND_DROPDOWN.classList.add("invisible");
  // SELECT_SECOND_DROPDOWN.style.paddingBottom = "";
  // SELECT_SECOND_DROPDOWN.style.maxHeight = 0;
  SELECT_SECOND_CHEVRON.style.transform = "rotateY(360deg)";
 }
});

// 









// DD TABS LOGIC ENDS HERE

const SELECT_THIRD_TOGGLER = document.getElementById("SELECT_THIRD_TOGGLER");
const SELECT_THIRD_LABEL = document.getElementById("SELECT_THIRD_LABEL");
const SELECT_THIRD_CHEVRON = document.getElementById("SELECT_THIRD_CHEVRON");
const SELECT_THIRD_ARROW_UP = document.getElementById("SELECT_THIRD_ARROW_UP");
const SELECT_THIRD_DROPDOWN = document.getElementById("SELECT_THIRD_DROPDOWN");

const PRICE_FILTER_CONTAINER = document.getElementById("PRICE_FILTER_CONTAINER");
const MINIMUM_FIELD = document.getElementById("minimum");
const MAXIMUM_FIELD = document.getElementById("maximum");
const MINIMUM_FIELD_CONTAINER = document.getElementById("MINIMUM_FIELD_CONTAINER");
const MAXIMUM_FIELD_CONTAINER = document.getElementById("MAXIMUM_FIELD_CONTAINER");

const options = ["10,000", "20,000", "30,000", "40,000", "50,000", "60,000"];
let nestedDropdown = document.createElement("div");

for (let i = 0; i < options.length; i++) {
 nestedDropdown.classList.add("nested-dropdown-style");
 let span = document.createElement("span");
 span.classList.add("p-3", "text-center");
 span.textContent = options[i];
 nestedDropdown.append(span);
}

MINIMUM_FIELD.addEventListener("focus", (e) => {
 MINIMUM_FIELD_CONTAINER.append(nestedDropdown);
});

MAXIMUM_FIELD.addEventListener("focus", (e) => {
 MAXIMUM_FIELD_CONTAINER.append(nestedDropdown);
});

SELECT_THIRD_DROPDOWN.addEventListener("click", (e) => {
 if (e.target.closest("#SELECT_THIRD_CONTAINER") && e.target.tagName !== "INPUT") {
  nestedDropdown.remove();
 }

 if (e.target.id === "SELECT_THIRD_DD_DONE_BUTTON") SELECT_THIRD_TOGGLER.checked = false;
 if (e.target.id === "SELECT_THIRD_DD_RESET_BUTTON") {
  SELECT_THIRD_LABEL.childNodes[0].textContent = "Price (AED)";
  MINIMUM_FIELD.value = "";
  MAXIMUM_FIELD.value = "";
  // SELECT_THIRD_TOGGLER.checked = false;
 }
});

PRICE_FILTER_CONTAINER.addEventListener("click", (e) => {
 if (e.target.tagName !== "SPAN") return;

 for (let option of nestedDropdown.children) {
  option.classList.remove("selected-amount");
 }

 e.target.classList.add("selected-amount");
 e.target.parentElement.previousElementSibling.value = +e.target.textContent.replace(/\D*/g, "");
 e.target.parentElement.previousElementSibling.dispatchEvent(new Event('change', { bubbles: true }));
 nestedDropdown.remove();
});

MINIMUM_FIELD.addEventListener("keydown", (e) => {
 if (!((e.key >= "0" && e.key <= "9") || ["ArrowLeft", "ArrowRight", "Delete", "Backspace"].includes(e.key))) e.preventDefault();
});

MINIMUM_FIELD.addEventListener("keyup", (e) => {
 e.target.dispatchEvent(new Event('change', { bubbles: true }));
});

PRICE_FILTER_CONTAINER.addEventListener("change", (e) => {
 // console.log(MINIMUM_FIELD.value);
 if (MINIMUM_FIELD.value < 0) MINIMUM_FIELD.value = 0;
 if (+MINIMUM_FIELD.value > +MAXIMUM_FIELD.value) MAXIMUM_FIELD.value = MINIMUM_FIELD.value;
 MAXIMUM_FIELD.setAttribute("min", MINIMUM_FIELD.value);
 if (+MAXIMUM_FIELD.value === 0) MAXIMUM_FIELD.value = "";
 let minAmount = (MINIMUM_FIELD.value / 1000) + "K";
 let maxAmount = (parseInt(MAXIMUM_FIELD.value) === 0 || MAXIMUM_FIELD.value === "") ? "Any" : (MAXIMUM_FIELD.value / 1000) + "K";
 SELECT_THIRD_LABEL.childNodes[0].textContent = `AED ${minAmount} - ${maxAmount}`;
});

document.addEventListener("click", (e) => {
 // console.log(`Range ${MINIMUM_FIELD.value} - ${MAXIMUM_FIELD.value}`);
 if (!e.target.closest("#SELECT_THIRD_CONTAINER") && !e.target.closest(".nested-dropdown-style")) {
  SELECT_THIRD_TOGGLER.checked = false;
  nestedDropdown.remove();
 }

 if (SELECT_THIRD_TOGGLER.checked) {
  SELECT_THIRD_DROPDOWN.classList.remove("invisible");
  SELECT_THIRD_DROPDOWN.style.paddingBottom = "12px";
  // SELECT_THIRD_DROPDOWN.style.maxHeight = height + "px";
  // SELECT_THIRD_DROPDOWN.style.width = width + "px";
  SELECT_THIRD_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  SELECT_THIRD_DROPDOWN.classList.add("invisible");
  // SELECT_THIRD_DROPDOWN.style.paddingBottom = "";
  // SELECT_THIRD_DROPDOWN.style.maxHeight = 0;
  SELECT_THIRD_CHEVRON.style.transform = "rotateY(360deg)";
 }
});