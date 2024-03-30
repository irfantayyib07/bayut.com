"use strict";

const FILTER_FORM = document.getElementById("filter-form");
const OWNERSHIP_OPTIONS_CONTAINER = document.getElementById("ownership-options-container");
const CATEGORY_SELECT_TABS_CONTAINER = document.getElementById("category-select-tabs-container");
const CATEGORY_SELECT_OPTIONS_CONTAINER = document.getElementById("category-select-options-container");
const CATEGORY_SELECT_TOGGLER = document.getElementById("category-select-toggler");
const CATEGORY_SELECT_LABEL = document.getElementById("category-select-label");
const CATEGORY_SELECT_DROPDOWN = document.getElementById("category-select-dropdown");
const CATEGORY_SELECT = document.getElementById("category-select"); // <select> element to send the data to the server
const BEDSBATHS_SELECT_TOGGLER = document.getElementById("bedsbaths-select-toggler");
const BEDSBATHS_SELECT_LABEL = document.getElementById("bedsbaths-select-label");
const BEDSBATHS_SELECT_ARROW_UP = document.getElementById("bedsbaths-select-arrow-up");
const BEDSBATHS_SELECT_DROPDOWN = document.getElementById("bedsbaths-select-dropdown");
const BEDROOMS_OPTIONS_CONTAINER = document.getElementById("bedrooms-options-container");
const BATHROOMS_OPTIONS_CONTAINER = document.getElementById("bathrooms-options-container");
const AMOUNT_SELECT_TOGGLER = document.getElementById("amount-select-toggler");
const AMOUNT_SELECT_LABEL = document.getElementById("amount-select-label");
const AMOUNT_SELECT_ARROW_UP = document.getElementById("amount-select-arrow-up");
const AMOUNT_SELECT_DROPDOWN = document.getElementById("amount-select-dropdown");
const PRICE_FILTER_CONTAINER = document.getElementById("price-filter-container");
const MINIMUM_FIELD = document.getElementById("minimum");
const MAXIMUM_FIELD = document.getElementById("maximum");
const MINIMUM_FIELD_CONTAINER = document.getElementById("minimum-field-container");
const MAXIMUM_FIELD_CONTAINER = document.getElementById("maximum-field-container");
const CATEGORY_SELECT_CHEVRON = document.getElementById("category-select-chevron");
const BEDSBATHS_SELECT_CHEVRON = document.getElementById("bedsbaths-select-chevron");
const AMOUNT_SELECT_CHEVRON = document.getElementById("amount-select-chevron");

document.body.onload = () => {
 FILTER_FORM.reset();
 window.history.replaceState("", document.title, "/");
};

// RADIO BUTTONS

OWNERSHIP_OPTIONS_CONTAINER.addEventListener("click", (e) => {
 if (e.target.tagName !== "LABEL") return;
 for (let elem of OWNERSHIP_OPTIONS_CONTAINER.children) elem.classList.remove("tw-checked-radio-label");
 e.target.classList.add("tw-checked-radio-label");
});

// CATEGORY SELECT DD (DROPDOWN)

// DD TABS

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

CATEGORY_SELECT.options[0].selected = true; // to reset the value of select to empty string upon page reload
// const height = CATEGORY_SELECT_DROPDOWN.offsetHeight + 12;
// const width = height * 1.75;

CATEGORY_SELECT_DROPDOWN.addEventListener("click", (e) => {
 if (e.target.closest("#category-select-options-container") && e.target.tagName === "SPAN") {
  // CATEGORY_SELECT_TOGGLER.checked = false;
  CATEGORY_SELECT_LABEL.childNodes[0].textContent = e.target.textContent;
  CATEGORY_SELECT.querySelector(`option[value="${e.target.textContent.toLowerCase()}"]`).selected = true;
  for (let span of CATEGORY_SELECT_OPTIONS_CONTAINER.querySelectorAll("span")) {
   span.classList.remove("tw-selected-option");
   span.classList.add("hover:tw-bg-gray-100");
  }
  e.target.classList.add("tw-selected-option");
  e.target.classList.remove("hover:tw-bg-gray-100");
 }

 if (e.target.id === "category-select-done-btn") CATEGORY_SELECT_TOGGLER.checked = false;
 if (e.target.id === "category-select-reset-btn") {
  CATEGORY_SELECT.value = null;
  CATEGORY_SELECT_LABEL.childNodes[0].textContent = "Category";
  // CATEGORY_SELECT_TOGGLER.checked = false;

  CATEGORY_SELECT_OPTIONS_CONTAINER.querySelector(".tw-selected-option")?.classList.remove("tw-selected-option");

  CATEGORY_SELECT_TABS_CONTAINER.children["category-select-residential-tab"].click();
 }
});

// BEDROOMS AND BATHROOMS DD (DROPDOWN)

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

// AMOUNT SELECTOR DD (DROPDOWN)

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

AMOUNT_SELECT_DROPDOWN.addEventListener("click", (e) => {
 if (e.target.closest("#amount-select-container") && e.target.tagName !== "INPUT") {
  nestedDropdown.remove();
 }

 if (e.target.id === "amount-select-done-btn") AMOUNT_SELECT_TOGGLER.checked = false;
 if (e.target.id === "amount-select-reset-btn") {
  AMOUNT_SELECT_LABEL.childNodes[0].textContent = "Price (AED)";
  MINIMUM_FIELD.value = 0;
  MAXIMUM_FIELD.value = "";
  // AMOUNT_SELECT_TOGGLER.checked = false;
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
 AMOUNT_SELECT_LABEL.childNodes[0].textContent = `AED ${minAmount} - ${maxAmount}`;
});

// DD CLOSE-WHEN-CLICKED-OUTSIDE LOGIC

document.addEventListener("click", (e) => {
 if (!e.target.closest("#category-select-container")) CATEGORY_SELECT_TOGGLER.checked = false;

 if (CATEGORY_SELECT_TOGGLER.checked) {
  CATEGORY_SELECT_DROPDOWN.classList.remove("tw-invisible");
  CATEGORY_SELECT_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  CATEGORY_SELECT_DROPDOWN.classList.add("tw-invisible");
  CATEGORY_SELECT_CHEVRON.style.transform = "rotateY(360deg)";
 }

 if (!e.target.closest("#bedsbaths-select-container")) BEDSBATHS_SELECT_TOGGLER.checked = false;

 if (BEDSBATHS_SELECT_TOGGLER.checked) {
  BEDSBATHS_SELECT_DROPDOWN.classList.remove("tw-invisible");
  BEDSBATHS_SELECT_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  BEDSBATHS_SELECT_DROPDOWN.classList.add("tw-invisible");
  BEDSBATHS_SELECT_CHEVRON.style.transform = "rotateY(360deg)";
 }

 if (!e.target.closest("#amount-select-container") && !e.target.closest(".tw-nested-dropdown-style")) {
  AMOUNT_SELECT_TOGGLER.checked = false;
  nestedDropdown.remove();
 }

 if (AMOUNT_SELECT_TOGGLER.checked) {
  AMOUNT_SELECT_DROPDOWN.classList.remove("tw-invisible");
  AMOUNT_SELECT_CHEVRON.style.transform = "rotate(180deg)";
 } else {
  AMOUNT_SELECT_DROPDOWN.classList.add("tw-invisible");
  AMOUNT_SELECT_CHEVRON.style.transform = "rotateY(360deg)";
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
 for (let dropdown of document.querySelectorAll(".tw-dropdown")) {
  flipDropDown(dropdown);
 }
});

window.onerror = (msg, url, line, col, error) => {
 console.log(error);
 return true;
};