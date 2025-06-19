import React from "react";
import "./about.css";
import Header from "../Header/Header";
import img1 from "../../Assets/Rectangle 1315 (1).png";
import img2 from "../../Assets/container-terminal-wharf-transport 1.png";
import e1 from "../../Assets/Ellipse 1.png";
import e2 from "../../Assets/Ellipse 2.png";
import e3 from "../../Assets/Ellipse 3.png";
import { FaRobot, FaHeadphones, FaStore } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Header />

      <div className="about">
        <div className="land">
          <h1>Who we Are!</h1>
        </div>

        <div className="aboutp">
          <div className="left">
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h2>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint laborum.
            </h3>
          </div>

          <div className="right">
            <img src={img1} alt="Museum View 1" style={{height:"200px"}} />
            <img src={img2} alt="Museum View 2" />
          </div>
        </div>

        <div className="mission">
          <h2 style={{textAlign:"center !important"}}>Our Mission</h2>
          <div className="aboutp">
            <div className="left">
              <p>
                Our mission is to bridge the gap between the past and the
                present by making cultural tourism more engaging, educational,
                and accessible. Through our application, we empower users to
                uncover the stories behind Egypt’s timeless treasures with just
                a simple scan.
              </p>
            </div>
            <div className="rightimg">
              <img src={e3} />
              <img src={e1} />
              <img src={e2} />
            </div>
          </div>
        </div>

        <div className="weoffer">
          <h2>What We Offer!</h2>
          <div className="cards">
            <div className="card">
              <FaRobot className="card-icon" />
              <h2>AI Artifact Recognition</h2>
              <p>Instantly identify and learn about artifacts</p>
            </div>

            <div className="card">
              <FaHeadphones className="card-icon" />
              <h2>Audio-Guided Storytelling</h2>
              <p>Experience history through immersive narration</p>
            </div>

            <div className="card">
              <FaStore className="card-icon" />
              <h2>Integrated Souvenir Shop</h2>
              <p>Purchase authentic cultural keepsakes</p>
            </div>
          </div>
        </div>

        <div className="choose">
          <h2>Why Choose Us!</h2>
          <div className="aboutp">
            <img src={img1} className="chooseimg" />
            <div className="disc">
              <div className="row1">
                <span> Seamless blend of heritage & innovation</span>
                <span>
                  {" "}
                  Designed for tourists, history enthusiasts, and researchers
                </span>
              </div>
              <div className="row2">
                <span>
                  {" "}
                  Committed to preserving and promoting Egypt’s cultural legacy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
