import React from "react";

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li className="navbar__item">
          <a className="navbar__link" href="#">
            Hey,
          </a>
        </li>
        <li className="navbar__item">
          <a className="navbar__link" href="">
            Stories,
          </a>
        </li>
        <li className="navbar__item">
          <a className="navbar__link" href="#">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
