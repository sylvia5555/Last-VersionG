import React from "react";
import "./MiniAbout.css";
import image from "../../Assets/gallery/paraimage1.jpg"; // تأكد من مسار الصورة
import { useNavigate } from "react-router-dom";

const MiniAbout = () => {
  const navigate = useNavigate();

  return (
    <div className="mini-about">
      <h2 className="mini-about-header head">About</h2>
      <div className="mini-about-content">
        <div className="mini-about-text">
          <h3 className="mini-about-title" style={{color:"black"}}>Discover the Egyptian Museum</h3>
          <p className="mini-about-description">
            Dive into the heart of ancient Egyptian civilization. The Egyptian Museum holds treasures
            from thousands of years, showcasing the beauty and history of this incredible culture.
          </p>
          <button
            className="mini-about-button"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
        <div className="mini-about-image">
          <img src={image} alt="Egyptian Museum" />
        </div>
      </div>
    </div>
  );
};

export default MiniAbout;
