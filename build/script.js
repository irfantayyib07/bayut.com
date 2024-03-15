"use strict";

// RADIO BUTTONS

const radioButtonContainer = document.getElementById("radio-button-container");

radioButtonContainer.addEventListener("click", (e) => {
 if (e.target.tagName !== "LABEL") return;
 for (let elem of e.target.parentElement.children) elem.classList.remove("checked-radio-label");
 e.target.classList.add("checked-radio-label");
});

// TABS

const tabsContainer = document.getElementById("tabs-container");
const tabOptionsContainer = document.getElementById("tab-options-container");

for (let elem of tabOptionsContainer.children) {
 if (elem.id !== tabsContainer.children["category1-tab"].dataset.controls)
  elem.classList.add("w-0", "h-0", "invisible", "absolute");
}

tabsContainer.addEventListener("click", (e) => {
 if (e.target.tagName !== "BUTTON") return;
 for (let elem of e.target.parentElement.children) elem.classList.remove("selected-tab");
 e.target.classList.add("selected-tab");

 for (let elem of tabOptionsContainer.children) {
  elem.classList.add("w-0", "h-0", "invisible", "absolute");

  if (elem.id === e.target.dataset.controls) {
   elem.classList.remove("w-0", "h-0", "invisible", "absolute");
  }
 }
});

// DROPDOWN

const residentialLabel = document.getElementById("residential-label");
const dropdown = document.getElementById("dropdown");
const residentialSelect = document.getElementById("residential-select");

residentialLabel.addEventListener("click", (e) => {
 if (e.target.tagName !== "LABEL") return;
 dropdown.classList.remove("w-0", "h-0", "invisible");
});

dropdown.addEventListener("click", (e) => {
 if (e.target.closest("#tab-options-container") && e.target.tagName === "SPAN") {
  dropdown.classList.add("w-0", "h-0", "invisible");
  residentialLabel.childNodes[0].replaceWith(e.target.textContent);
  for (let option of residentialSelect.options) {
   if (option.textContent === e.target.textContent) option.selected = true;
  }
 }

 if (e.target.id === "done-button") dropdown.classList.add("w-0", "h-0", "invisible");
 if (e.target.id === "reset-button") {
  residentialSelect.value = null;
  residentialLabel.childNodes[0].replaceWith("Category1");
  dropdown.classList.add("w-0", "h-0", "invisible");
 }
});

document.addEventListener("click", (e) => {
 if (!!e.target.closest("#tab-options-container")) return;

 const isNotLabel = e.target.closest("label")?.id !== "residential-label";
 if (isNotLabel) dropdown.classList.add("w-0", "h-0", "invisible");
});
