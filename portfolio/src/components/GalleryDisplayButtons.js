import React from "react";
import addbtn from "../icons/png/016-add.png";

export default function GalleryDisplayButtons({ onBtnClick, onOpenForm }) {
  return (
    <div id="main-btns" className="main-btns">
      <button
        onClick={onBtnClick}
        data-param="all"
        className="btn btn__all"
        type="button"
      >
        All
      </button>
      <button
        onClick={onBtnClick}
        data-param="home"
        className="btn btn__home"
        type="button"
      >
        Home
      </button>
      <button
        onClick={onBtnClick}
        data-param="places"
        className="btn btn__places"
        type="button"
      >
        Places
      </button>
      <button onClick={onOpenForm} className="btn btn__add" type="button">
        <img alt="add-button" src={addbtn}></img>
      </button>
    </div>
  );
}
