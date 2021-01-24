import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        <p>&copy;Maja Cvetkovic</p>
        <p>Content may not be used without written permission.</p>
      </div>
      <div className="footer__social">
        <ul className="footer__social-links"></ul>
        <li className="fotter__social-item">
          <a
            className="fotter__social-link"
            href="https://www.instagram.com/majacv_/?hl=en"
          >
            INSTAGRAM
          </a>
        </li>
        <li className="fotter__social-item">
          <a
            className="footer__social-link"
            href="mailto: majacvetkovic@outlook.com"
          >
            EMAIL ME
          </a>
        </li>
      </div>
    </footer>
  );
}
