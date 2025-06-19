import React from "react";
import { useParams } from "react-router-dom";
import { items } from "./Detaisldata"; // تأكدي إن المسار ده صح
import { Link } from "react-router-dom";
import "./Sections.css"
const SectionDetailsPage = () => {
  const { id } = useParams();
  const sectionId = parseInt(id);

  const sectionTitles = {
    1: "Pharaonic Artifacts",
    2: "Middle Kingdom Treasures",
    3: "New Kingdom Weapons",
    4: "Royal Mummies",
    5: "Papyri & Coins",
    6: "Sarcophagi & Statues",
    7: "Gold & Jewelry",
  };

  const sectionDescriptions = {
    1: "Discover statues and monuments from the great pharaohs of ancient Egypt.",
    2: "Explore elegant masks and relics from the Middle Kingdom.",
    3: "A collection of powerful weapons and armor used by New Kingdom warriors.",
    4: "The mummified remains of powerful kings and queens of ancient Egypt.",
    5: "Ancient documents and coins showcasing the rich trade and history.",
    6: "Remarkable sarcophagi and symbolic statues carved with great precision.",
    7: "Stunning collections of gold artifacts and precious jewelry.",
  };

  const filteredItems = items.filter((element) => element.sectionId === sectionId);

  return (
    <div className="section-details" style={{marginTop:"150px",textAlign:"center"}}>
      <h2 className="section-title head">{sectionTitles[sectionId]}</h2>
      <p className="section-description">{sectionDescriptions[sectionId]}</p>

      <div className="section-items-container">
        {filteredItems.map((element, index) => (
          <div key={index} className="section-card">
            <img
              src={element.image}
              alt={element.name}
              className="section-card-img"
            />
            <div className="section-card-body">
              <h3 className="section-card-title">{element.name}</h3>
              <p className="section-card-desc">
                💎 : {element.material} <br />
               ⏳: {element.dynasty}
              </p>
             <button className="details-btn">
  <Link to={`/element/${element.id}`} >More Details</Link>
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionDetailsPage;
