import React from "react";
import scrollbtn from "../icons/png/next.png";

export default function Heading() {
  return (
    <section className="heading">
      <h1 className="heading--visually-hidden">
        Maja Cvetkovic - Photographic Journal
      </h1>
      <p className="heading__subtitle">Hey, welcome and take a look</p>
      <p className="heading__title">
        This is a photographic journal of
        <span className="heading__name"> Maja Cvetkovic</span>, an amateur
        photographer based in Nis, Serbia.
      </p>
      <label className="heading__scroll-label">Scroll down</label>
      <button className="heading__scroll-btn">
        <a href="#main-btns">
          <img
            className="heading__scroll-icon"
            alt="scroll-down-icon"
            src={scrollbtn}
          />
        </a>
      </button>
    </section>
  );
}
