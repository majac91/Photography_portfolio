import React from "react";

export default function Gallery({ galleryList }) {
  return (
    <>
      {galleryList.map((el) => {
        return (
          <figure
            className={`gallery-img__container ${el.home ? "home" : "places"}`}
          >
            <img src={el.photo} alt={el.caption} className="gallery-img" />
            <div className="gallery-img__overlay">
              <input
                type="checkbox"
                className="overlay__checkbox"
                checked="checked"
              />
              <button className="overlay__delete flaticon-020-disable"></button>
              <button
                type="button"
                className="overlay__close flaticon-001-cancel-3"
              ></button>
            </div>
            <button type="button" className="gallery__edit-btn"></button>
            <figcaption className="caption__container">
              <div className="caption__text">
                <h2 className="img__caption">{el.caption}</h2>
                <h3 className="img__date">{el.date}</h3>
              </div>
            </figcaption>
          </figure>
        );
      })}
    </>
  );
}
