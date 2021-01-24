import React, { useEffect, useState, createRef } from "react";
import firstSlide from "../images/photo0.jpg";
import secondSlide from "../images/photo1.jpg";
import thirdSlide from "../images/photo8.jpg";
import fourthSlide from "../images/photo25.jpg";

export default function Carousel(props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const firstClone = { url: firstSlide }; //get the photo without refferencing the firstSlide so the class first-slide is added only to the clone
  const lastClone = { url: fourthSlide };

  const slides = [
    lastClone,
    firstSlide,
    secondSlide,
    thirdSlide,
    fourthSlide,
    firstClone,
  ];

  const slideContainer = createRef();
  const interval = 3000;

  function handleTransition(container) {
    const slideWidth = container.clientWidth || window.onresize;
    if (slides[slideIndex] === firstClone) {
      container.style.transition = "none";
      setSlideIndex(1);
      container.style.transform = `translateX(${-slideWidth * slideIndex}px)`;
    }

    if (slides[slideIndex] === lastClone) {
      container.style.transition = "none";
      setSlideIndex(slides.length - 2);
      container.style.transform = `translateX(${-slideWidth * slideIndex}px)`;
    }
  }

  function moveToNextSlide(container) {
    console.log(container);
    const slideWidth = container.clientWidth || window.onresize;

    if (slideIndex >= slides.length - 1) return;
    setSlideIndex((prevIndex) => prevIndex + 1);
    container.style.transition = ".7s ease-out";
    container.style.transform = `translateX(${-slideWidth * slideIndex}px)`;
  }

  function moveToPreviousSlide() {}

  useEffect(() => {
    const container = slideContainer.current;
    // handleTransition(container);
    moveToNextSlide(container);
    // const slideInterval = setInterval(() => {
    //     moveToNextSlide(container);
    // }, interval);
    // return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <section className="container--slideshow">
        <div
          onTransitionEnd={() => handleTransition(slideContainer)}
          ref={slideContainer}
          className="slides"
        >
          {slides.map((slide) => {
            return (
              <div
                key={`${Math.random() * 1000}`} //TODO
                className={`slide slide-${slides.indexOf(slide)} 
                ${slides.indexOf(slide) === 0 ? "last-clone" : ""}
                ${
                  slides.indexOf(slide) === slides.length - 1
                    ? "first-clone"
                    : ""
                }`}
              >
                <img src={typeof slide === String ? slide : slide.url} alt="" />
              </div>
            );
          })}
        </div>
        <div className="slide-controls">
          <button
            onClick={moveToPreviousSlide}
            className="prev-btn"
            aria-label="previous photo"
          ></button>
          <button
            onClick={moveToNextSlide}
            className="next-btn"
            aria-label="next photo"
          ></button>
        </div>
      </section>
    </>
  );
}
