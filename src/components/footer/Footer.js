import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import mom3 from "../../Assets/gallery/pics2/mom3.jpg";
import mom4 from "../../Assets/gallery/pics2/mom4.jpg";
import middle from "../../Assets/gallery/pics2/middle.jpg";
import middle2 from "../../Assets/gallery/pics2/middle (2).jpg";
import paper4 from "../../Assets/gallery/pics2/midddle.jpg";
import paper3 from "../../Assets/gallery/pics2/status.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-gallery">
          <img src={mom3} alt="mom3" />
          <img src={mom4} alt="mom4" />
          <img src={middle} alt="mom4" />
          <img src={paper3} alt="mom4" />
          <img src={middle2} alt="mom4" />
          <img src={paper4} alt="mom4" />
        </div>
      </div>

      <div className="footer-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/sections">Museums</Link>
        <Link to="/events">Exhibitions</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-main">
        <div className="footer-col">
          <h2 className="logo-text">Nights At The Museum</h2>
          <p>
            The Egyptian Museum, located in Cairo, is home to the world's
            largest collection of pharaonic antiquities. Opened in 1902, it has
            been a cornerstone in preserving the history and legacy of ancient
            Egypt, showcasing treasures from Tutankhamun to the golden age of
            the pharaohs.
          </p>
        </div>

        <div className="footer-col">
          <h3>Visit Us</h3>
          <ul>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/ticket">Buy Tickets</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/membership">Membership</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Location & Hours</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/history">Our History</Link>
            </li>
            <li>
              <Link to="/team">Our Team</Link>
            </li>
            <li>
              <Link to="/sponsors">Sponsors</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Opening Hours</h3>
          <p>
            In the heart of Cairo,
            <br />
            just minutes away from Tahrir Square.
          </p>
          <p>
            <strong>Open Tomorrow</strong>
            <br />
            from 9:00 AM to 7:00 PM.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;