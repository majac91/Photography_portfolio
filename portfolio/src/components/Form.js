import React from "react";

export default function Form(props) {
  return (
    <form id="add-photo-form" className="form add-photo-form--closed">
      <label htmlFor="inputCaption" className="form__label">
        Caption
      </label>
      <input
        type="text"
        name="text"
        id="inputCaption"
        required
        className="form__input"
      />
      <label htmlFor="inputDate" className="form__label">
        Date
      </label>
      <input
        type="date"
        name="text"
        id="inputDate"
        required
        className="form__input"
      />
      <label className="form__label" htmlFor="inputImg">
        Photo
      </label>
      <input
        type="file"
        id="inputImg"
        required
        className="form__input form__input-img"
      />
      <div className="radio-btns">
        <input id="rd-home" name="btn" type="radio" value="Home" />
        <label htmlFor="rd-home" className="radio-label">
          Home
        </label>
        <input id="rd-places" name="btn" type="radio" value="Places" />
        <label htmlFor="rd-places" className="radio-label">
          Places
        </label>
      </div>
      <button type="submit" id="upload" className="form__submit-btn">
        Upload
      </button>
      <button type="button" id="close" className="form__close-btn"></button>
    </form>
  );
}
