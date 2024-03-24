"use strict";

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

const SELECT_TOGGLER = document.getElementById("SELECT_TOGGLER");
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
  SELECT_TOGGLER.checked = false;
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

 if (e.target.id === "SELECT_FIRST_DD_DONE_BUTTON") SELECT_TOGGLER.checked = false;
 if (e.target.id === "SELECT_FIRST_DD_RESET_BUTTON") {
  SELECT_FIRST.value = null;
  SELECT_FIRST_LABEL.childNodes[0].textContent = "Category1";
  SELECT_TOGGLER.checked = false;

  for (let options of SELECT_FIRST_TAB_OPTIONS_CONTAINER.children) {
   for (let option of options.children) {
    option.classList.remove("selected-option");
   }
  }

  SELECT_FIRST_TABS_CONTAINER.children["SELECT_FIRST_CATEGORY1_TAB"].click();
 }
});

document.addEventListener("click", (e) => {
 console.log(SELECT_FIRST.value);
 if (!e.target.closest("#SELECT_FIRST_CONTAINER")) SELECT_TOGGLER.checked = false;

 if (SELECT_TOGGLER.checked) {
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
 let coords = SELECT_FIRST_DROPDOWN.getBoundingClientRect();
 if (coords.left < 5) {
  SELECT_FIRST_DROPDOWN.classList.remove("right-0");
  SELECT_FIRST_DROPDOWN.classList.add("left-0");
 
  SELECT_FIRST_ARROW_UP.classList.remove("right-[14px]");
  SELECT_FIRST_ARROW_UP.classList.add("left-[14px]");
 }
 
 if (SELECT_FIRST_LABEL.getBoundingClientRect().right > SELECT_FIRST_DROPDOWN.offsetWidth + 5) {
  SELECT_FIRST_DROPDOWN.classList.remove("left-0");
  SELECT_FIRST_DROPDOWN.classList.add("right-0");
 
  SELECT_FIRST_ARROW_UP.classList.remove("left-[14px]");
  SELECT_FIRST_ARROW_UP.classList.add("right-[14px]");
 }
}

flipDropDown();

window.addEventListener("resize", function (e) {
 flipDropDown();
});
