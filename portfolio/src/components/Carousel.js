import React, {
  useEffect,
  useRef,
  useState,
  createRef,
  useCallback,
  useMemo,
} from "react";
import firstSlide from "../images/photo0.jpg";
import secondSlide from "../images/photo1.jpg";
import thirdSlide from "../images/photo8.jpg";
import fourthSlide from "../images/photo25.jpg";

export default function Carousel(props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const skipTransition = useRef(false);

  const firstClone = useMemo(() => ({ url: firstSlide }), []);
  const lastClone = useMemo(() => ({ url: fourthSlide }), []);

  const slides = useMemo(
    () => [
      lastClone,
      firstSlide,
      secondSlide,
      thirdSlide,
      fourthSlide,
      firstClone,
    ],
    [firstClone, lastClone]
  );

  const slideContainer = createRef();
  const interval = 3000;

  function handleTransition() {
    if (slides[slideIndex] === firstClone) {
      setSlideIndex(1);
      skipTransition.current = true;
    }
    if (slides[slideIndex] === lastClone) {
      setSlideIndex(slides.length - 2);
      skipTransition.current = true;
    }
  }

  const moveToNextSlide = useCallback(() => {
    if (slideIndex >= slides.length - 1) return;
    setSlideWidth(slideContainer.current.clientWidth);
    setSlideIndex((prevIndex) => prevIndex + 1);
  }, [slideContainer, slideIndex, slides.length]);

  function moveToPreviousSlide() {
    if (slideIndex <= 0) return;
    setSlideWidth(slideContainer.current.clientWidth);
    setSlideIndex((prevIndex) => prevIndex - 1);
  }

  //continue transitioning
  useEffect(() => {
    if (slideIndex === 1) {
      skipTransition.current = false;
    }
    if (slideIndex === slides.length - 2) {
      skipTransition.current = false;
    }
  }, [slideIndex, slides, firstClone]);

  // autoplay;
  useEffect(() => {
    const id = setInterval(() => {
      moveToNextSlide();
    }, interval);
    return () => {
      clearInterval(id);
    };
  }, [moveToNextSlide, slideIndex]);

  return (
    <>
      <section className="container--slideshow">
        <div
          onTransitionEnd={handleTransition}
          ref={slideContainer}
          className="slides"
          style={
            skipTransition.current
              ? {
                  transition: "none",
                  transform: `translateX(-${slideWidth * slideIndex}px)`,
                }
              : {
                  transition: ".7s ease-out",
                  transform: `translateX(-${slideWidth * slideIndex}px)`,
                }
          }
        >
          {slides.map((slide, index) => {
            return (
              <div
                key={index}
                className={`slide slide-${slides.indexOf(slide)} 
                ${
                  slides.indexOf(slide) === slides.length - 1
                    ? "first-clone"
                    : ""
                }`}
              >
                <img
                  src={typeof slide === "string" ? slide : slide.url}
                  alt=""
                />
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
