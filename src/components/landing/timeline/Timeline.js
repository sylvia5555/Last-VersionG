import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./timeline.css";

const Timeline = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const timelineData = [
    {
      date: "3100 BCE",
      title: "The Unification of Egypt",
      description: "The unification of Upper and Lower Egypt by King Narmer.",
    },
    {
      date: "2580 BCE",
      title: "Construction of the Great Pyramid",
      description: "The Great Pyramid of Giza was constructed during the reign of Pharaoh Khufu.",
    },
    {
      date: "1479 BCE",
      title: "Reign of Hatshepsut",
      description: "One of Egypt's few female pharaohs ruled and expanded trade routes.",
    },
    {
      date: "1279 BCE",
      title: "Reign of Ramses II",
      description: "Ramses II, also known as Ramses the Great, led several military campaigns.",
    },
    {
      date: "30 BCE",
      title: "Cleopatra VII's Reign Ends",
      description: "The death of Cleopatra and the annexation of Egypt by the Roman Empire.",
    },
    {
      date: "1922 CE",
      title: "Discovery of Tutankhamun's Tomb",
      description: "Howard Carter discovered the tomb of King Tutankhamun in the Valley of the Kings.",
    },
  ];

  return (
    <div className="timeline">
         <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 head" data-aos="fade-up">
        Historical Timeline
      </h2>
      <div className="content">
      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
        >
          <h3>{item.date}</h3>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Timeline;
