import { deleteItem, toggleButtonHome } from "../store.js";
import events from "./pubsub.js";

// Create gallery elements and render them

//Variables
let buttons;
let home;
let places;
let add;
let all;
let gallery;
let activeBtn;
let storedList;
let form;
let closeFormBtn;
let navbar;

function cacheDom() {
  buttons = Array.from(document.querySelector(".main-btns").children);
  all = buttons[0];
  home = buttons[1];
  places = buttons[2];
  add = buttons[3];
  navbar = document.querySelector(".navbar");
  gallery = document.querySelector(".gallery");
  activeBtn = null;
  form = document.getElementById("add-photo-form");
  closeFormBtn = document.getElementById("close");
}

function bindEvents() {
  home.addEventListener("click", addClassHome);
  places.addEventListener("click", addClassPlaces);
  all.addEventListener("click", showAll);
  add.addEventListener("click", openForm);
  closeFormBtn.addEventListener("click", closeForm);
  document.addEventListener("DOMContentLoaded", setActive);
  document.addEventListener("scroll", shrinkNav);
  window.addEventListener("scroll", restoreNav);
  events.subscribe("listRetreived", (list) => {
    storedList = list;
    render();
  });
}

function renderDestination(destination) {
  // create figure wrapper
  const elDestination = document.createElement("figure");
  elDestination.classList.add("gallery-img__container");

  // add correct class to wrapper
  destination.home === true
    ? elDestination.classList.add("home")
    : elDestination.classList.add("places");

  // img element
  const img = document.createElement("img");
  img.src = destination.photo;
  img.classList.add("gallery-img");

  //figure caption
  const figcaption = document.createElement("figcaption");
  figcaption.classList.add("caption__container");

  //captions div
  const captionTxt = document.createElement("div");
  captionTxt.classList.add("caption__text");

  captionTxt.insertAdjacentHTML(
    "beforeend",
    `<h2 class='img__caption'>${destination.caption}</h2>`
  );
  captionTxt.insertAdjacentHTML(
    "beforeend",
    `<h3 class='img__date'>${destination.date}</h3>`
  );

  // img overlay
  const imgOverlay = document.createElement("div");
  imgOverlay.classList.add("gallery-img__overlay");

  // img overlay close btn
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.classList.add("overlay__close");
  closeBtn.classList.add("flaticon-001-cancel-3");

  //create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("overlay__checkbox");
  //check all home list checkboxes
  if (destination.home) {
    checkbox.setAttribute("checked", "checked");
  }

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("overlay__delete");
  deleteBtn.classList.add("flaticon-020-disable");

  //edit button
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.classList.add("gallery__edit-btn");

  //append elements
  elDestination.appendChild(img);
  elDestination.appendChild(imgOverlay);
  elDestination.appendChild(editBtn);
  elDestination.appendChild(figcaption);
  imgOverlay.appendChild(checkbox);
  imgOverlay.appendChild(deleteBtn);
  imgOverlay.appendChild(closeBtn);
  figcaption.appendChild(captionTxt);

  //Events
  // move checked items to 'home' list
  checkbox.addEventListener("click", () => {
    toggleButtonHome(destination);
  });

  // delete an item
  deleteBtn.addEventListener("click", () => {
    deleteItem(destination);
  });

  // open edit menu
  editBtn.addEventListener("click", () => {
    elDestination.classList.toggle("edit__active");
    editBtn.style.opacity = "0";
  });

  closeBtn.addEventListener("click", () => {
    elDestination.classList.toggle("edit__active");
    editBtn.style.opacity = "1";
  });

  // Return the destination HTML
  return elDestination;
}

function render() {
  gallery.textContent = "";

  // Create DOM elements for each destination
  storedList.forEach((destination) => {
    const elDestination = renderDestination(destination);
    gallery.appendChild(elDestination);
  });
}

function setActive() {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const current = event.target;

      if (activeBtn) {
        activeBtn.classList.remove("active-button");
        activeBtn.setAttribute("aria-pressed", false);
      }

      current.setAttribute("aria-pressed", true);
      current.classList.add("active-button");

      activeBtn = current;
    });
  });
  //set home as the default active button on page load
  document.querySelector(".btn__all").click();
}

function addClassHome() {
  gallery.classList.add("home");
  gallery.classList.remove("places");
}

function addClassPlaces() {
  gallery.classList.add("places");
  gallery.classList.remove("home");
}

function showAll() {
  gallery.classList.remove("home");
  gallery.classList.remove("places");
}

function openForm() {
  form.classList.add("form-state--open");
}

function closeForm() {
  form.classList.remove("form-state--open");
}

//shrink header on scroll
function shrinkNav() {
  navbar.classList.add("navbar--shrink");
}

// restore nav size on scroll up
function restoreNav() {
  const scrollPos = 0;
  if (document.body.getBoundingClientRect().top === scrollPos) {
    document.querySelector(".navbar").classList.remove("navbar--shrink");
  }
}

function init() {
  cacheDom();
  bindEvents();
}

const module = { init };
export default module;
