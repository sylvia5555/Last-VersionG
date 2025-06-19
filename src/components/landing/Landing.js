import React from "react";
import "./landing.css";
import video from '../../Assets/landing.mp4';

const Landing = () => {
  const title = "Welcome to Egypt";

  return (
    <div className="landing">
      <video autoPlay muted loop className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="landing-content">
        <h1 className="landing-title">
          {title.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="landing-description animate-left-right">
          Discover the history behind ancient artifacts effortlessly. Upload an
          image of any artifact, and let our AI guide you through its story,
          dynasty, and historical significance.
        </p>
      </div>
    </div>
  );
};

export default Landing;
