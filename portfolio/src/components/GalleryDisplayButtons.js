import React from "react";
import addbtn from "../icons/png/016-add.png";

export default function GalleryDisplayLinks(props) {
  return (
    <div id="main-btns" className="main-btns">
      <button className="btn btn__all" type="button">
        All
      </button>
      <button className="btn btn__home" type="button">
        Home
      </button>
      <button className="btn btn__places" type="button">
        Places
      </button>
      <button className="btn btn__add" type="button">
        <img alt="add-button" src={addbtn}></img>
      </button>
    </div>
  );
}
