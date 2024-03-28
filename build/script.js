"use strict";

const FILTER_FORM = document.getElementById("filter-form");

document.body.onload = () => {
 FILTER_FORM.reset();
 window.history.replaceState("", document.title, "/");
};

// RADIO BUTTONS

const OWNERSHIP_OPTIONS_CONTAINER = document.getElementById("ownership-options-container");

OWNERSHIP_OPTIONS_CONTAINER.addEventListener("click", (e) => {
 if (e.target.tagName !== "LABEL") return;
 for (let elem of OWNERSHIP_OPTIONS_CONTAINER.children) elem.classList.remove("tw-checked-radio-label");
 e.target.classList.add("tw-checked-radio-label");
});

// category-select DD (DROPDOWN)

// DD TABS

const CATEGORY_SELECT_TABS_CONTAINER = document.getElementById("category-select-tabs-container");
const CATEGORY_SELECT_OPTIONS_CONTAINER = document.getElementById("category-select-options-container");

CATEGORY_SELECT_TABS_CONTAINER.addEventListener("click", (e) => {
 if (e.target.tagName !== "BUTTON") return;
 for (let elem of CATEGORY_SELECT_TABS_CONTAINER.children) elem.classList.remove("tw-selected-tab");
 e.target.classList.add("tw-selected-tab"); // add the "selected" style to the tab which is clicked

 for (let elem of CATEGORY_SELECT_OPTIONS_CONTAINER.children) {
  elem.classList.add("tw-w-0", "tw-h-0", "tw-invisible", "tw-absolute"); // remove all tab options

  if (elem.id === e.target.dataset.controls) {
   elem.classList.remove("tw-w-0", "tw-h-0", "tw-invisible", "tw-absolute"); // show those options that match the tab which has been clicked
  }
 }
});

// the loop below removes (visually) other tab options in the dropdown, while keeping the options for the first tab (runs every time a page reload, it is not an event handler), making the first tab to be selected by default

for (let elem of CATEGORY_SELECT_OPTIONS_CONTAINER.children) {
 if (elem.id !== CATEGORY_SELECT_TABS_CONTAINER.children["category-select-residential-tab"].dataset.controls)
  elem.classList.add("tw-w-0", "tw-h-0", "tw-invisible", "tw-absolute");
}

// DD TABS LOGIC ENDS HERE

const CATEGORY_SELECT_TOGGLER = document.getElementById("category-select-toggler");
const CATEGORY_SELECT_LABEL = document.getElementById("category-select-label");
const CATEGORY_SELECT_CHEVRON = document.getElementById("category-select-chevron");
const CATEGORY_SELECT_DROPDOWN = document.getElementById("category-select-dropdown");
const CATEGORY_SELECT = document.getElementById("category-select"); // <select> element to send the data to the server

CATEGORY_SELECT.options[0].selected = true; // to reset the value of select to empty string upon page reload
// const height = CATEGORY_SELECT_DROPDOWN.offsetHeight + 12;
// const width = height * 1.75;

CATEGORY_SELECT_DROPDOWN.addEventListener("click", (e) => {
 if (e.target.closest("#category-select-options-container") && e.target.tagName === "SPAN") {
  // CATEGORY_SELECT_TOGGLER.checked = false;
  CATEGORY_SELECT_LABEL.childNodes[0].textContent = e.target.textContent;
  for (let option of CATEGORY_SELECT.options) {
   if (option.textContent.toLowercase() === e.target.textContent.toLowercase()) option.selected = true;
  }

  for (let div of CATEGORY_SELECT_OPTIONS_CONTAINER.children) {
   for (let span of div.children) {
    span.classList.remove("tw-selected-option");
    if (span === e.target) e.target.classList.add("tw-selected-option");
   }
  }
 }

 if (e.target.id === "category-select-done-btn") CATEGORY_SELECT_TOGGLER.checked = false;
 if (e.target.id === "category-select-reset-btn") {
  CATEGORY_SELECT.value = null;
  CATEGORY_SELECT_LABEL.childNodes[0].textContent = "Category";
  // CATEGORY_SELECT_TOGGLER.checked = false;

  for (let options of CATEGORY_SELECT_OPTIONS_CONTAINER.children) {
   for (let option of options.children) {
    option.classList.remove("tw-selected-option");
   }
  }

  CATEGORY_SELECT_TABS_CONTAINER.children["category-select-residential-tab"].click();
 }
});

// SELECT_SECOND DD (DROPDOWN)

const BEDSBATHS_SELECT_TOGGLER = document.getElementById("bedsbaths-select-toggler");
const BEDSBATHS_SELECT_LABEL = document.getElementById("bedsbaths-select-label");
const BEDSBATHS_SELECT_CHEVRON = document.getElementById("bedsbaths-select-chevron");
const BEDSBATHS_SELECT_ARROW_UP = document.getElementById("bedsbaths-select-arrow-up");
const BEDSBATHS_SELECT_DROPDOWN = document.getElementById("bedsbaths-select-dropdown");
const BEDROOMS_OPTIONS_CONTAINER = document.getElementById("bedrooms-options-container");
const BATHROOMS_OPTIONS_CONTAINER = document.getElementById("bathrooms-options-container");

BEDSBATHS_SELECT_DROPDOWN.addEventListener("click", (e) => {
 if (
  (e.target.closest("#bedrooms-options-container") || e.target.closest("#bathrooms-options-container")) &&
  e.target.tagName === "LABEL"
 ) {
  e.target.classList.toggle("tw-checked-option");
  e.target.classList.toggle("hover:tw-bg-gray-100");

  if (BEDSBATHS_SELECT_DROPDOWN.querySelectorAll(".tw-checked-option").length) {
   const beds = [],
    baths = [];
   BEDSBATHS_SELECT_LABEL.childNodes[0].textContent = "";
   for (let node of BEDROOMS_OPTIONS_CONTAINER.querySelectorAll(".tw-checked-option")) {
    beds.push(node.textContent);
   }
   for (let node of BATHROOMS_OPTIONS_CONTAINER.querySelectorAll(".tw-checked-option")) {
    baths.push(node.textContent);
   }

   let numberOfBeds = beds
    .map((item) => parseInt(item))
    .filter((item) => !isNaN(item))
    .reduce((total, num) => total + num, 0);
   let numberOfBaths = baths
    .map((item) => parseInt(item))
    .filter((item) => !isNaN(item))
    .reduce((total, num) => total + num, 0);

   const bedsString = beds.join(", ") + (numberOfBeds ? (numberOfBeds === 1 ? " Bedroom" : " Bedrooms") : "");
   const bathsString = baths.join(", ") + (numberOfBaths ? (numberOfBaths === 1 ? " Bathroom" : " Bathrooms") : "");

   BEDSBATHS_SELECT_LABEL.childNodes[0].textContent =
    bedsString + (!bedsString.length || !bathsString.length ? "" : " / ") + bathsString;
  } else {
   BEDSBATHS_SELECT_LABEL.childNodes[0].textContent = "Bedrooms & Bathrooms";
  }
 }

 if (e.target.id === "bedsbaths-select-done-btn") BEDSBATHS_SELECT_TOGGLER.checked = false;
 if (e.target.id === "bedsbaths-select-reset-btn") {
  BEDSBATHS_SELECT_LABEL.childNodes[0].textContent = "Bedrooms & Bathrooms";

  for (let selected of BEDSBATHS_SELECT_DROPDOWN.querySelectorAll(".tw-checked-option")) {
   selected.click();
  }
 }
});

// SELECT_THIRD DD (DROPDOWN)

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
 nestedDropdown.classList.add("tw-nested-dropdown-style");
 let span = document.createElement("span");
 span.classList.add("tw-p-3", "tw-text-center");
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
  MINIMUM_FIELD.value = 0;
  MAXIMUM_FIELD.value = "";
  // SELECT_THIRD_TOGGLER.checked = false;
 }
});

PRICE_FILTER_CONTAINER.addEventListener("click", (e) => {
 if (e.target.tagName !== "SPAN") return;

 e.target.parentElement.previousElementSibling.value = +e.target.textContent.replace(/\D*/g, "");
 e.target.parentElement.previousElementSibling.dispatchEvent(new Event("change", { bubbles: true }));
 nestedDropdown.remove();
});

PRICE_FILTER_CONTAINER.addEventListener("keydown", (e) => {
 if (!((e.key >= "0" && e.key <= "9") || ["ArrowLeft", "ArrowRight", "Delete", "Backspace"].includes(e.key)))
  e.preventDefault();
});

PRICE_FILTER_CONTAINER.addEventListener("keyup", (e) => {
 e.target.dispatchEvent(new Event("change", { bubbles: true }));
});

PRICE_FILTER_CONTAINER.addEventListener("change", (e) => {
 if (MINIMUM_FIELD.value < 0) MINIMUM_FIELD.value = 0;
 if (+MINIMUM_FIELD.value > +MAXIMUM_FIELD.value) MAXIMUM_FIELD.value = MINIMUM_FIELD.value;
 MAXIMUM_FIELD.setAttribute("min", MINIMUM_FIELD.value);
 if (+MAXIMUM_FIELD.value === 0) MAXIMUM_FIELD.value = "";
 let minAmount = MINIMUM_FIELD.value / 1000 + "K";
 let maxAmount =
  parseInt(MAXIMUM_FIELD.value) === 0 || MAXIMUM_FIELD.value === ""
   ? "Any"
   : MAXIMUM_FIELD.value / 1000 + "K";
 SELECT_THIRD_LABEL.childNodes[0].textContent = `AED ${minAmount} - ${maxAmount}`;
});

// DD CLOSE-WHEN-CLICKED-OUTSIDE LOGIC

document.addEventListener("click", (e) => {
 if (!e.target.closest("#category-select-container")) CATEGORY_SELECT_TOGGLER.checked = false;

 if (CATEGORY_SELECT_TOGGLER.checked) {
  CATEGORY_SELECT_DROPDOWN.classList.remove("tw-invisible");
  CATEGORY_SELECT_DROPDOWN.style.paddingBottom = "12px";
  // CATEGORY_SELECT_DROPDOWN.style.maxHeight = height + "px";
  // CATEGORY_SELECT_DROPDOWN.style.width = width + "px";
  CATEGORY_SELECT_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  CATEGORY_SELECT_DROPDOWN.classList.add("tw-invisible");
  // CATEGORY_SELECT_DROPDOWN.style.paddingBottom = "";
  // CATEGORY_SELECT_DROPDOWN.style.maxHeight = 0;
  CATEGORY_SELECT_CHEVRON.style.transform = "rotateY(360deg)";
 }

 if (!e.target.closest("#bedsbaths-select-container")) BEDSBATHS_SELECT_TOGGLER.checked = false;

 if (BEDSBATHS_SELECT_TOGGLER.checked) {
  BEDSBATHS_SELECT_DROPDOWN.classList.remove("tw-invisible");
  BEDSBATHS_SELECT_DROPDOWN.style.paddingBottom = "12px";
  // BEDSBATHS_SELECT_DROPDOWN.style.maxHeight = height + "px";
  // BEDSBATHS_SELECT_DROPDOWN.style.width = width + "px";
  BEDSBATHS_SELECT_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  BEDSBATHS_SELECT_DROPDOWN.classList.add("tw-invisible");
  // BEDSBATHS_SELECT_DROPDOWN.style.paddingBottom = "";
  // BEDSBATHS_SELECT_DROPDOWN.style.maxHeight = 0;
  BEDSBATHS_SELECT_CHEVRON.style.transform = "rotateY(360deg)";
 }

 console.log(`Range ${MINIMUM_FIELD.value} - ${MAXIMUM_FIELD.value}`);
 if (!e.target.closest("#SELECT_THIRD_CONTAINER") && !e.target.closest(".tw-nested-dropdown-style")) {
  SELECT_THIRD_TOGGLER.checked = false;
  nestedDropdown.remove();
 }

 if (SELECT_THIRD_TOGGLER.checked) {
  SELECT_THIRD_DROPDOWN.classList.remove("tw-invisible");
  SELECT_THIRD_DROPDOWN.style.paddingBottom = "12px";
  // SELECT_THIRD_DROPDOWN.style.maxHeight = height + "px";
  // SELECT_THIRD_DROPDOWN.style.width = width + "px";
  SELECT_THIRD_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  SELECT_THIRD_DROPDOWN.classList.add("tw-invisible");
  // SELECT_THIRD_DROPDOWN.style.paddingBottom = "";
  // SELECT_THIRD_DROPDOWN.style.maxHeight = 0;
  SELECT_THIRD_CHEVRON.style.transform = "rotateY(360deg)";
 }
});

// DD ORIENTATION CHANGE LOGIC

function flipDropDown(dropdown) {
 if (!dropdown) return;
 let coords = dropdown.getBoundingClientRect();
 if (coords.left < 5) {
  dropdown.classList.remove("tw-right-0");
  dropdown.classList.add("tw-left-0");

  dropdown.querySelector(".tw-arrow-up").classList.remove("tw-right-[14px]");
  dropdown.querySelector(".tw-arrow-up").classList.add("tw-left-[14px]");
 }
 if (dropdown.parentElement.querySelector("label").getBoundingClientRect().right > dropdown.offsetWidth + 5) {
  dropdown.classList.remove("tw-left-0");
  dropdown.classList.add("tw-right-0");

  dropdown.querySelector(".tw-arrow-up").classList.remove("tw-left-[14px]");
  dropdown.querySelector(".tw-arrow-up").classList.add("tw-right-[14px]");
 }
}

for (let dropdown of document.querySelectorAll(".tw-dropdown")) {
 flipDropDown(dropdown);
}

window.addEventListener("resize", function (e) {
 flipDropDown(document.querySelector(".tw-dropdown:not(.tw-invisible)"));
});

window.onerror = (msg, url, line, col, error) => {
 const extra = (!col ? '' : `\ncolumn: ${col}`) + (!error ? '' : `\nerror: ${error}`);
 console.log(`Error: ${msg}\nurl: ${url}\nline: ${line}${extra}`);
};