import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventsData from "../Events/EventsData";
import './Detailspage.css';

export default function Detailspage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    console.log("Received id:", id); // Check the id
    const currentItem = EventsData.find((item) => item.id === parseInt(id));
    console.log("Found item:", currentItem); // Check if the item is found
    if (currentItem) {
      setItem(currentItem);
    }
  }, [id]);

  if (!item) {
    return (
      <div className="loading">
        <p>Loading item details...</p>
      </div>
    );
  }

  return (
    <div className="single-page top">
       <h2 className="heading" style={{position:'relative',top:'121px'}}>{item.title}</h2>
      <div className="container">
        <div className="content flex">
          <div className="main content">
            <div className="disc flex justify-content-between">
              <img
                src={item.image}
                style={{
                  width: "400px",
                  height: "400px",
                  borderRadius: "50%",
                  border: "3px solid gray",
                  padding: "20px",
                  position:"relative",
                  top:"443px"
                }}
                alt={item.title}
              />
              <div className="side-content">
                <div className="box"   style={{
                    backgroundImage: `url(${item.paraimage2})`, // Dynamic background
                  }}>
                  <h2>How Can We Help You?</h2>
                  <p >{item.sidepara}</p>
                  <button className="outline-btn btn">
                    <i
                      className="fas fa-phone"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Contact Us
                  </button>
                </div>
                <div
                  className="box2"
                  style={{
                    backgroundImage: `url(${item.paraimage1})`, // Dynamic background
                  }}
                >
                  <p style={{fontSize:"27px !important"}}>{item.sidepara}</p>
                </div>
              </div>
            </div>
            <p style={{ marginTop: "30px", color: "gray" }}>{item.desc}</p>
            <div className="para flex_space" style={{ marginTop: "40px" }}>
              <p style={{width:"700px", color: "gray !important",fontSize:"27px" }}>
                {item.sidepara}
              </p>
              <p style={{ width:"700px", fontSize:"27px" }}>
                {item.sidepara}
              </p>
            </div>
            <h1 className="heading" style={{ textAlign: "left" }}>
              What is the {item.title} City?
            </h1>
            <p style={{ marginTop: "50px", marginBottom: "30px" }}>
              {item.desc}
            </p>
            <div className="image grid1 im">
              <img
                alt=""
                style={{
                  width: "400px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
              <img src=""
                alt=""
                style={{
                  width: "400px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <p>{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
