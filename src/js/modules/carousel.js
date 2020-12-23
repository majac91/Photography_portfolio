let slideContainer;
let nextBtn;
let prevBtn;
let interval;
let slides;
let index;
let slideWidth;
let firstClone;
let lastClone;

function attachImgs() {
  // The images attach must be done before the rest of JS manipulation
  const firstSlide = document.querySelector(".slide-1 img");
  firstSlide.src = require("../../images/photo0.jpg");
  const secondSlide = document.querySelector(".slide-2 img");
  secondSlide.src = require("../../images/photo1.jpg");
  const thirdSlide = document.querySelector(".slide-3 img");
  thirdSlide.src = require("../../images/photo8.jpg");
  const fourthSlide = document.querySelector(".slide-4 img");
  fourthSlide.src = require("../../images/photo25.jpg");

  const scrollDown = document.querySelector(".heading__scroll-icon");
  scrollDown.src = require("../../icons/png/next.png");
}

function cacheDom() {
  slideContainer = document.querySelector(".slides");
  nextBtn = document.querySelector(".next-btn");
  prevBtn = document.querySelector(".prev-btn");
  interval = 5000;
  slides = document.querySelectorAll(".slide");
  index = 0;
  slideWidth = slides[index].clientWidth || window.onresize;
  firstClone = slides[0].cloneNode(true);
  lastClone = slides[slides.length - 1].cloneNode(true);
}

function bindEvents() {
  slideContainer.addEventListener("transitionend", () => {
    slides = getSlides();
    if (slides[index] === firstClone) {
      slideContainer.style.transition = "none";
      index = 1; //resetting the index and the slideWidth back to the first slide
      slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    if (slides[index] === lastClone) {
      slideContainer.style.transition = "none";
      index = slides.length - 2;
      slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  });
  nextBtn.addEventListener("click", moveToNextSlide);
  prevBtn.addEventListener("click", moveToPreviousSlide);
}

function render() {
  firstClone.classList.add("first-clone");
  lastClone.classList.add("last-clone");
  slideContainer.append(firstClone);
  slideContainer.prepend(lastClone);
}

//slides resize on window change
window.onresize = function () {
  slideWidth = slides[index].clientWidth;
  return slideWidth;
};

//includes the first and the last clone
const getSlides = () => document.querySelectorAll(".slide");

function moveToNextSlide() {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slideContainer.style.transition = ".7s ease-out";
  slideContainer.style.transform = `translateX(${-slideWidth * index}px)`; //the index increases so the amount amount a slide is transitioned increases
}

function moveToPreviousSlide() {
  if (index <= 0) return;
  index--;
  slideContainer.style.transition = ".7s ease-out";
  slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
}

function startSlide() {
  setInterval(() => {
    moveToNextSlide();
  }, interval);
}

function init() {
  attachImgs();
  cacheDom();
  bindEvents();
  render();
  startSlide();
}

init();
