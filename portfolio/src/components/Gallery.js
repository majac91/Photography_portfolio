import React, { useState } from "react";
import closebtn from "../icons/png/001-cancel-3.png";
import deletebtn from "../icons/png/delete.png";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Gallery({ galleryList }) {
  const [isEditActive, setIsEditActive] = useState(false);

  function handleOverlayActive() {
    setIsEditActive((prevIsActive) => !prevIsActive);
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 767: 2, 1515: 3 }}>
      <Masonry>
        {galleryList.map((el) => {
          return (
            <figure
              key={el.id} //TODO - key doesn't work
              className={`gallery-img__container ${
                el.home ? "home" : "places"
              } ${isEditActive ? "edit__active" : ""}`}
            >
              <img src={el.photo} alt={el.caption} className="gallery-img" />
              <div className="gallery-img__overlay">
                <input
                  type="checkbox"
                  className="overlay__checkbox overlay__btn"
                  checked="checked"
                />
                <button className="overlay__delete">
                  <img
                    alt="close edit"
                    className="overlay__btn"
                    src={deletebtn}
                  ></img>
                </button>
                <button
                  // disabled={isEditActive ? false : true}
                  type="button"
                  className="overlay__close"
                >
                  <img
                    alt="close edit"
                    className="overlay__btn"
                    src={closebtn}
                  ></img>
                </button>
              </div>
              <button
                onClick={handleOverlayActive}
                type="button"
                className="gallery__edit-btn"
              ></button>
              <figcaption className="caption__container">
                <div className="caption__text">
                  <h2 className="img__caption">{el.caption}</h2>
                  <h3 className="img__date">{el.date}</h3>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
}
