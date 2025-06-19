import React from "react";
import { Link } from "react-router-dom";
import "./Sections.css";

const RelatedSlider = ({ items }) => {
  return (
    <div className="slider-container">
      {items.map((element) => (
        <Link to={`/element/${element.id}`} className="slider-card" key={element.id}>
          <img src={element.image} alt={element.name} />
          <div className="slider-title">{element.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedSlider;
